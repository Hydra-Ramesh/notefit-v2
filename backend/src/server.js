import express from 'express';
import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
dotenv.config();

const port = process.env.PORT;

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
