import mongoose from "mongoose";

const db = mongoose.connection

mongoose.connect(process.env.DATABASE_URI)

