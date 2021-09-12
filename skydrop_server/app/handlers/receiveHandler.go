package handlers

import (
	"archive/zip"
	"bytes"
	"errors"
	"fmt"
	"github.com/rnotaria/SkyDrop/app/awsServices"
	"io"
	"io/ioutil"
	"net/http"
	"strings"
)

type ReceiveHandler struct {
	S3Service *awsServices.S3Service
}

type file struct {
	address  string
	filename string
	size     int64
	data     io.ReadCloser
}

func (receiveHandler *ReceiveHandler) Receive(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, address")
	fmt.Println("Receive")

	if r.Method == "OPTIONS" {
		//TODO?
		return
	}

	address := r.Header.Get("address")
	if address == "" {
		http.Error(w, "no address", http.StatusBadRequest)
		return
	}

	//Uncomment this when ready (double check pointers)
	//fileList, err := receiveHandler.getFileList(&address)
	//if err != nil {
	//	http.Error(w, err.Error(), http.StatusBadRequest)
	//	return
	//}

	// debug for above:
	var fileList []file
	var err error
	fileList = append(fileList, file{address: "0000000000000000", filename: "gopher1.png", size: 34156})
	fileList = append(fileList, file{address: "0000000000000000", filename: "gopher2.png", size: 34156})
	//// end debug

	fileList, err = receiveHandler.getFileData(&fileList)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	err = makeZipFile(&fileList)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	fmt.Println(fileList)

	fmt.Println("Done")
}

func (receiveHandler *ReceiveHandler) getFileList(address *string) ([]file, error) {
	fmt.Println("Getting list of files for", *address)
	var fileList []file

	res, err := receiveHandler.S3Service.ListObjects(address)
	if err != nil {
		return fileList, err
	}
	if res.KeyCount == 0 {
		return fileList, errors.New("address does not exist")
	}

	for _, obj := range res.Contents {
		f := file{
			address:  *address,
			filename: strings.Split(*obj.Key, "/")[1],
			size:     obj.Size,
		}
		fileList = append(fileList, f)
	}

	fileList = fileList[1:]

	return fileList, nil

}

func (receiveHandler *ReceiveHandler) getFileData(fileList *[]file) ([]file, error) {
	for i := range *fileList {
		key := (*fileList)[i].address + "/" + (*fileList)[i].filename
		obj, err := receiveHandler.S3Service.GetObject(&key)
		if err != nil {
			return *fileList, err
		}
		(*fileList)[i].data = obj.Body
	}
	return *fileList, nil
}

func makeZipFile(fileList *[]file) (error) {
	fmt.Println("Creating zip file...")

	buffer := new(bytes.Buffer)
	address := (*fileList)[0].address
	zipWriter := zip.NewWriter(buffer)

	for _, file := range *fileList {
		zipFile, err := zipWriter.Create(file.filename)
		if err != nil {
			//TODO
			panic(err)
			return err
		}

		bodyBytes, err := ioutil.ReadAll(file.data)

		_, err = zipFile.Write(bodyBytes)
		if err != nil {
			//TODO
			panic(err)
			return err
		}
	}

	err := zipWriter.Close()
	if err != nil {
		//TODO
		panic(err)
		return err
	}

	ioutil.WriteFile(address+".zip", buffer.Bytes(), 0777)

	return nil
}
