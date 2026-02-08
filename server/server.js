import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

// Create Express app
const app = express();

// Parse JSON bodies

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Define a simple route
app.get('/', (req, res) => res.send('server is running'));

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

// Start the server PORT is required
const PORT = process.env.PORT || 5000;

// To start the app app.listen is used
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

