import GroupIcon from '../../svg/GroupIcon';
import { LayerIcon } from '../../svg/LayerIcons';

export const COLOR_HEADINGS = ['color', 'zone', 'description', 'layer ex.'];  

const l = "1.5rem";

export const SYMBOL_KEY = [
      { symbol: <GroupIcon l={l}/>, label: "A group, which may contain layers"},
      { symbol: <LayerIcon l={l} id="L1"/>, label: "A layer" }
];

export const COLOR_KEY = [
    {
        label: 'Water', 
        zone: 'water',
        description: 'Fluid, self-directed, Bluets by Maggie Nelson', 
        layers: ['#393C69', '#666F92', '#7A8FAF']
    },
    {
        label: 'Sand', 
        zone: 'sand',
        description: 'Elemental, shifting, grainy', 
        layers: ['#B4AE92', '#CEC7BC', '#EAE4D1']
    },
    {
        label: 'Stoneface',  
        zone: 'stoneface',
        description: 'Ageless, eroding, constant', 
        layers: ['#3C3C40', '#86888C', '#ACB0B7']
    },
    {
        label: 'Fungus', 
        zone: 'fungus',
        description: 'Enigmatic, creepy', 
        layers: ['#EFD39A', '#6C2321', '#D9C373']
    },
    { 
        label: 'Buried treasure', 
        zone: 'buriedTreasure',
        description: 'Hidden, mineral, coveted', 
        layers: ['#DBAC4E', '#EBD072', '#F0DAA3']
    },
    { 
        label: 'Clay deposit', 
        zone: 'clay',
        description: 'Slippery when wet', 
        layers: ['#8FA2A5', '#B16444', '#B7C1B4']
    }
];

//water, sand, stoneface, fungus, buried treasure 

//buried treasure 

//flowing water 

//still water 

//default

//ungrouped --> sand 
