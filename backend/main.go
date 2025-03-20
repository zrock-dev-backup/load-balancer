package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "ok",
		})
	})

	hostname, err := os.Hostname()
	if err != nil {
		log.Fatalf("Couldn't get hostname: %v", err)
	}
	


	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"hostname": hostname,
			"message":  "pong",
		})
	})
	router.Run()
}
