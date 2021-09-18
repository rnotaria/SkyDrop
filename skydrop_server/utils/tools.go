package utils

import (
	"archive/zip"
	"bytes"
	"errors"
	"fmt"
	"io/ioutil"
	"mime/multipart"
	"net/http"
)

func FileCountValid(files []*multipart.FileHeader) error {
	if len(files) < 1 || len(files) > MaxNumOfFiles {
		return errors.New("file count not valid")
	}
	return nil
}

func FileSizeValid(files []*multipart.FileHeader) error {
	var size int64

	for _, v := range files {
		size += v.Size
	}

	if size > MaxUploadSize {
		return errors.New("file size not valid")
	}

	return nil
}

func CheckError(w *http.ResponseWriter, err error, code int) bool {
	if err != nil {
		fmt.Println("\nError:\n", err)
		(*w).WriteHeader(code)
		(*w).Write([]byte(err.Error()))
		return true
	}
	return false
}

func MakeZipFile(fileList *[]*multipart.FileHeader, zipName string) error {

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
