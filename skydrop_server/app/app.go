package app

import (
	"github.com/gorilla/mux"
	"github.com/rnotaria/SkyDrop/app/handler"
	"log"
	"net/http"
)

type App struct {
	SendHandler handler.SendHandler
	Router      *mux.Router
}

func (app *App) Init() {
	app.Router = mux.NewRouter()
	app.setRouters()
}

func (app *App) setRouters() {
	app.Router.HandleFunc("/send", app.SendHandler.GetTest).Methods("GET", "OPTIONS")
}

func (app *App) Run(port string) {
	log.Fatal(http.ListenAndServe(":"+port, app.Router))
}
