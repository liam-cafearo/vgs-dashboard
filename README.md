# Video Game Sales Dashboard

## Table of contents

- [Video Game Sales Dashboard](#video-game-sales-dashboard)
    - [Table of contents](#table-of-contents)
    - [Overview](#overview)
        - [What and Who is this website for?](#what-and-who-is-this-website-for)
    - [UX](#ux)
        - [Retailer Persona](#retailer-persona)
        - [Actions the persona may carry out](#actions-the-persona-may-carry-out)
        - [Mockups](#mockups)
    - [Features](#features)
        - [Existing Features](#existing-features)
        - [Features Left to Implement](#features-left-to-implement)
    - [Technologies Used](#technologies-used)
    - [Testing](#testing)
    - [Deployment](#deployment)
    - [Credits](#credits)
        - [Content](#content)
        - [Media](#media)
        - [Acknowledgements](#acknowledgements)

## Overview

### What and Who is this website for?

This is my Stream Two project for [Code Institute](https://www.codeinstitute.net/). The project scope is to create a data dashboard using the technologies we have learned in Stream Two. This interactive Dashboard displays data on video game sales between the years 1976 - 2018.

## UX

The dashboard could be used by one of the following personas:

- A gamer who just wants to find out some video game data for fun.
- A retailer who may want to view the data to improve their knowledge of the sales data during this time in order to improve sales within their own shop.
- Someone from the Industry who like the retailer may want to view the data to improve their knowledge of the sales data during this time in order to improve insight into what games to develop or focus on in the future.

To begin with I focused on one type of persona rather than many. If the dashboard allowed me to focus on more than one persona I would focus on their needs as the dashboard evolved. The project in its final state aims to focus on the retailer persona. The persona I created is below.

### Retailer Persona

- **Fictional name:** Zach Smith
- **Age:** 35
- **Education:** Business Degree from University
- **Ethnicity:** White British
- **Family Status:** Married, no children
- **Job title:** Regional Manager for Video Game Store
- **Major Responsibilities:** Ensures that stores are meeting budgets set by head office. Makes decisions on what games are sold in which stores.
- **IT/ domain experience:** Good, Can use a computer competently
- **Personality:** Easy going but likes to be efficient with work flows
- **The goals and tasks they are trying to complete using the site:** Zach wants to see what platforms and genres are most popular within a given year. He also wants to see how sales compared between different countries.
- **Frequency of use:** how often are they likely to use the site: On a regular basis as this will provide insights to what games stores should be stocking.
- **A quote that sums up what matters most to the persona as it relates to your site:** Zach wants an efficient way to collate data on video game sales within different countries.

### Actions the persona may carry out

- As a Area Manager for a retail store who wants to find out about video games sales, I'd like to see the total number of EU sales.
- As a Area Manager for a retail store who wants to find out about video games sales, I'd like to see the total number of Japan sales.
- As a Area Manager for a retail store who wants to find out about video games sales, I'd like to see the total number of games in the data collection.
- As a Area Manager for a retail store who wants to find out about video games sales, I'd like to see the total number of global sales.
- As a Area Manager for a retail store who wants to find out about video games sales, I'd like to see the total number of North American Sales.
- As a Area Manager for a retail store who wants to find out about video games sales, I'd like to see which publishers sold the most games in a particular year.
- As a Area Manager for a retail store who wants to find out about video games sales, I'd like to know what year sold the most games
- As a Area Manager for a retail store who wants to find out about video games sales, I'd like to see what platform the most games were sold on.
- As a Area Manager for a retail store who wants to find out about video games sales, I'd like to see what genre sold the most games.
- As a Area Manager for a retail store who wants to find out about video games sales, I'd like to see a map to visualize what countries the games were sold in.

### Mockups

I also create some mockups of the site which can be viewed in the folder named 'mockups' of this GitHub repository.

## Features

### Existing Features

- loading page whilst data loads, this prevents visitors from thinking the webpage is broken.
- There are six metrics, five for EU, North America, Japan, Global and other sales and one that denotes the total number of games in the collection. This allows the user to see figures based on these categories and can manipulate them depending on what factors they choose in the charts.
- The year of sales chart allows the user to see the total number of games sold in a particular year and can interactive with the chart to display different data depending on what year(s) they choose.
- The genre chart allows the user to see the total number of games sold in a particular genre and can interactive with the chart to display different data depending on what genre(s) they choose.
- The platform chart allows the user to see the total number of games sold on a particular platform and can interactive with the chart to display different data depending on what platform(s) they choose.
- The publisher select menu allows the user to see the total number of games sold by a particular publisher and can interactive with the chart to display different data depending on what publisher(s) they choose.
- The data table shows all of the data within the data set. The user can use the pagination links at the bottom of the table to scroll through the data and table will also change depending on what is selected from the charts.

### Features Left to Implement

There are no more features left to implement as the project is now ready for marking.

## Technologies Used

- HTML5
  - This provides the basic layout of the webpage.
- CSS3
  - I have used some custom CSS to build on top of the styling provided by Bootstrap, introJs.css, dc.css and keen.css.
- [Bootstrap](http://getbootstrap.com)
  - I have used bootstrap to give my website a clean and responsive layout.
- JavaScript
  - I used some vanilla JS to get the pagination next and previous buttons working correctly. However the main bulk of the JavaScript makes use of the other JavaScript libraries included in this project.
- [crossfilter.js](https://square.github.io/crossfilter/)
  - I used v1.3.5 to manipulate the data and enable two way data binding.
- [d3.js](https://d3js.org/)
  - I use D3 v3.5.3 to render interactive charts and graphs based on the data I supplied.
- [dc.js](https://dc-js.github.io/dc.js/)
  - I use dc.js v2.1.10 to make plotting the charts easier.
- [intro.js](https://introjs.com/)
    - I use intro.js v2.9.3 to create an onboarding process for the dashboard
- [keen.js](https://github.com/keen/dashboards)
    - Used in conjunction with bootstrap to build a dashboard template.
- [queue.js](https://github.com/d3/d3-queue)
- - Queue.js helps with the asynchronous functions within JavaScript.
- [Python](https://www.python.org/)
  - I used Python v2.7.15 along with the Flask micro framework and pymongo module to handle the connection to the MongoDB database, the app routing and template rendering.
- [Flask](http://flask.pocoo.org/)
  - I used Flask v1.0.2 to build a server that handles the interaction with MongoDB and render the templates. It also allowed me to use template inheritance which made it easier to manage the source code but also makes it easier to add in further functionality in the future if required.
- [pymongo](https://api.mongodb.com/python/current/)
  - I used pymongo v3.7.1 module which acted as the driver for the connection to the MongoDB database.
- [MongoDB](https://www.mongodb.com/)
  - I used MongoDB v4.0.0 to create a database that holds the data for the Video Game Sales dashboard.
- [Heroku](https://www.heroku.com/)
    - Used to deploy and host the dashboard.

## Testing

## Deployment

## Credits

### Content

### Media

### Acknowledgements
