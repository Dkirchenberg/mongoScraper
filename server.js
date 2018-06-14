var express = require("express");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");
var axios = require("axios");
// var logger = require("morgan");

// var db = require(".models");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
            "Scraping a news website and displaying\n" +
            "the headline, summary, and url of an article."
            + "\n***********************************\n");
 
// Making a request for the Daily Commercial news board. 
request("https://www.nytimes.com/", function(error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var results = [];

  // (i: iterator. element: the current element)
  $("h1.story-heading").each(function(i, element) {
  

    // Save the text of the element in a "title" variable
    var title = $(this).children("a").text();

   
    var link = $(this).children("a").attr("href");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: String(link)
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});

