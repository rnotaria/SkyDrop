package main

import (
	"github.com/rnotaria/SkyDrop/app"
	"github.com/rnotaria/SkyDrop/config"
)

func main() {
	config := config.GetConfig()
	app := &app.App{}
	app.Init(config)
	app.Run()
}
