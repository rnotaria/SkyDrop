package handler

import (
	"fmt"
	"github.com/rnotaria/SkyDrop/utils"
	"mime/multipart"
	"net/http"
)

type SendHandler struct {
	files []*multipart.FileHeader
}

func (sendHandler *SendHandler) TestGet(w http.ResponseWriter, r *http.Request) {
	//Allow CORS here By * or specific origin
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	w.Write([]byte("test"))
}

func (sendHandler *SendHandler) TestPost(w http.ResponseWriter, r *http.Request) {
	//Allow CORS here By * or specific origin
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
		fmt.Println("FileCountNot Valud")
		return
	}

	if !utils.IsFileSizeValid(sendHandler.files) {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		fmt.Println("IsFileSizeValid")
		return
	}

	fmt.Println(sendHandler.files)
}
