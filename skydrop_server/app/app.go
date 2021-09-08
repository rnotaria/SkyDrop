package app

import (
	"github.com/gorilla/mux"
	"github.com/rnotaria/SkyDrop/app/awsService"
	"github.com/rnotaria/SkyDrop/app/handler"
	"github.com/rnotaria/SkyDrop/config"
	"log"
	"net/http"
)

type App struct {
	Port        string
	awsSession  *awsService.Session
	SendHandler handler.SendHandler
	Router      *mux.Router
}

func (app *App) Init(config *config.Config) {
	app.Port = config.Port
	app.awsSession = awsService.NewAwsSession()
	app.awsSession.Init(config)
	app.SendHandler.AwsSession = app.awsSession
	app.Router = mux.NewRouter()
	app.setRouters()
}

func (app *App) setRouters() {
	app.Router.HandleFunc("/test", app.SendHandler.Send).Methods("POST", "OPTIONS")
}

func (app *App) Run() {
	log.Fatal(http.ListenAndServe(":"+app.Port, app.Router))
}
