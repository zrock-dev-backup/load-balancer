package main

import (
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"hostname": os.Hostname,
			"message":  "pong",
		})
	})
	router.Run("localhost:3000")
}
