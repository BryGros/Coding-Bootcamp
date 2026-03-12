// .env is used for 2 thing
// 1. env specific data like baseUrls, ports, etc
// 2. secrets - keys
require("dotenv").config();
const express = require("express");
// Gives us 12+ headers for security are set
// https://www.npmjs.com/package/helmet
const helmet = require("helmet");
// Rate limiting helps with preventing overusage (potential abuse)
// of your APIs
const rateLimit = require("express-rate-limit");

// if you try to access this API at all from a browser
// you will be blocked if you don't setup cors
// ideally you only allow for specific sites to hit your resources
// this prevents - API resource abuse
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware - Applied in order

// 1. Helmet - Sets secure HTTP headers

app.use(helmet());

// 2. CORS - Control which domains (browser) can access API
// avoid using * from any production sites
// if you set up CORS with all access, mention in your code that you know its not a secure practice

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// 3. Rate Limiting - Prevent brute force attacks/abuse
// 192.168.1.1 could only hit your endpoints 100 times in 12hrs

const limiter = rateLimit({
  windowMs: 720 * 60 * 1000, // 12hrs
  max: 100, // limit each recorded IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

//add limiter to only api based routes in case you are hosting a frontend
// under public
app.use("/api/", limiter);

// Stricter rate limit for authentication routes
// trying to brute force a password
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 3, // Limit each IP to 3 req per winowMs
  message: "Too many login attempts, please try again later",
});

app.use("/api/auth/", authLimiter);

// Strictest rate limit - 1 request per minute
const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1, // Only 1 request per minute
  message:
    "Rate limit exceeded: Only 1 request per minute allowed for this endpoint.",
});

// Parse JSON bodies
app.use(express.json());

// Test endpoint to demonstrate Helmet headers
app.get("/api/helmet-demo", (req, res) => {
  res.json({
    message:
      "Check the response headers to see Helmet security headers in action",
    tip: "Look for headers like X-Content-Type-Options, X-Frame-Options, etc.",
  });
});

app.get("/api/strict-limit", strictLimiter, (req, res) => {
  res.json({
    message: "Success! This endpoint allows only 1 request per minute.",
    timestamp: new Date().toISOString(),
    note: "Try hitting this endpoint again immediately - you will be rate limited",
  });
});

// Input validation example
app.post("/api/users", (req, res) => {
  const { username, email, password } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  // Validate username format (alphanumeric, 3-20 chars)
  const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      error: "Username must be 3-20 alphanumeric characters",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Invalid email format",
    });
  }

  // Validate password strength (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters with uppercase, lowercase, and number",
    });
  }

  res.json({
    message: "User validation passed",
    username,
    email,
  });
});

// Error handling - Don't expose stack traces in production
app.use((err, req, res, next) => {
  console.error(err.stack);

  // In production, send generic error message
  if (process.env.NODE_ENV === "production") {
    res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  } else {
    // In development, send detailed error
    // even better practice is to use logging tools like splunk or grafana
    // and use a secured dashboard to access the logs
    // and instead instead of returning the error stack
    // you can return a tracing id that you can use in a dashboard or
    // just in a logging file to find the information
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Secure Blog Server running on port ${PORT}`);
  console.log("\nSecurity Features Enabled:");
  console.log("  ✓ Helmet - Secure HTTP headers");
  console.log("  ✓ CORS - Cross-origin protection");
  console.log("  ✓ Rate Limiting - Brute force prevention");
  console.log("  ✓ Environment Variables - Secret management");
  console.log("  ✓ Hiding Stack trace from Production");
  console.log("\nEnvironment:", process.env.NODE_ENV || "development");
});
