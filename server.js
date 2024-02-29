// // server.js
// const jsonServer = require("json-server");
// const cors = require("cors");
// const server = jsonServer.create();
// const router = jsonServer.router("database.json");
// const port = 3000;

// // Define custom middleware function for CORS
// const customMiddleware = (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// };

// // Use custom middleware for CORS
// server.use(cors());
// server.use(customMiddleware);

// server.use(router);

// server.listen(port, () => {
//   console.log(`JSON Server is running on port ${port}`);
// });

// // cors.js
// module.exports = (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// };

// server.js


const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const path = require("path");
const dbFilePath = path.resolve(__dirname, "src/server/db.json");
const router = jsonServer.router(dbFilePath);
const middlewares = jsonServer.defaults();

// Add authentication middleware
server.db = router.db;
server.use(auth);

// Enable CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(
    `JSON Server with authentication and CORS support is running on port ${PORT}`
  );
});
