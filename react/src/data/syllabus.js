import { LayerIcon } from '../svg/LayerIcons';

/*
    {text: '', // array 
    dropdown: '', // array of components 
    right: '', // row right 
    left: '' // row left 
    }
 */

export const ROWS = [ 
 { // row 1 
    components: [ 
        { id: 0,
        text: "Memory palaces",
        dropdown: 'yoyoyo',
        }, 
        { id: 1,
        text: "Club Penguin & Animal Crossing",
        dropdown: 'yoyoyo',
        }
    ],
    right: '',
    left: '0'
},
{ // row 2 
    components: [ 
        { id: 2,
        text: "My website is a shifting house next to a river of knowledge. What could yours be?",
        dropdown: '???!!',
    }],
    right: '',
    left: '0'
},
]


const l = '1rem';
const fill = '#312F2C'

//memory 
const metaphors = [
    {component: <p>Memory palaces</p>
    },
    {component: <p>Dynamic virtual homes like Animal Crossing islands and Club Penguin igloos</p>
    },
    {component:  <p> <a href="https://web.archive.org/web/20200714135951/http://www.continentcontinent.cc/index.php/continent/article/view/334"
    target="_blank" className="styledLink">
        This is Not my Beautiful House: Examining the Desktop Metaphor, 1980-1995 &nbsp; 
        </a>
        (archived by the Wayback machine)</p>
    },
    {component: <p>The meditative invitation from Agnes Martin's paintings</p>,
    },
    {component: <p>
        <a href="https://thecreativeindependent.com/people/laurel-schwulst-my-website-is-a-shifting-house-next-to-a-river-of-knowledge-what-could-yours-be/"
            target="_blank" className="styledLink">
            My website is a shifting house next to a river of knowledge. What could yours be? </a>
        </p>},
    {component: <li>G sent certain people too many links</li>
    },
    {component:  <li>Geocities</li> },
     
];
       
/*
    <li>Place for collection + memory instead of infinite scroll</li>
    <li>Desktop metaphor (I WANT TO MENTION STEVE JOBS)</li>
    <li>Covid + being stuck at home ...?</li> 
*/
              
          
          
const epistolary = [
    { component: <p>MA's essay</p> },
    { component:   <p className="wark">I'm very into you</p> }
];
               
           
// ① ② ③ 
const hypertext = [
    {component: <p>
        This 
        <a href="https://www.wired.com/1995/06/xanadu/" target="_blank" className="styledLink"> 
            &nbsp;Wired article (1995)&nbsp;
        </a> 
        about Ted Nelson's Xanadu project. </p>},
    {component: <p> A long digression looking at 
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
    },
    {component:  <p>
        Hypertextiles
    </p>
    },
    {component: <p>
        This
        <a href="https://www.are.na/blog/women-in-hypertext" target="_blank" className="styledLink"> 
        &nbsp;are.na blog post (2018)&nbsp;
        </a>
        about Judy Malloy and Cathy Marshall's <em>Forward Anywhere</em> &nbsp; 
        <blockquote>
            "Cathy showed Judy VIKI, a spatial hypertext system she was building that allowed for soft, implicit associations between ideas. 
            Judy commented on the system’s colors, then hurried to the next stop of her tour, dripping pea juice and blood."
        </blockquote>
    </p>},

];    



export const SYLLABUS_HEADERS = [
    {title: 'Domestic computing metaphors',
    icon: <LayerIcon id='L0' l={l} fill={fill}/>,
    column: metaphors
},
    {title: 'Epistolary narratives',
    icon:  <LayerIcon id='L1' l={l} fill={fill}/>,
    column: epistolary
},
    {title: 'Hypertext',
    icon:  <LayerIcon id='L2' l={l} fill={fill}/>,
    column: hypertext
    }
];

export const NODES = [
    { from: 'wark',
    to: 'malloy',
    fromAnchor: 'center right',
    toAnchor: 'center left' }
]

//<img src={ac} alt='animal crossing' className='syllabus__img'/>
//<img src={bob} alt='microsoft bob' className='syllabus__img'/>

/*
export const THEMES = [
    {theme: <span> alternate computing <b>metaphor</b>s</span>, color: '#EA9144'},
    {theme: <span> <b>domestic</b> knowledge organization</span>, color: '#4EAAC6'},
    {theme: <span> <b>epistolary</b> correspondence</span>, color: '#FFE073'},
    {theme: <span>and <b>hypertext</b></span>, color: '#D7F08E'}
];
 */

 //<img src={hypertext} alt='forward anywhere floppy disk' className='syllabus__img'/>
 //            <img src={clubPenguin} alt='club penguin' className="reference__img"/>

 //import bob from '../assets/pics/bob-screenshot.png';
//import ac from '../assets/pics/ac-screenshot.png';
//import hypertext from '../assets/pics/hypertext-screenshot.png';
//import clubPenguin from '../assets/pics/club-penguin-big.png';