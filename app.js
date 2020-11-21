const express = require('express'); 
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/authRouter');
const viewRouter = require('./routers/viewRouter');
const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');
const AppError = require('./utils/AppError');
const errorController = require('./controllers/errorController');
const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(cors());
app.use(morgan('tiny')); 

//serve static files from react app 
app.use(express.static(path.join(__dirname, 'react/build')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(jwtSecret));

app.use((req, res, next) => {
   console.log('middleware');
   next();
});

app.use('/', viewRouter);
app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);

app.get('*', (req, res) =>{
	res.sendFile(path.join(__dirname+'/react/build/index.html'));
});

app.use(errorController); 

app.all('*', (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
 });

module.exports = app; 


