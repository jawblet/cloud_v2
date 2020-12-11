//handle 404 error 
const handle404Error = (err, res) => {
    //handle 404 or CastError 
    console.log('handle 404');
    const code = 404;
    res.status(code).send({messages: 'That house isn\'t on our map.', fields: []});
}

//handle authentication error 
const handleAuthError = (err, res) => {
    const code = 401;
    res.status(code).send({messages: err.message, fields: []});
}

//handle email or usename duplicates
const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `An account with that ${field} already exists.`;
    res.status(code).send({messages: error, fields: field});
}

//handle field formatting, empty fields, and mismatched passwords 
const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);
    let code = 400;

    if(errors.length > 1) {
        const formattedErrors = errors.join(' ');
        res.status(code).send({messages: formattedErrors, fields: fields});
    } else {
        res.status(code).send({messages: errors, fields: fields})
    }
} 

//error controller function
module.exports = (err, req, res, next) => {
    try {
        if(err.name === 'ValidationError') return err = handleValidationError(err, res); 
        if(err.code && err.code == 401) return err = handleAuthError(err, res); 
        if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);
        if(err.code && err.code == 404) return err = handle404Error(err, res);
        if(err.name === 'CastError') return err = handle404Error(err, res); 
    } catch(err) {
        res.status(500).send('An unknown error occured.');
    }
}

