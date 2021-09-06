package config

import "os"

type Config struct {
	Port string
}

func GetConfig() *Config {
	return &Config{
		Port: os.Getenv("port"),
	}
}
