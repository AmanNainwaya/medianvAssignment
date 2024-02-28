

# Blogging API

This project is a RESTful API for a blogging platform built using Node.js, Express.js, and SQLite. It manages Users, Blogs, and Comments and demonstrates complex logical relationships and data storage using RESTful principles.

## Getting Started

To get started with the API, follow these steps:


Copy code
npm install

Run the server:
npm start


Usage


#Endpoints
GET / - Get a list of all users.

POST /user - Create a new user.

PUT /user/:id - Update user details.

DELETE /user/:id - Delete a user.

GET /comments - Get a list of all comments.

POST /comment - Create a new comment.

PUT /comment/:id - Update comment details.

DELETE /comment/:id - Delete a comment.

#Sample Requests
Create a User

POST /user
{
  "username": "john_doe",
  "email": "john@example.com"
}


Create a Comment

POST /comment
{
  "content": "Great post!",
  "author_id": 1,
  "blog_id": 1
}

