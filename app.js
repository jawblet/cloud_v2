const express = require('express');  
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/authRouter');
const viewRouter = require('./routers/viewRouter');
const userRouter = require('./routers/userRouter');
const houseRouter = require('./routers/houseRouter');
const groupRouter = require('./routers/groupRouter');
const postRouter = require('./routers/postRouter');
const tagRouter = require('./routers/tagRouter');
const commentRouter = require('./routers/commentRouter');
const searchRouter = require('./routers/searchRouter');
const AppError = require('./utils/AppError'); 
const errorController = require('./controllers/errorController');
const jwtSecret = process.env.JWT_SECRET;

const app = express(); 
app.set("trust proxy", 1);

app.use(cors({
   credentials: true,
   origin: [process.env.FE_URL]
 }));
app.use(morgan('tiny')); 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(jwtSecret));

app.use('/', viewRouter);
app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter); 
app.use('/houses', houseRouter);
app.use('/groups', groupRouter);
app.use('/tags', tagRouter);
app.use('/users', userRouter);
app.use('/search', searchRouter);

// Serve static assets from react if in production
if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, 'react/build')));
   app.get('*', (req, res) =>{
      res.sendFile(path.join(__dirname+'/react/build/index.html'));
   });
}

//handle errors
app.use(errorController); 

app.all('*', (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
 });

module.exports = app; 


