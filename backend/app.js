import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// ------------------------------------------------------------------------------------------------------------------------
//                                                          Middleware
// ------------------------------------------------------------------------------------------------------------------------
app.use(cors({
    origin : process.env.CORS_ORIGIN,   
    credentials : true
}));
// CORS_ORIGIN=* : This was creating issue, bec of this I was getting token undefined
// CORS_ORIGIN=http://localhost:5173, this fixes the issue. With credentials true, specify specific ORIGIN url

// Handles the incoming request with JSON payload
app.use(express.json({limit : "16kb"}));


// Handles the incoming request with URL encoded payload
app.use(express.urlencoded({extended : true, limit : "16kb"}));
// extended : true allows to parse the nested object

// Serve static files
// app.use(express.static("public"))
// public is the folder where we store the static files like images, css, pdf, js etc.


// Handles the incoming request with cookies
app.use(cookieParser());



// __dirname (so we can serve static folder)
const __dirname = path.resolve();
console.log('__dirname ', __dirname);

// Serve uploads folder as static
app.use('/upload123', express.static(path.join(__dirname, '/upload')));
// http://localhost:8000/upload123/image-1757396794099.png -> Here you can see the image live

// ------------------------------------------------------------------------------------------------------------------------

//routes import
import productRouter from './src/routes/product.router.js';
import userRouter from './src/routes/user.router.js'
import orderRouter from './src/routes/order.router.js'
import configRouter from './src/routes/config.router.js';
import multerRouter from './src/routes/multer.router.js'

app.use("/api/v1", productRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/orders", orderRouter)
app.use('/api/config', configRouter);
app.use('/api/upload', multerRouter)


// http://localhost:8000/api/v1/{productRouter}

export default app; 