const addRooms = (req, res, next) => {
    //add layers and group
    //id must be string for dnd
    /*
    const rooms = [ 
        {label: 'Layer 1', slug: 'layer-1', id: "0", description: '//'},
        {label: 'Layer 2', slug: 'layer-2', id: "1", description: '//'}, 
        {label: 'Layer 3', slug: 'layer-3', id: "2", description: '//'},
        {label: 'Layer 4', slug: 'layer-4', id: "3", description: '//'}
    ];
    */

    const groups = [
            {
                "label": "Group 1",
                "slug": "group-1",
                "id": "0",
                "zone": "water", 
                "layers": [
                    {
                        "label": "Layer 1",
                        "slug": "layer-1",
                        "id": "0",
                        "description": "//",
                        "color": "#6A87B6"
                    },
                    {
                        "label": "Layer 2",
                        "slug": "layer-2",
                        "id": "1",
                        "description": "//",
                        "color": "#829FCB"
                    },
                    {
                        "label": "Layer 3",
                        "slug": "layer-3",
                        "id": "2",
                        "description": "//",
                         "color": "#8CDDE8"
                    },
                    {
                        "label": "Layer 4",
                        "slug": "layer-4",
                        "id": "3",
                        "description": "//",
                        "color": "#8DC9E8"
                    }
                ]
            },
            {
                "label": "Layers",
                "slug": "",
                "id": "ungrouped",
                "layers": [],
                "zone": ""
                }
    ];

    //req.body.rooms = rooms;
    req.body.groups = groups;
    next(); 
}

module.exports = addRooms;

