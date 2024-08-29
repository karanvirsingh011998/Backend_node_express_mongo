import dotenv from 'dotenv'
import connectDB from './db/index.js'

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

dotenv.config({
    path: './env'
})

connectDB()