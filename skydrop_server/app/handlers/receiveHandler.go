package handlers

import (
	"fmt"
	"github.com/rnotaria/SkyDrop/app/awsServices"
	"net/http"
)

type ReceiveHandler struct {
	S3Service *awsServices.S3Service
	files     []file
}

type file struct {
	filename string
	size     int64
}

func (receiveHandler *ReceiveHandler) Receive(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Receive")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	address := "0697120706220220/"
	res, err := receiveHandler.S3Service.ListObjects(&address)
	if err != nil {
		fmt.Println(err)
		return
	}

	for _, obj := range res.Contents {
		f := file{
			filename: *obj.Key,
			size:     obj.Size,
		}

		receiveHandler.files = append(receiveHandler.files, f)
	}

	fmt.Println(receiveHandler.files)

	fmt.Println("Done")
}
