package handler

import (
	"fmt"
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


	err := r.ParseMultipartForm(10 << 20)
	if err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
	// r.MultipartForm is now set.
	formdata :=  r.MultipartForm
	sendHandler.files = formdata.File["files"]

	fmt.Println(sendHandler.files)
}
