package main

import "fmt"

func main() {
	// an echo server
	// that renders go templates
	// the templates include a server rendered react app
	// props for the react app of the page are POSTed to an endpoint that returns an html snippet
	// the html snipped contains the prerendered html and the client side react app for hydration
	fmt.Println("Hello world")
}
