const app = require("./app");
const connectDatabase = require("./config/database");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "server/config/config.env" });
}

const server = app.listen(process.env.PORT || 2000, () => {
  console.log(`server listening at http://localhost:2000`);
  connectDatabase();
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shuttindown the server due to unHandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
