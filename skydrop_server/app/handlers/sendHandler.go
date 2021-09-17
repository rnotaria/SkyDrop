package handlers

import (
	"archive/zip"
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/rnotaria/SkyDrop/app/awsServices"
	"github.com/rnotaria/SkyDrop/app/tools"
	"github.com/rnotaria/SkyDrop/utils"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"
)

type SendHandler struct {
	S3Service *awsServices.S3Service
	files     []*multipart.FileHeader
}

func (sendHandler *SendHandler) Send(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	fmt.Println("\nRequest made to sendHandler")

	err := r.ParseMultipartForm(utils.MaxUploadSize)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	sendHandler.files = r.MultipartForm.File["files"]

	fmt.Println("Validating files")
	if !utils.IsFileCountValid(sendHandler.files) {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if !utils.IsFileSizeValid(sendHandler.files) {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Println("Generating address")
	address := tools.GenerateAddress(utils.NumberOfWords)

	fmt.Println("Zipping files")
	err = makeZipFile(&sendHandler.files, *address)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	zipFile, err := os.Open("data/" + *address)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// # # # # # # # # # Comment below to bypass AWS # # # # # # # # # # #
	_, err = sendHandler.S3Service.PutObject(address, zipFile)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

	zipFile.Close()

	fmt.Println("Removing zip")
	err = os.Remove("data/" + *address)
	if err != nil {
		fmt.Print(err)
	}

	resp := ResponseData{
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

	fmt.Println("All files successfully uploaded")

	fmt.Println("Done")
}

func makeZipFile(fileList *[]*multipart.FileHeader, zipName string) error {

	buffer := new(bytes.Buffer)
	zipWriter := zip.NewWriter(buffer)

	for _, file := range *fileList {
		zipFile, err := zipWriter.Create(file.Filename)
		if err != nil {
			return err
		}

		f, err := file.Open()
		if err != nil {
			return err
		}

		bodyBytes, err := ioutil.ReadAll(f)
		_, err = zipFile.Write(bodyBytes)
		if err != nil {
			return err
		}
	}

	err := zipWriter.Close()
	if err != nil {
		return err
	}

	ioutil.WriteFile("data/"+zipName, buffer.Bytes(), 0777)

	return nil
}
