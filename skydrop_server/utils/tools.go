package utils

import (
	"errors"
	"fmt"
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
