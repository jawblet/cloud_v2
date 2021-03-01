import React, { useState, useRef } from 'react'; 
import { Link } from 'react-router-dom';
import LinkUpload from './LinkUpload';
import NoteUpload from './NoteUpload';
import DragUpload from './DragUpload';
import Search from '../Search'; 
import TagBank from '../../sections/TagBank'; 
import CommentInput from '../../components/CommentInput'; 
import Tooltip from '../../atoms/Tooltip';
import AutoComplete from '../../atoms/AutoComplete';
import RecentTags from '../../atoms/RecentTags';
import Prompt from '../../atoms/Prompt'; 
import Error from '../../atoms/Error';
import Button from '../btns/Button';
import TooltipBar from '../btns/TooltipBar';
import useTags from '../../hooks/paths/useTags';
import { uploadBtns, NOTE_TOOLTIP } from '../../data/buttons';
import { VscClose, VscQuestion } from 'react-icons/vsc'; 
import { CSSTransition } from 'react-transition-group';

export default function UploadContainer(props) { 
    const nodeRef = useRef(null); 
    const { type, room, switchType, values, error } = props;
    const [comments, setComments] = useState(false);
    const [tooltip, setTooltip] = useState(false);

    const { lastThreeTags } = useTags(); 
    
    const openAutoComplete = ((props.results.length !== 0) && (props.values.input !== ''));

    return (   
        <div className="upload__container">  
            <div className="upload__controller">
            <TooltipBar handleClick={switchType} type={type}
                        buttons={uploadBtns}
                        direction="column"/>
                <Link to={`/home/${room}`}>
                    <Button icon={<VscClose className="icon icon__btn icon--warning"/>}/>
                </Link> 
            </div>
            <div className="upload__form">
                <CSSTransition in={values.error} timeout={350} nodeRef={nodeRef} classNames="fade" unmountOnExit>
                    <div className="upload__error__msg" ref={nodeRef}> <Prompt type="warning" prompt={values.error}/>
                </div>
                </CSSTransition>
                <CSSTransition in={error} timeout={350} nodeRef={nodeRef} classNames="fade" unmountOnExit>
                    <div className="upload__error__notif" ref={nodeRef}> 
                        <Error error={error}/>
                </div>
                </CSSTransition>
                        { type === 'link' && <LinkUpload {...props} /> }
                        { type === 'note' && <NoteUpload ref={props.editRef} {...props} /> }
                        { type === 'file' && <DragUpload /> }
                    <div className="upload__extra" style={{flexDirection:'column'}}> 
                        {(type === 'link' || type === 'file') && <>
                        <div className="upload__label"> 
                            <h4>Add path</h4> 
                        </div> 
                        <div className="addTags">
                          <Search values={values}
                                    results={props.results} 
                                    ref={props.searchRef} 
                                    selectTag={props.selectTag}
                                    handleChange={props.handleChange} 
                                    addTags={props.addTags} 
                                    clearInput={props.clearInput}
                                    handleKeyDown={props.handleKeyDown} 
                                   /> 
                            {openAutoComplete &&
                                    <AutoComplete results={props.results} 
                                                selectTag={props.selectTag}/>}
                            <TagBank tags={values.tags} 
                                    handleDelete={props.removeTag}/> 
                            </div> </>}
                            {(type === 'note') && 
                            <div className="tooltipAnchor flex alignCenter">
                                <VscQuestion className="icon icon__btn"
                                    onMouseEnter={() => setTooltip(true)}
                                    onMouseLeave={() => setTooltip(false)}/>
                                <h5 className="lightest"> &nbsp; Add path </h5> 
                               <Tooltip show={tooltip} text={<NOTE_TOOLTIP/>} direction="left" style="black"/>
                            </div>
                                }     
                            <RecentTags tags={lastThreeTags} selectTag={props.selectTag}/>                 
                    </div>
                    <div className="upload__extra"> 
                        <div className="upload__label active" onClick={() => setComments(!comments)}> 
                            <h4>Comment</h4>
                        </div>
                        <CommentInput show={comments} value={values.comment} handleChange={props.handleChange}  />
                    </div> 
                </div>
        </div> 
    )
}

