package handlers

import (
	"encoding/json"
	"fmt"
	"github.com/rnotaria/SkyDrop/app/awsServices"
	"github.com/rnotaria/SkyDrop/app/tools"
	"github.com/rnotaria/SkyDrop/utils"
	"mime/multipart"
	"net/http"
)

type SendHandler struct {
	S3Service *awsServices.S3Service
	files     []*multipart.FileHeader
}

type responseData struct {
	Success bool
	Address string
	//filenames  string
	//numOfFiles int
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

	fmt.Println("Validating files...")
	if !utils.IsFileCountValid(sendHandler.files) {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
	if !utils.IsFileSizeValid(sendHandler.files) {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	fmt.Println("Generating address...")
	address := tools.GenerateAddress(utils.NumberOfWords)

	//for i := range sendHandler.files {
	//	filename := sendHandler.files[i].Filename
	//	key := *address + "/" + filename
	//
	//	fmt.Println("Uploading", filename)
	//
	//	err := func() error {
	//		file, err := sendHandler.files[i].Open()
	//		if err != nil {
	//			return err
	//		}
	//
	//		defer file.Close()
	//
	//		_, err = sendHandler.S3Service.PutObject(&key, file)
	//		if err != nil {
	//			return err
	//		}
	//
	//		return nil
	//	}()
	//
	//	if err != nil {
	//		fmt.Println(err)
	//		http.Error(w, "Bad Request", http.StatusBadRequest)
	//		return
	//	}
	//}

	resp := responseData{
		Success: true,
		Address: *address,
	}

	respJson, _ := json.Marshal(resp)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		_, _ = w.Write([]byte(err.Error()))
	}

	w.Header().Add("content-type", "application/json")
	_, _ = w.Write(respJson)

	fmt.Println("\nAll files successfully uploaded to", *address)
}
