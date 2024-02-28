

const sqlite3 = require('sqlite3');





const express = require("express");
// const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const app = express();
const dbPath = path.join(__dirname, "database.db");
app.use(express.json());
let database = null;
const initializeDbAndServer = async () => {
  try {
    database = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(4000, () => {
      console.log("Server Is running on http://localhost:4000");
    });
  } catch (error) {
    console.log(`Data base Error is ${error}`);
    process.exit(1);
  }
};
initializeDbAndServer();

// return a list of all the users from the users
// API 1

const convertDbObject = (objectItem) => {
  return {
    id: objectItem.id,
    username: objectItem.username,
    email: objectItem.email,
  };
};

app.get("/", async (request, response) => {
  const getUsersQuery = `select * from users`;
  const getUsersQueryResponse = await database.all(getUsersQuery);
  response.send(
    getUsersQueryResponse.map((eachUser) => convertDbObject(eachUser))
  );
});

//create a user into data base
// API 2

app.post("/user/", async (request, response) => {
  const { username, email } = request.body;
  const createUserQuery = ` insert into users(username,
    email) 
    values('${username}','${email}');`;
  const createUserQueryResponse = await database.run(createUserQuery);
  response.send(`User Added to users`);
});


//update the details of the user using user ID
// API 3

app.put("/user/:id/", async (request, response) => {
  const { id } = request.params;
  const { username, email } = request.body;
  const updateUserDetailsQuery = `update users set 
  username = '${username}' , email = '${email}' 
  where id = ${id};`;
  await database.run(updateUserDetailsQuery);
  response.send("User Details Updated");
});

// delete the user details
//API 4

app.delete("/user/:Id/", async (request, response) => {
  const { id } = request.params;
  const deleteuserQuery = `
  DELETE FROM
    users
  WHERE
    id = ${id};`;
  await database.run(deleteUserQuery);
  response.send("User Removed");
});


// get all comments
// API 5

const convertCommentDbObject = (objectItem) => {
    return {
      content: objectItem.content,
      author_id: objectItem.author_id,
      blog_id: objectItem.blog_id,
    };
  };


app.get("/comments", async (request, response) => {
    const getCommentQuery = `select * from comments`;
    const getCommentQueryResponse = await database.all(getCommentQuery);
    response.send(
      getCommentQueryResponse.map((eachComment) => convertCommentDbObject(eachComment))
    );
  });
  
  //create a user into data base
  // API 2
  
  app.post("/user/", async (request, response) => {
    const { content, author_id, blog_id } = request.body;
    const createCommentQuery = ` insert into comments(content,
      author_id,blog_id) 
      values('${content}','${author_id}','${blog_id}');`;
    const createCommentQueryResponse = await database.run(createCommentQuery);
    response.send(`Comment Added to comments`);
  });
  
  
  //update the details of the Comment using  ID
  // API 3
  
  app.put("/comments/:id/", async (request, response) => {
    const { id } = request.params;
    const { content, author_id, blog_id } = request.body;
    const updateCommentDetailsQuery = `update comments set 
    content = '${username}' , author_id = '${author_id}' , blog_id = '${blog_id}'
    where id = ${id};`;
    await database.run(updateCommentDetailsQuery);
    response.send("Comment Details Updated");
  });
  
  // delete the comment details
  //API 4
  
  app.delete("/comments/:Id/", async (request, response) => {
    const { id } = request.params;
    const deleteCommentQuery = `
    DELETE FROM
      comments
    WHERE
      id = ${id};`;
    await database.run(deleteCommentQuery);
    response.send("comment Removed");
  });






module.exports = app;


