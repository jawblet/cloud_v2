import GroupIcon from '../../svg/GroupIcon'; 
import { VscMilestone } from 'react-icons/vsc';

export const COLOR_HEADINGS = ['color', 'zone', 'description', 'layer ex.'];  

const l = "1.5rem";

export const SYMBOL_KEY = [
      { symbol: <GroupIcon l={l}/>, label: "A group, which may contain layers."},
      { symbol: <VscMilestone className="keyIcon"/>, label: "A path, which connects posts across layers."}
];

