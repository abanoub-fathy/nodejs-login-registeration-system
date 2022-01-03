const mongoose = require("mongoose");

// DB
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to DB Correctly"))
  .catch((err) => console.log("Error In connecting the database", err));
