import bob from '../assets/pics/bob-screenshot.png';
import ac from '../assets/pics/ac-screenshot.png';
import hypertext from '../assets/pics/hypertext-screenshot.png';
import clubPenguin from '../assets/pics/club-penguin-big.png';
import { LayerIcon } from '../svg/LayerIcons';

const l = '1rem';
const fill = '#312F2C'

export const THEMES = [
    {theme: <span> alternate computing <b>metaphor</b>s</span>, color: '#EA9144'},
    {theme: <span> <b>domestic</b> knowledge organization</span>, color: '#4EAAC6'},
    {theme: <span> <b>epistolary</b> correspondence</span>, color: '#FFE073'},
    {theme: <span>and <b>hypertext</b></span>, color: '#D7F08E'}
];


//memory 
const MemoryPalaces = () => {
    return (
        <div className="reference__dropdown__content">
            <ul>
                <li>G sent certain people too many links</li>
                <li>Memory palace</li>
                <li>Anaimal Crossing island</li>
                <li>Club Penguin igloo</li>
                <li>Place for collection + memory instead of infinite scroll</li>
            </ul>
        </div>
    )
}

//metaphor 
const Metaphors = () => {
    return (
        <div className="reference__dropdown__content">
            <ul>
                <li>"This is not my beautiful house" essay</li>
                <li>Desktop metaphor (I WANT TO MENTION STEVE JOBS)</li>
                <li>Covid + being stuck at home ...?</li>
                <li>"My website is a shifting house next to a river of knowledge"</li>
            </ul>
        </div>
    )
}

//landscape  
const Technopastoral = () => {
    return (
        <div className="reference__dropdown__content">
            <ul>
                <li>Geocities</li>
                <li>Pastoral, Agnes Martin</li>
            </ul>
        </div>
    )
}

//domestic + desire 
const Pamphilia = () => {
    return (
        <div className="reference__dropdown__content">
             <ul>
                <li>MA's essay</li>
                <li>Anne Carson on desire</li>
                <li>Jo and Clara</li>
            </ul>
        </div>
    )
}

//mapping
const Wark = () => {
    return(
        <div className="reference__dropdown__content">
            <ul>
                <li>emails</li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
}



// ① ②  ③ 
const HyperText = () => { 
    return (
       <div className="reference__dropdown__content">
            <div className="reference__dropdown__item">
              <sup className="reference__dropdown__sup">1&nbsp;</sup> 
              <p className="reference__dropdown__text">
              This 
                <a href="https://www.wired.com/1995/06/xanadu/" target="_blank" className="styledLink"> 
                &nbsp;Wired article (1995)&nbsp;
                </a> 
                about Ted Nelson's Xanadu project.
              </p>
            </div>

            <div className="reference__dropdown__item">
                <sup className="reference__dropdown__sup">2&nbsp;</sup> 
                <p className="reference__dropdown__text">
                A long digression looking at 
                <a href="https://roamresearch.com/" target="_blank" className="styledLink">
                   &nbsp;Roam Research&nbsp;
                </a>
                as a modern hypertext-type project.
                <blockquote>
                <code className="bold">jb:&nbsp;</code>
                <code>
                Then I started looking at this platform called Roam Research, which is more similar to our structure. 
                They have no folders (!) and all the pages are connected by internal links. It's very hypertextual. 
                </code>
                </blockquote>
               </p>
            </div>

            <div className="reference__dropdown__item"> 
                <sup className="reference__dropdown__sup">3&nbsp;</sup> 
                <p className="reference__dropdown__text">
                This
                <a href="https://www.are.na/blog/women-in-hypertext" target="_blank" className="styledLink"> 
                &nbsp;are.na blog post (2018)&nbsp;
                </a>
                about Judy Malloy and Cathy Marshall's <em>Forward Anywhere</em> &nbsp; 
                <blockquote>
                    "Cathy showed Judy VIKI, a spatial hypertext system she was building that allowed for soft, implicit associations between ideas. 
                    Judy commented on the system’s colors, then hurried to the next stop of her tour, dripping pea juice and blood."
                </blockquote>
                </p>
            </div>
        </div>
    )
}


export const SYLLABUS_HEADERS = [
    {title: 'Memory palaces',
    icon: <LayerIcon id='L0' l={l} fill={fill}/>,
    dropdown: <MemoryPalaces/>
},
    {title: 'Against the desktop metaphor',
    icon:  <LayerIcon id='L1' l={l} fill={fill}/>,
    dropdown: <Metaphors/> 
},
    {title: 'Alternate software landscapes',
    icon:  <LayerIcon id='L1' l={l} fill={fill}/>,
    dropdown: <Technopastoral/> 
    },
    {title:'Pamphilia & domestic aesthetics',
    icon:  <LayerIcon id='L2' l={l} fill={fill}/>,
    dropdown: <Pamphilia/> 
},
    {title: '"I\'m Very Into You"',
    icon: <LayerIcon id='L3' l={l} fill={fill}/>,
    dropdown: 'asldksld;'
},
    {title: 'Ted Nelson & Xanadu',
    icon:<LayerIcon id='L4' l={l} fill={fill}/> ,
    dropdown: <HyperText/>
},
    {title: '"Times Square Red, Times Square Blue"',
    icon:<LayerIcon id='L4' l={l} fill={fill}/> ,
    dropdown: ""
},
    {title: 'Hypertextiles',
    icon:<LayerIcon id='L5' l={l} fill={fill}/> ,
    dropdown: ""
},
    {title: '"Forward Anywhere"',
    icon:<LayerIcon id='L6' l={l} fill={fill}/> ,
    dropdown: ""
},
];

//<img src={ac} alt='animal crossing' className='syllabus__img'/>
//<img src={bob} alt='microsoft bob' className='syllabus__img'/>

/*
{title:`I'm very into you & wayfinding`,
    icon:  <LayerIcon id='L1' l={l} fill={fill}/>,
    dropdown: ''
 },
 */

 //<img src={hypertext} alt='forward anywhere floppy disk' className='syllabus__img'/>
 //            <img src={clubPenguin} alt='club penguin' className="reference__img"/>
