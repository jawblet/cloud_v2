const addRooms = (req, res, next) => {
    const rooms = [ 
        {label: 'Kitchen', slug: 'kitchen', id: 0}, 
        {label: 'Living room', slug: 'living-room', id: 1}, 
        {label: 'Bedroom', slug: 'bedroom', id: 2},
        {label: 'Basement', slug: 'basement', id: 3}
    ];

    req.body.rooms = rooms;
    next(); 
}

module.exports = addRooms;