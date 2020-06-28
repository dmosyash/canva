# Canva

This is a web application for adding template on a blank canvas.

[Click here to see the live App](https://canva.netlify.app/)

This application is developed in angular.

## Structure of the App

The App is developed in angular. It is created with the help of **Angular cli**. No framework is used for CSS and modeling purpose. Home page of this app is divided into 2 parts

- Template List
- Workspace

#### Template List
It always stays on left of the page, this component is called in Template component. This component will call API to get all the templates, but it only shows/loads a few templates at a time. Pagination is added in this component by scrolling.

User can drag the templates from this component.

#### Workspace
This component deals with all the canvas activities. It has one blank canvas of 9:16 aspect ratio by default. Once the user drop the dragged template onto the canvas. Canvas draws 2 images on for the blur edges and other with the image's proper aspect ratio. It has a tilt functionality also, which revert the aspectRatio.

This component has a child component

- Toolbar

##### Toolbar
This component contains tools for the canvas. For now, It has only one tool that is Tilt. This calls the parent function to revert the canvas's aspect ratio.


### API Service
This application has only one service which is apiService. This service is used to interact with APIs. It has a function which gets all the templates.
