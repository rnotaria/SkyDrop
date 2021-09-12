package handlers

import (
	"errors"
	"fmt"
	"github.com/rnotaria/SkyDrop/app/awsServices"
	"net/http"
)

type ReceiveHandler struct {
	S3Service *awsServices.S3Service
}

type file struct {
	filename string
	size     int64
}

func (receiveHandler *ReceiveHandler) Receive(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, address")
	fmt.Println("Receive")

	if r.Method=="OPTIONS"{
		//TODO?
		return
	}

	//address := r.Header.Get("address")
	address:= ""
	if address == "" {
		fmt.Println("Error")
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
		fmt.Println(address)

	fmt.Println(r.Method)

	//w.WriteHeader(http.StatusBadRequest)

	//address := r.ParseForm()
	//fmt.Println(address)
	//address = "asdasd0697120706220220" // Delete this later
	//fileList, err := receiveHandler.getFileList(&address)

	//var fileList []file
	//err := errors.New("temp error")
	//if err != nil {
	//	http.Error(w, "address does not exist or invalid", http.StatusBadRequest)
	//	w.Write([]byte("asdasd"))
	//	return
	//}

	//fmt.Println(fileList)

	fmt.Println("Done")
}

func (receiveHandler *ReceiveHandler) getFileList(address *string) ([]file, error) {

	var fileList []file

	res, err := receiveHandler.S3Service.ListObjects(address)
	if err != nil {
		return nil, err
	}
	if res.KeyCount == 0 {
		return nil, errors.New("address does not exist")
	}

	for _, obj := range res.Contents {
		f := file{
			filename: *obj.Key,
			size:     obj.Size,
		}
		fileList = append(fileList, f)
	}

	return fileList, nil

}
