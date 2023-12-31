//jshint esversion:6
// require modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const { get } = require("lodash");
const _ = require('lodash');

const port = 3000;

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
let composeObjectsArray = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

function truncateText(text, maxLength){ // yruncate homepage text
  if(text.length > maxLength){
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
};

app.locals.truncateText = truncateText;


app.get("/", function(req, res){  // home route

  res.render("home", {
    startingContent: homeStartingContent,
    composeObject: composeObjectsArray
  })

})

app.get("/about", function(req, res){

  res.render("about", {
    aboutContent: aboutContent 
  })

})

app.get("/contact", function(req, res){

  res.render("contact", {
    contactContent: contactContent 
  })

})

app.get("/compose", function(req, res){

  res.render("compose")

})

app.post("/compose", function(req,res){ //handle compose route POST request

  const composeObject = {
    composeTitle:req.body.composeTitle1,
    composePost:req.body.composePost1
  };

  composeObjectsArray.push(composeObject);

  res.redirect("/");

})

app.get("/posts/:postName", function(req, res){

  let postName = _.lowerCase(req.params.postName);
  let matchFound = false;

  composeObjectsArray.forEach(function(composeObject){
    let postTitle = _.lowerCase(composeObject.composeTitle);
    
    if (postTitle === postName){
      console.log("Match found!");
      matchFound = true;

      // You can render the post directly here
      res.render("post", {
        postTitle:composeObject.composeTitle,
        startingContent: composeObject.composePost
       });
    }
  });

  if (!matchFound) {
    console.log("Match not found");
    // You might want to handle the case where no match is found, for example, render a 404 page.
    res.render("error");
  }
});



app.listen(port, function() {
  console.log("Server started on port 3000");
});
