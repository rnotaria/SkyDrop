package handler

import (
	"fmt"
	"github.com/rnotaria/SkyDrop/app/awsServices"
	"github.com/rnotaria/SkyDrop/utils"
	"mime/multipart"
	"net/http"
)

type SendHandler struct {
	S3Service *awsServices.S3Service
	files     []*multipart.FileHeader
}

func (sendHandler *SendHandler) Send(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	err := r.ParseMultipartForm(utils.MaxUploadSize)
	if err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
	sendHandler.files = r.MultipartForm.File["files"]

	if !utils.IsFileCountValid(sendHandler.files) {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
	if !utils.IsFileSizeValid(sendHandler.files) {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	for i := range sendHandler.files {
		fmt.Println("Uploading", sendHandler.files[i].Filename)

		err := func() error {
			filename := sendHandler.files[i].Filename

			file, err := sendHandler.files[i].Open()
			if err != nil {
				return err
			}

			defer file.Close()

			_, err = sendHandler.S3Service.PutFile(&filename, file)
			if err != nil {
				return err
			}

			return nil
		}()

		if err != nil {
			fmt.Println(err)
			http.Error(w, "Bad Request", http.StatusBadRequest)
			return
		}
	}

	fmt.Println("All files successfully uploaded!")
	_,_ = w.Write([]byte("All files successfully uploaded!"))
}
