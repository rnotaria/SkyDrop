package app

import (
	"github.com/gorilla/mux"
	"github.com/rnotaria/SkyDrop/app/awsServices"
	"github.com/rnotaria/SkyDrop/app/handler"
	"github.com/rnotaria/SkyDrop/config"
	"log"
	"net/http"
)

type App struct {
	Port string
	s3Service   *awsServices.S3Service
	SendHandler handler.SendHandler
	Router      *mux.Router
}

func (app *App) Init(config *config.Config) {
	app.Port = config.Port
	app.s3Service = awsServices.GetS3Service(&config.AWSBucket)
	app.SendHandler.S3Service = app.s3Service
	app.Router = mux.NewRouter()
	app.setRouters()
}

func (app *App) setRouters() {
	app.Router.HandleFunc("/test", app.SendHandler.Send).Methods("POST", "OPTIONS")
}

func (app *App) Run() {
	log.Fatal(http.ListenAndServe(":"+app.Port, app.Router))
}
