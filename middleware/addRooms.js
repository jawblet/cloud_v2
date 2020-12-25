const addRooms = (req, res, next) => {
    const rooms = [ 
        {label: 'Kitchen', slug: 'kitchen', id: 0, description: ''}, 
        {label: 'Living room', slug: 'living-room', id: 1, description: ''}, 
        {label: 'Bedroom', slug: 'bedroom', id: 2, description: ''},
        {label: 'Basement', slug: 'basement', id: 3, description: ''}
    ];

    req.body.rooms = rooms;
    next(); 
}

module.exports = addRooms;