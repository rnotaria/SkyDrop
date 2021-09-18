package handlers

import (
	"encoding/json"
	"fmt"
	"github.com/rnotaria/SkyDrop/app/awsServices"
	"github.com/rnotaria/SkyDrop/app/tools"
	"github.com/rnotaria/SkyDrop/utils"
	"mime/multipart"
	"net/http"
	"os"
)

type SendHandler struct {
	S3Service *awsServices.S3Service
	files     []*multipart.FileHeader
	test      int
}

func (sendHandler *SendHandler) Send(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	fmt.Println("\nRequest made to sendHandler")

	sendHandler.test++
	fmt.Println("Send called", sendHandler.test)

	var err error
	var hasErr bool

	err = r.ParseMultipartForm(utils.MaxUploadSize)
	hasErr = utils.CheckError(&w, err, http.StatusInternalServerError)
	if hasErr {
		return
	}

	sendHandler.files = r.MultipartForm.File["files"]

	fmt.Println("Validating files")
	err = utils.FileCountValid(sendHandler.files)
	hasErr = utils.CheckError(&w, err, http.StatusBadRequest)
	if hasErr {
		return
	}

	err = utils.FileSizeValid(sendHandler.files)
	hasErr = utils.CheckError(&w, err, http.StatusBadRequest)
	if hasErr {
		return
	}

	fmt.Println("Generating address")
	address := tools.GenerateAddress(utils.NumberOfWords)

	fmt.Println("Zipping files")
	err = utils.MakeZipFile(&sendHandler.files, *address)
	hasErr = utils.CheckError(&w, err, http.StatusInternalServerError)
	if hasErr {
		return
	}

	zipFile, err := os.Open("data/" + *address)
	hasErr = utils.CheckError(&w, err, http.StatusInternalServerError)
	if hasErr {
		return
	}

	// # # # # # # # # # Comment below to bypass AWS # # # # # # # # # # #
	//_, err = sendHandler.S3Service.PutObject(address, zipFile)
	//hasErr = utils.CheckError(&w, err, http.StatusInternalServerError)
	//if hasErr {
	//	return
	//}
	// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

	err = zipFile.Close()
	hasErr = utils.CheckError(&w, err, http.StatusInternalServerError)
	if hasErr {
		return
	}

	fmt.Println("Removing zip")
	err = os.Remove("data/" + *address)
	hasErr = utils.CheckError(&w, err, http.StatusInternalServerError)
	if hasErr {
		return
	}

	resp := ResponseData{
		Success: true,
		Address: *address,
	}

	respJson, err := json.Marshal(resp)
	hasErr = utils.CheckError(&w, err, http.StatusInternalServerError)
	if hasErr {
		return
	}

	w.Header().Add("content-type", "application/json")
	_, _ = w.Write(respJson)

	fmt.Println("All files successfully uploaded")

	fmt.Println("Done")
}
