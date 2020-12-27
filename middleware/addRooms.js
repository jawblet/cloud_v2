const addRooms = (req, res, next) => {
    const rooms = [ 
        {label: 'Layer 1', slug: 'layer-1', id: 0, description: ''}, 
        {label: 'Layer 2', slug: 'layer-2', id: 1, description: ''}, 
        {label: 'Layer 3', slug: 'layer-3', id: 2, description: ''},
        {label: 'Layer 4', slug: 'layer-4', id: 3, description: ''}
    ];
    req.body.rooms = rooms;
    next(); 
}

module.exports = addRooms;