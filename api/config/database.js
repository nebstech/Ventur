import mongoose from "mongoose";

const db = mongoose.connection

mongoose.connect(process.env.DATABASE_URI)

db.on('connected', function(){
  console.log(`connected ${db.name} at ${db.host}:${db.port}`);
})

