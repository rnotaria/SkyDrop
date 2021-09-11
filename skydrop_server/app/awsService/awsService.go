package awsService

import (
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/rnotaria/SkyDrop/config"
	"mime/multipart"
)

type Session struct {
	s3Session *s3.S3
	bucket    string
	region    string
}

func NewAwsSession() *Session {
	return &Session{}
}

func (awsSession *Session) Init(config *config.Config) {
	awsSession.bucket = config.AWSBucket
	awsSession.region = config.AWSRegion
	awsSession.s3Session = s3.New(session.Must(session.NewSession(&aws.Config{
		Region: aws.String(config.AWSRegion),
	})))

}

func (awsSession *Session) UploadFile(file *multipart.FileHeader) (resp *s3.PutObjectOutput, err error) {
	fmt.Println("Uploading", file.Filename, "to AWS")
	openedFile, err := file.Open()
	defer openedFile.Close()
	if err != nil {
		return nil, err
	}

	resp, err = awsSession.s3Session.PutObject(&s3.PutObjectInput{
		Body:   openedFile,
		Bucket: aws.String(awsSession.bucket),
		Key:    aws.String(file.Filename),
	})
	if err != nil {
		return nil, err
	}

	return resp, nil
}
