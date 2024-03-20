const express = require("express");
// imported third party packages
const cors = require("cors");
const cookieParser = require("cookie-parser");
const hpp = require("hpp");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

// implementing security middlewares
const securityMiddleware = (app) => {
  app.use(cookieParser());
  app.use(cors());
  app.use(hpp());
  app.use(helmet());
  app.use(mongoSanitize());

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb" }));

  const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
  app.use(limiter);
};

module.exports = securityMiddleware;
