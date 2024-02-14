require('dotenv').config();

const express = require('express');
const cors = require('cors');
const coockieParser = require('cookie-parser');
const app = express()
const PORT = process.env.PORT || 8080
const bookRouter = require('../src/routes/bookRouter');
const authRouter = require('../src/routes/authRouter');
const userRouter = require('../src/routes/userRouter');
const {requireAuth, checkUser} = require('./middleware/authMiddleware');

var corOptions = {
    origin: `http://localhost:${PORT}`,
}

app.use(cors(corOptions));

app.use(express.json());
app.use(coockieParser());
app.use('/api/books/',  (req, res, next) => {
   requireAuth(req, res, next);
});

app.use('/api/books/addBook', (req, res, next) => {
  checkUser(req, res, next);
});
app.use('/api/books/:id', (req, res, next) => {
  checkUser(req, res, next);
});

app.use('/api/users', (req,res,next)=>{
  checkUser(req, res, next);
});


app.use(express.urlencoded({ extended: true }));

app.use('/api/books', bookRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);



app.use((err, req, res, next) => {
    console.error(err)
    return res.status(err.status || 500).json({
        message: err.message || "Internal server error"
})
next()
});

app.listen(PORT, ()=> console.log(`Server is listening on http://localhost:${PORT}`));