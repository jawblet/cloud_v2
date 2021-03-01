import GroupIcon from '../../svg/GroupIcon'; 
import { LayerIcon } from '../../svg/LayerIcons';
import { VscLock } from 'react-icons/vsc';
import { WiStrongWind, WiSmallCraftAdvisory, WiHorizon, WiMoonAltWaxingCrescent3, WiMoonAltWaxingGibbous3, WiNightAltRainWind } from 'react-icons/wi';

export const COLOR_HEADINGS = ['color', 'zone', 'description', 'layer ex.'];  

const l = "1.5rem";

export const SYMBOL_KEY = [
      { symbol: <GroupIcon l={l}/>, label: "A group, which may contain layers"},
      { symbol: <LayerIcon l={l} id="L1"/>, label: "A layer" },
      { symbol: <VscLock className="keyIcon"/> , label: "Private content"},
      { symbol: <WiStrongWind className="keyIcon"/>, label: "A strong wind bloweth" },
      { symbol: <WiSmallCraftAdvisory className="keyIcon"/>, label: "Flag in the ground"},
      { symbol: <WiHorizon className="keyIcon"/>, label: "Daily"},
      { symbol: <WiMoonAltWaxingCrescent3 className="keyIcon"/>, label: "Weekly" },
      { symbol: <WiMoonAltWaxingGibbous3 className="keyIcon"/>, label: "Monthly" },
      { symbol: <WiNightAltRainWind className="keyIcon"/>, label: "When it happens, you'll know" }


];

export const COLOR_KEY = [
    {
        label: 'Water', 
        zone: 'water',
        description: 'Fluid, self-directed, Bluets by Maggie Nelson', 
        layers: ['#6A87B6', '#829FCB', '#9CACC3']
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
        layers: ['#F2FFD0', '#EFD39A', '#DAFCC8']
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
        layers: ['#DA5A36', '#DC7828', '#C56933']
    },
    { 
        label: 'Default grass', 
        zone: 'grass',
        description: 'wild gra$$', 
        layers: ['#5D923A', '#77B591', '#9DC771']
    }
];

//flowing water 

//still water 

//default

//ungrouped --> sand 
