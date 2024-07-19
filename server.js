const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const bulkpeRoutes = require("./routes/bulkpeRoutes")

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/bulkpe", bulkpeRoutes)
app.use("/api/bulkpe", bulkpeRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
)
