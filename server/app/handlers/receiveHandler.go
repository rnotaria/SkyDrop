package handlers

import (
	"errors"
	"fmt"
	"github.com/rnotaria/SkyDrop/app/awsServices"
	"github.com/rnotaria/SkyDrop/utils"
	"io"
	"net/http"
	"strconv"
)

type ReceiveHandler struct {
	S3Service *awsServices.S3Service
}

func (receiveHandler *ReceiveHandler) Receive(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, address")

	fmt.Println("\nRequest made to ReceiveHandler")

	var err error
	var hasErr bool

	if r.Method == "OPTIONS" {
		//TODO?
		return
	}

	address := r.Header.Get("address")
	if address == "" {
		err = errors.New("no address received")
		hasErr = utils.CheckError(&w, err, http.StatusNotFound)
		if hasErr {
			return
		}
	}

	// # # # # # # # # # Comment below to bypass AWS # # # # # # # # # # #
	obj, err := receiveHandler.S3Service.GetObject(&address)
	hasErr = utils.CheckError(&w, err, http.StatusNotFound)
	if hasErr {
		return
	}
	// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

	w.Header().Set("Content-Disposition", "attachment; filename=data/"+address)
	w.Header().Set("Content-Type", "application/zip")
	w.Header().Set("Content-Length", strconv.FormatInt(obj.ContentLength, 10))

	io.Copy(w, obj.Body)

	fmt.Println("Done")
}
