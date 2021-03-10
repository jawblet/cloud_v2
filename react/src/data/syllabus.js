import bob from '../assets/pics/bob-screenshot.png';
import ac from '../assets/pics/ac-screenshot.png';
import hypertext from '../assets/pics/hypertext-screenshot.png';
import { LayerIcon } from '../svg/LayerIcons';

const l = '1.5rem';
const fill = '#312F2C'


const HyperTextDropdown = () => {
    return (
        <div className="syllabus__dropdown">
            <div className="syllabus__dropdown__item">
             ① This 
                <a href="https://www.wired.com/1995/06/xanadu/" target="_blank" className="styledLink"> 
                &nbsp;Wired article (1995)&nbsp;
                </a> 
                about Ted Nelson's Xanadu project.
            </div>

            <div className="syllabus__dropdown__item">
             ② A long digression looking at 
                <a href="https://roamresearch.com/" target="_blank" className="styledLink">
                   &nbsp;Roam Research&nbsp;
                </a>
                as a modern hypertext-type project.
                <blockquote>
                <code className="bold">jb, 1.25.21:&nbsp;</code>
                <code>
                Then I started looking at this platform called Roam Research, which is more similar to our structure. 
                They have no folders (!) and all the pages are connected by internal links. It's very hypertextual. 
                </code>
                </blockquote>
               
            </div>

            <div className="syllabus__dropdown__item"> 
            ③ This
            <a href="https://www.are.na/blog/women-in-hypertext" target="_blank" className="styledLink"> 
               &nbsp;are.na blog post (2018)&nbsp;
            </a>
                about Judy Malloy and Cathy Marshall's <em>Forward Anywhere</em> &nbsp; <img src={hypertext} alt='forward anywhere floppy disk' className='syllabus__img'/>
                <blockquote>
                    "Cathy showed Judy VIKI, a spatial hypertext system she was building that allowed for soft, implicit associations between ideas. 
                    Judy commented on the system’s colors, then hurried to the next stop of her tour, dripping pea juice and blood."
                </blockquote>
            </div>
        </div>
    )
}


export const SYLLABUS_HEADERS = [
    {title: 'Memory palaces & spatial software',
    icon:  <img src={ac} alt='animal crossing' className='syllabus__img'/>,
    dropdown: '' 
},
    {title:' Pamphilia & personal narrative',
    icon:  <LayerIcon id='L3' l={l} fill={fill}/>,
    dropdown: '' 
},
    {title: 'Microsoft Bob & the desktop metaphor',
    icon: <img src={bob} alt='microsoft bob' className='syllabus__img'/>,
    dropdown: ''
},
    {title:`I'm very into you & wayfinding`,
    icon:  <LayerIcon id='L1' l={l} fill={fill}/>,
    dropdown: ''
 },
    {title: 'Xanadu & hypertext',
    icon:<LayerIcon id='L4' l={l} fill={fill}/> ,
    dropdown: <HyperTextDropdown/>
}
];
