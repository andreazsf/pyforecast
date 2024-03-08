const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Replace with your data source
const corsMiddleware = require("./cors"); // Import the middleware

server.use(corsMiddleware);
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running on port 3000");
});
