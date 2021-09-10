package awsServices

import (
	"context"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"io"
)

type S3Service struct {
	bucket *string
	client *s3.Client
}

func GetS3Service(bucketName *string) *S3Service {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		// TODO
		panic("configuration error, " + err.Error())
	}
	client := s3.NewFromConfig(cfg)

	return &S3Service{bucket: bucketName, client : client}
}

func (s3Service *S3Service) PutFile(filename *string, file io.Reader) (*s3.PutObjectOutput, error) {
	input := &s3.PutObjectInput{
		Bucket: s3Service.bucket,
		Key:  filename,
		Body: file,
	}

	return s3Service.client.PutObject(context.TODO(), input)
}
