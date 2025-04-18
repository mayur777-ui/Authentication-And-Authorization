import './init.js'
import express from 'express';
import userRouter from './routers/user.route.js';
import cors from 'cors';
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    credentials: true,
  }));
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     res.setHeader(
//       "Content-Security-Policy",
//       "script-src 'self' https://accounts.google.com https://apis.google.com https://www.gstatic.com https://ssl.gstatic.com 'unsafe-inline';"
//     );
//     next();
//   });
  

// Use the user router
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3000;
app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

