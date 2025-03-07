import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import connectToMongo from './db.js';
import authRoutes from './routes/auth.js'; // Ensure the .js extension is included

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8181;

app.post('/register', (req, res) => {
  res.send('Register works!');
});

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// CORS - Allow only frontend requests from localhost:5173
const allowedOrigins = [
  "http://localhost:5173", // Adjust if your frontend runs on a different port
  "https://blokhinamaria.github.io/",
];

// CORS - Allow frontend requests from localhost:5173
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request
    } else {
      callback(new Error("Not allowed by CORS")); // Block request
    }
  },
  methods: "GET,POST,PUT,DELETE", // Adjust as needed
  credentials: true, // If using cookies or authentication
  allowedHeaders: 'Content-Type,Authorization', // Optional: Specify allowed headers
}));


// Connect to MongoDB
connectToMongo();

app.use('/api/auth', (req, res, next) => {
  console.log(`📡 Received ${req.method} request on ${req.originalUrl}`);
  next();
});
app.use('/api/auth', authRoutes);

// Routes (using dynamic import)
// app.use('/api/auth/register', async (req, res, next) => {
//   const { default: authRoutes } = await import('./routes/auth.js');
//   return authRoutes(req, res, next);
// });

// Default route
app.get('/', (req, res) => {
  res.send('Hello World! Whats Up');
});

app.get('/test', (req, res) => {
  res.send('Test route works!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

