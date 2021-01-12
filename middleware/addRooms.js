const addRooms = (req, res, next) => {
    //add layers and group
    //id must be string for dnd
    const rooms = [ 
        {label: 'Layer 1', slug: 'layer-1', id: "0", description: '//'},
        {label: 'Layer 2', slug: 'layer-2', id: "1", description: '//'}, 
        {label: 'Layer 3', slug: 'layer-3', id: "2", description: '//'},
        {label: 'Layer 4', slug: 'layer-4', id: "3", description: '//'}
    ];

    const groups = [
        {
            id: "0",
            label: "Group 1",
            slug: "group-1",
            layers: rooms },
        {
            id: "ungrouped",
            label: "All other layers",
            slug: "",
            layers: [] },
    ]

    req.body.rooms = rooms;
    req.body.groups = groups;
    next(); 
}

module.exports = addRooms;

