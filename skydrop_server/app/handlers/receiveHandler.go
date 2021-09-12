package handlers

import (
	"errors"
	"fmt"
	"github.com/rnotaria/SkyDrop/app/awsServices"
	"io"
	"net/http"
)

type ReceiveHandler struct {
	S3Service *awsServices.S3Service
}

type file struct {
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

	// Uncomment this when ready (double check pointers)
	//fileList, err := receiveHandler.getFileList(&address)
	//if err != nil {
	//	http.Error(w, err.Error(), http.StatusBadRequest)
	//	return
	//}

	// debug for above:
	var fileList []file
	fileList = append(fileList, file{filename: "0000000000000000/gopher1.png", size: 34156})
	fileList = append(fileList, file{filename: "0000000000000000/gopher2.png", size: 34156})
	// end debug

	fileList, err = receiveHandler.getFileData(&fileList)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
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
			filename: *obj.Key,
			size:     obj.Size,
		}
		fileList = append(fileList, f)
	}

	fileList = fileList[1:]

	return fileList, nil

}

func (receiveHandler *ReceiveHandler) getFileData(fileList *[]file) ([]file, error) {
	for i := range *fileList {
		key := (*fileList)[i].filename
		obj, err := receiveHandler.S3Service.GetObject(&key)
		if err != nil {
			return *fileList, err
		}
		(*fileList)[i].data = obj.Body
	}
	return *fileList, nil
}
