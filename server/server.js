// server/server.js
import dotenv from 'dotenv';
dotenv.config(); // Load .env variables

import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'

// MongoDB connection
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

mongoose.connection.once('open', () => {
  console.log("✅ MongoDB connected to DB name:", mongoose.connection.db.databaseName)
  console.log("✅ MongoDB URI being used")
})

mongoose.connection.on('error', (err) => {
  console.error("❌ MongoDB connection error:", err)
})

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server started on port ${config.port}`)
})
