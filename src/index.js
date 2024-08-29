import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";

// (async () => {
//     const app = express()

//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

//         app.listen( process.env.PORT, ()=>{
//             console.log('listening on ')
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })();
const app = express();

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERR", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server running");
    });
  })
  .catch((error) => console.log("error connecting DB", error));
