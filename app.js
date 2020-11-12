const express = require('express'); 
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routers/authRouter');
const AppError = require('./utils/AppError');
const errorController = require('./controllers/errorController');

const app = express();
app.use(cors());
app.use(morgan('tiny'));

//serve static files from react app 
app.use(express.static(path.join(__dirname, 'react/build')));


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth/', authRouter);

app.use(errorController); 

module.exports = app; 




/*

app.all('*', (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

 */