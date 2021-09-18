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
	err = makeZipFile(&sendHandler.files, *address)
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
	_, err = sendHandler.S3Service.PutObject(address, zipFile)
	hasErr = utils.CheckError(&w, err, http.StatusInternalServerError)
	if hasErr {
		return
	}
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

	err = ioutil.WriteFile("data/"+zipName, buffer.Bytes(), 0777)
	if err != nil {
		return err
	}

	return nil
}
