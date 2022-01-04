require("./db/mongoose"); // for connecting to the database
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();

// passport config
require("./config/passport")(passport);

// views should come before routers //
// views
app.set("view engine", "ejs");
app.use(expressLayouts);

// bodyparser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// passport Initialize
app.use(passport.initialize());
app.use(passport.session());

// Flash Msgs
app.use(flash());

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// routers
app.use("/", require("./routers/index"));
app.use("/users", require("./routers/user"));
app.get("*", (req, res) => {
  res.render("not-found");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Started at port ${process.env.PORT}`);
});
