package utils

import "mime/multipart"

func IsFileCountValid(files []*multipart.FileHeader) bool {
	if len(files) < 1 || len(files) > MaxNumOfFiles {
		return false
	}
	return true
}

func IsFileSizeValid(files []*multipart.FileHeader) bool {
	var size int64

	for _, v := range files {
		size += v.Size
	}

	if size > MaxUploadSize {
		return false
	}

	return true
}
