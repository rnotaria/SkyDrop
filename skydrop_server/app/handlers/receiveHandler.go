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
	"os"
	"strconv"
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

	fmt.Println("\nRequest made to receiveHandler")

	if r.Method == "OPTIONS" {
		//TODO?
		return
	}

	address := r.Header.Get("address")
	if address == "" {
		http.Error(w, "no address", http.StatusBadRequest)
		return
	}

	// # # # # # # # # # Comment below to bypass AWS # # # # # # # # # # #
	fileList, err := receiveHandler.getFileList(&address)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fileList, err = receiveHandler.getFileData(&fileList)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = makeZipFile(&fileList)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

	zipFile, err := os.Open("data/" + address + ".zip")
	defer zipFile.Close()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fileStat, _ := zipFile.Stat()
	fileSize := fileStat.Size()

	w.Header().Set("Content-Disposition", "attachment; filename=data/"+address)
	w.Header().Set("Content-Type", "application/zip")
	w.Header().Set("Content-Length", strconv.FormatInt(fileSize, 10))

	fmt.Println("Sending zip archive")
	_, err = zipFile.Seek(0, 0)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	io.Copy(w, zipFile)

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
		return fileList, errors.New("address exists but no items in it")
	}

	for _, obj := range res.Contents {
		f := file{
			address:  *address,
			filename: strings.Split(*obj.Key, "/")[1],
			size:     obj.Size,
		}
		fileList = append(fileList, f)
	}

	return fileList, nil
}

func (receiveHandler *ReceiveHandler) getFileData(fileList *[]file) ([]file, error) {
	fmt.Println("Retreiving file data")

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

func makeZipFile(fileList *[]file) error {
	fmt.Println("Creating zip file")

	buffer := new(bytes.Buffer)
	address := (*fileList)[0].address
	zipWriter := zip.NewWriter(buffer)

	for _, file := range *fileList {
		zipFile, err := zipWriter.Create(file.filename)
		if err != nil {
			return err
		}

		bodyBytes, err := ioutil.ReadAll(file.data)

		_, err = zipFile.Write(bodyBytes)
		if err != nil {
			return err
		}
	}

	err := zipWriter.Close()
	if err != nil {
		return err
	}

	ioutil.WriteFile("data/"+address+".zip", buffer.Bytes(), 0777)

	// TODO delete zip file

	return nil
}
