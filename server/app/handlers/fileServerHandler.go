package handlers

import (
	"fmt"
	"github.com/rnotaria/SkyDrop/utils"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

type FileServerHandler struct {
	staticPath string
	indexPath  string
}

func (h *FileServerHandler) Init() {
	h.staticPath = "build"
	h.indexPath = "index.html"
}

func (h *FileServerHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Println("\nRequest made to FileServer")

	var hasErr bool

	path, err := filepath.Abs(r.URL.Path)
	path = strings.Replace(path, `C:\`, "/", 1) // Windows10 hack
	hasErr = utils.CheckError(&w, err, http.StatusBadRequest)
	if hasErr {
		return
	}

	path = filepath.Join(h.staticPath, path)

	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		hasErr = utils.CheckError(&w, err, http.StatusInternalServerError)
		if hasErr {
			return
		}
	}

	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}
