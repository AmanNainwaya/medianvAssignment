

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
    name: objectItem.name,
    img: objectItem.img,
    summary: objectItem.summary,
  };
};

app.get("/", async (request, response) => {
  const getBookQuery = `select * from books`;
  const getBookQueryResponse = await database.all(getBookQuery);
  response.send(
    getBookQueryResponse.map((eachBook) => convertDbObject(eachBook))
  );
});

//create a user into data base
// API 2

app.post("/user/", async (request, response) => {
  const { name, img, summary } = request.body;
  const createBookQuery = ` insert into users(name,
    img,summary) 
    values('${name}','${img}','${summary}');`;
  const createBookQueryResponse = await database.run(createBookQuery);
  response.send(`Book Added to books`);
});


//update the details of the user using user ID
// API 3

app.put("/book/:name/", async (request, response) => {
  const { name } = request.params;
  const { name, img, summary } = request.body;
  const updateBookDetailsQuery = `update books set 
  name = '${name}' , img = '${img}', summary = '${summary}' 
  where name = ${name};`;
  await database.run(updateBookDetailsQuery);
  response.send("Book Details Updated");
});

// delete the user details
//API 4

app.delete("/user/:name/", async (request, response) => {
  const { name } = request.params;
  const deleteuserQuery = `
  DELETE FROM
    books
  WHERE
    name = ${name};`;
  await database.run(deleteBookQuery);
  response.send("Book Removed");
});









module.exports = app;


