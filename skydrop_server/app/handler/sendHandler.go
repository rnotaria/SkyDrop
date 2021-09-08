package handler

import (
	"github.com/rnotaria/SkyDrop/app/awsService"
	"github.com/rnotaria/SkyDrop/utils"
	"mime/multipart"
	"net/http"
)

type SendHandler struct {
	AwsSession *awsService.Session
	files      []*multipart.FileHeader
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

	for _, file := range sendHandler.files {
		_, err := sendHandler.AwsSession.UploadFile(file)
		if err != nil {
			http.Error(w, "Bad Request", http.StatusBadRequest)
			return
		}
	}
}
