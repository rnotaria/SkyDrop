package handler

import (
	"net/http"
)

type SendHandler struct {
}

func (h *SendHandler) GetTest(w http.ResponseWriter, r *http.Request) {
	//Allow CORS here By * or specific origin
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	w.Write([]byte("test"))
}
