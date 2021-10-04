package config

import "os"

type Config struct {
	Port      string
	AWSBucket string
	AWSRegion string
}

func GetConfig() *Config {
	return &Config{
		Port:      os.Getenv("PORT"),
		AWSBucket: os.Getenv("AWS_BUCKET"),
		AWSRegion: os.Getenv("AWS_DEFAULT_REGION"),
	}
}
