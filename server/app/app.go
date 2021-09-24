package app

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/rnotaria/SkyDrop/app/awsServices"
	"github.com/rnotaria/SkyDrop/app/handlers"
	"github.com/rnotaria/SkyDrop/config"
	"log"
	"net/http"
)

type App struct {
	Port           string
	s3Service      *awsServices.S3Service
	SendHandler    handlers.SendHandler
	ReceiveHandler handlers.ReceiveHandler
	Router         *mux.Router
}

func (app *App) Init(config *config.Config) {
	fmt.Print("Initializing server...")
	app.Port = config.Port
	app.s3Service = awsServices.GetS3Service(&config.AWSBucket)
	app.SendHandler.S3Service = app.s3Service
	app.ReceiveHandler.S3Service = app.s3Service
	app.Router = mux.NewRouter()
	app.setRouters()
	fmt.Println("Server ready")
}

func (app *App) setRouters() {
	app.Router.HandleFunc("/api/send", app.SendHandler.Send).Methods("POST", "OPTIONS")
	app.Router.HandleFunc("/api/receive", app.ReceiveHandler.Receive).Methods("GET", "OPTIONS")
}

func (app *App) Run() {
	log.Fatal(http.ListenAndServe(":"+app.Port, app.Router))
}
