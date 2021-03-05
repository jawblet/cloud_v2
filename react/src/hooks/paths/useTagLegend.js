import { useState, useContext, useRef } from 'react'; 
import axios from 'axios';
import { convertFromRaw } from 'draft-js';
import { UserContext } from '../UserContext';

export default function useOneTag() {
    const { user } = useContext(UserContext);
    const tagRef = useRef(null);

// GET TAG LEGEND FIRST
   const [loadModal, setLoadModal] = useState(true);
   const [postExcerpts, setExcerpts] = useState([]);
    const [tagDetails, setTagDetails] = useState({
        tag: '',  
        date: '',
        tagCount: '',
        postCount: ''
    });

    const getTagDetails = async (id) => {
        await axios.get(`/posts/details/${user.house._id}/${id}`) 
            .then(res => {
                const { tag, posts, postCount, tagCount } = res.data.data;
                let date = new Date(tag[0].createdOn);
                date = date.toDateString('en', { day: "numeric", month: "short", year: "numeric" });
                setTagDetails({
                    tag: tag[0],
                    date,
                    tagCount,
                    postCount
                });
                //find excerpts to display on tag legend 
                const notes = posts.filter(el => el.type === 'note'); 
                const excerpts = notes.map(note => { 
                    const name = tag[0].tag; // tag
                    const contentState = convertFromRaw(JSON.parse(note.content)); // parse draft-js
                    //regex: extract sentence with tag in note 
                    const TAG_REGEX = new RegExp(`[^.!?;]*(${name})[^.?!;]*[.?!;]`, "i"); 
                    const text = contentState.getPlainText(); //get 
                    let matchArr;

                    while ((matchArr = TAG_REGEX.exec(text)) !== null) {
                        return matchArr[0];
                        } 
                    return null; 
                });
                setExcerpts(excerpts);
                setLoadModal(false);

        }).catch(err => console.log(err));
    }

// CALCULATE TAG PATH SECOND
const [tagpath, setTagpath] = useState(null); 
const [coords, setCoords] = useState({
        lengthX: '',
        heightY: '',
        postId: ''
    })

const calculateTagPath = (e, i, tagId) => {
    //calculate tag path length AFTER tagRef has returned
    const tagEnd = e.currentTarget.getBoundingClientRect().right;
    const roomEnd = (tagRef.current.getBoundingClientRect().left + tagRef.current.getBoundingClientRect().right) / 2;
    const x = (roomEnd - tagEnd);
        
    //calculate tag path height  
    const roomTop = tagRef.current.getBoundingClientRect().top;
    const tagMid = (e.currentTarget.getBoundingClientRect().top + e.currentTarget.getBoundingClientRect().bottom) / 2; 
    const y = tagMid - roomTop; 
    setCoords({lengthX: x,
            heightY: y,
            postId: i }); 

    setTagpath(tagId);
    }

//handle hover on tag 
    const handleHover = (e) => {
        const tagId = e.currentTarget.dataset.id;
        const postId = e.currentTarget.dataset.index;
        getTagDetails(tagId);
        calculateTagPath(e, postId, tagId);
    }

//handle mouse leave/scroll 
    const handleStopHover = () => {
        setLoadModal(true);
        setTagpath(null);
    }

    return {
        tagRef,
        handleHover,
        handleStopHover,
        tagDetails,
        postExcerpts,
        loadModal,
        tagpath,
        setTagpath,
        coords
    }
}
