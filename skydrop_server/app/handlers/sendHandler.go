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

	fmt.Println("Validating files...")
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
	fmt.Println("Address:", *address)

	err = makeZipFile(&sendHandler.files, *address)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// # # # # # # # # # Comment below to bypass AWS # # # # # # # # # # #
	//key := *address
	//zipFile, err := os.Open("data/" + *address + ".zip")
	//defer zipFile.Close()
	//
	//if err != nil {
	//	http.Error(w, err.Error(), http.StatusInternalServerError)
	//	return
	//}
	//
	//_, err = sendHandler.S3Service.PutObject(&key, zipFile)
	//if err != nil {
	//	http.Error(w, err.Error(), http.StatusInternalServerError)
	//	return
	//}
	// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

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

	fmt.Println("All files successfully uploaded to", *address)

	// TODO delete zip file


	fmt.Println("Done")
}

func makeZipFile(fileList *[]*multipart.FileHeader, zipName string) error {
	fmt.Println("Creating zip file")

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

	ioutil.WriteFile("data/"+zipName+".zip", buffer.Bytes(), 0777)


	return nil
}
