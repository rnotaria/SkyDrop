package awsServices

import (
	"context"
	"fmt"
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

	return &S3Service{bucket: bucketName, client: client}
}

func (s3Service *S3Service) PutObject(key *string, file io.Reader) (*s3.PutObjectOutput, error) {
	fmt.Println("s3Service: Adding object to S3 bucket")

	input := &s3.PutObjectInput{
		Bucket: s3Service.bucket,
		Key:    key,
		Body:   file,
	}

	return s3Service.client.PutObject(context.TODO(), input)
}

func (s3Service *S3Service) GetObject(key *string) (*s3.GetObjectOutput, error) {
	fmt.Println("s3Service: Retreiving object from S3 bucket")

	input := &s3.GetObjectInput{
		Bucket: s3Service.bucket,
		Key:    key,
	}

	return s3Service.client.GetObject(context.TODO(), input)
}

func (s3Service *S3Service) ListObjects(key *string) (*s3.ListObjectsV2Output, error) {
	fmt.Println("s3Service: Listing objects in S3 bucket")

	input := &s3.ListObjectsV2Input{
		Bucket: s3Service.bucket,
		Prefix: key,
	}

	return s3Service.client.ListObjectsV2(context.TODO(), input)
}
