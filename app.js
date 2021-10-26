/*
 Authors:
 Your name and student #:
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require("fs").promises;
const { EOL } = require("os");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
    // Add your implementation here 
    let formData = req.body;
    let movieItems = (formData.text_area).split(",");
    
    res.render("pages/index", { movieItems })
});

app.get("/myListQueryString", (req, res) => {
    // Add your implementation here
    let movie1 = req.query.movie1;
    let movie2 = req.query.movie2;
    let movieItems = [movie1, movie2]
    res.render("pages/index", {movieItems});
});

const readData = (file) => {
    return new Promise((resolve, reject) => {
        const movieObj = {};
        fs.readFile(file, "utf-8")
        .then(result => {
            let items = (result.split(EOL));
            for (const iterator of items) {
                let tmp = iterator.split(":");
                movieObj[`${tmp[0]}`] = tmp[1];
            }
            resolve(movieObj);
        })
        .catch(err => reject(err));
    });
}

app.get("/search/:movieName", (req, res) => {
    // Add your implementation here
    let movieItem = (req.params.movieName).charAt(0).toUpperCase() + (req.params.movieName).slice(1);
    let movieDescription = undefined;
    let filename = "movieDescriptions.txt";
    
    readData(filename)
    .then(data => {
        if(movieItem in data) {
            movieDescription = data[movieItem];
        } else{
            movieDescription = "There is no description about this movie";
        }
        res.render("pages/searchResult", {movieItem, movieDescription});
    })
    .catch(err => console.log(err));
});

app.listen(3002, () => {
    console.log("Server is running on port 3000 🚀");
});