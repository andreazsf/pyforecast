const express = require("express");
const path = require("path");
const cors = require("cors"); // Import the cors library
const fs = require("fs"); // Import fs to read db.json

const app = express();
const port = 3000;
const dataFile = path.join(__dirname, "db.json"); // Adjust path as needed

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Parse incoming JSON requests
app.use(express.json());

// Read data from db.json once at startup
let data = {};
fs.readFile(dataFile, "utf8", (err, fileData) => {
  if (err) {
    console.error("Error reading db.json:", err);
  } else {
    data = JSON.parse(fileData);
  }
});

// Middleware for handling CORS
app.use("/accounts", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Serve all
app.get("/accounts", (req, res) => {
  res.json(data.accounts);
});

// Serve filtered data based on URL path
app.get("/accounts/:id", (req, res) => {
  const accountId = req.params.id;
  const account = data.accounts.find(
    (account) => account.id === parseInt(accountId)
  );
  if (account) {
    res.json(account);
  } else {
    res.status(404).json({ error: "Account not found" });
  }
});

// Middleware for handling CORS
app.use("/inventory_books", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Serve all
app.get("/inventory_books", (req, res) => {
  res.json(data.inventory_books);
});

// Serve by id
app.get("/inventory_books/:id", (req, res) => {
  const inventoryId = req.params.id;
  const inventory = data.inventory_books.find(
    (inventory) => inventory.id === parseInt(inventoryId)
  );
  if (inventory) {
    res.json(inventory);
  } else {
    res.status(404).json({ error: "Account not found" });
  }
});

// Serve all
app.get("/sales", (req, res) => {
  res.json(data.sales);
});

// Serve by id
app.get("/sales/:id", (req, res) => {
  const salesId = req.params.id;
  const sales = data.sales.find((sales) => sales.id === parseInt(salesId));
  if (sales) {
    res.json(sales);
  } else {
    res.status(404).json({ error: "Account not found" });
  }
});

app.post("/accounts", function (req, res, next) {
  // Handle the post for this route
});
app.post("/accounts/:id", function (req, res, next) {
  // Handle the post for this route
});

app.post("/inventory_books", function (req, res, next) {
  // Handle the post for this route
});
app.post("/inventory_books/:id", function (req, res, next) {
  // Handle the post for this route
});

app.post("/sales", function (req, res, next) {
  // Handle the post for this route
});
app.post("/sales/:id", function (req, res, next) {
  // Handle the post for this route
});

// Serve static files (optional)
// app.use(express.static(path.join(__dirname, 'public'))); // Adjust path as needed

// Error handling (optional)
// app.use((err, req, res, next) => {
//   // Handle errors here
// });

// Assuming your data is stored in `db.accounts`
// app.delete("/accounts/:id", (req, res) => {
//   const accountId = parseInt(req.params.id);
//   const index = data.accounts.findIndex((account) => account.id === accountId);
//   if (index !== -1) {
//     // Remove the account from the data
//     data.accounts.splice(index, 1);
//     // Save the updated data to db.json (if needed)
//     fs.writeFile(dataFile, JSON.stringify(data), (err) => {
//       if (err) {
//         console.error("Error writing to db.json:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//       } else {
//         res.status(204).end(); // Respond with no content (success)
//       }
//     });
//   } else {
//     res.status(404).json({ error: "Account not found" });
//   }
// });

// const DeleteAccount = (payload) => {
//   app.delete(`/accounts/${payload.id}`, (req, res) => {
//     const accountId = parseInt(req.params.id);
//     const index = data.accounts.findIndex(
//       (account) => account.id === accountId
//     );
//     if (index !== -1) {
//       // Remove the account from the data
//       data.accounts.splice(index, 1);
//       // Save the updated data to db.json (if needed)
//       fs.writeFile(dataFile, JSON.stringify(data), (err) => {
//         if (err) {
//           console.error("Error writing to db.json:", err);
//           res.status(500).json({ error: "Internal Server Error" });
//         } else {
//           res.status(204).end(); // Respond with no content (success)
//         }
//       });
//     } else {
//       res.status(404).json({ error: "Account not found" });
//     }
//   });
// };

app.put("/accounts/:id", (req, res) => {
  const accountId = parseInt(req.params.id);
  const index = data.accounts.findIndex((account) => account.id === accountId);
  if (index !== -1) {
    const updatedAccount = req.body; // Assuming the request body contains the updated account data
    // Update the account in the data
    data.accounts[index] = updatedAccount;
    // Save the updated data to db.json (if needed)
    fs.writeFile(dataFile, JSON.stringify(data), (err) => {
      if (err) {
        console.error("Error writing to db.json:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json(updatedAccount); // Respond with the updated account
      }
    });
  } else {
    res.status(404).json({ error: "Account not found" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// export { app, DeleteAccount };
