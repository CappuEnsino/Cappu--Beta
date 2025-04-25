const session = require("express-session");

const sessionConfig = {
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
  },
};

module.exports = session(sessionConfig);
