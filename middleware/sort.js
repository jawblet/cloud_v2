exports.aliasAtoZ = (req, res, next) => {
    console.log(req.originalUrl);
    req.query.sort = 'tag'; // sort tags alphabetically 
    next();
} 

exports.lastThree = (req, res, next) => { 
    req.query.limit = '3';
    next();
}