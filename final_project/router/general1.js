const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    return res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
 
  const isbn = req.params.isbn;
  let filtered_books = {};
  for (const [key, value] of Object.entries(books)) {
 
    if(key == isbn){
        filtered_books[key]=value
    }
  }
  return res.send(JSON.stringify(filtered_books,null,4));
 
 
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
  let filtered_books = {};
  for (const [key, value] of Object.entries(books)) {
 
    if(value.author==author){
        filtered_books[key]=value
    }
  }
  return res.send(JSON.stringify(filtered_books,null,4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let filtered_books = {};
    for (const [key, value] of Object.entries(books)) {
   
      if(value.title==title){
          filtered_books[key]=value
      }
    }
    return res.send(JSON.stringify(filtered_books,null,4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let review = {};
    for (const [key, value] of Object.entries(books)) {
   
      if(key == isbn){
          review['review']=value.reviews
      }
    }
    return res.send(JSON.stringify(review,null,4));
});

module.exports.general = public_users;
