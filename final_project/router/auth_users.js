const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}
const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{
    let validusers = users.filter((user)=>{
      return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
      return true;
    } else {
      return false;
    }
  }
regd_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  console.log(username)
    if (username && password) {
      if (!doesExist(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
  });
//only registered users can login
regd_users.post("/login", (req,res) => {
     
    const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const review = req.body.review;
  const username = req.body.username;
  const isbn = req.params.isbn;
  if ( Object.keys(books[`${isbn}`].reviews).length) { 
    for (const [key, value] of Object.entries(books[`${isbn}`].reviews)) {
            
     
          if( books[`${isbn}`].reviews[ username ]  ){
              books[isbn].reviews[username]=  books[isbn].reviews[username]+review
          }
          else{
       
               books[isbn].reviews = { ... books[isbn].reviews, username:review} 
          }
        }
     }
     else{
         books[isbn].reviews[`${username}`]=review
     }
  return res.send(JSON.stringify(books[isbn],null,4));
 
});
regd_users.delete("/auth/review/:username", (req, res) => {
    const username = req.params.username;
 
 
for (const [key, value] of Object.entries(books)) {
 
   delete value.reviews[username] 
  }
 
    res.send(`all reviews  of username ${username} are deleted `);
   
  });
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
