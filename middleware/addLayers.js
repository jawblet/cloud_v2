const addLayers = (req, res, next) => {
    //add layers and group
    //id must be string for dnd

    const groups = [
            {
                "label": "Group 1",
                "slug": "group-1",
                "id": "0",
                "layers": [
                    {
                        "label": "Layer 1",
                        "slug": "layer-1",
                        "id": "0",
                        "description": "//"
                    },
                    {
                        "label": "Layer 2",
                        "slug": "layer-2",
                        "id": "1",
                        "description": "//"
                    },
                    {
                        "label": "Layer 3",
                        "slug": "layer-3",
                        "id": "2",
                        "description": "//"
                    },
                    {
                        "label": "Layer 4",
                        "slug": "layer-4",
                        "id": "3",
                        "description": "//"
                    }
                ]
            },
            {
                "label": "Layers",
                "slug": "",
                "id": "ungrouped",
                "layers": [],
                }
    ];

    req.body.groups = groups;
    next(); 
}

module.exports = addLayers;

