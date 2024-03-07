// // cors.js
// module.exports = (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// };

const cors = require("cors");

const corsMiddleware = cors({
  origin: "http://localhost:8080", // Replace with your allowed origin(s)
  credentials: true, // Set to true if your requests need to send cookies
});

module.exports = corsMiddleware;
