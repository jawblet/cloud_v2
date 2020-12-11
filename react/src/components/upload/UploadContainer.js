import React, { useState, useRef } from 'react'; 
import { Link } from 'react-router-dom';
import Button from '../btns/Button'
import ButtonBar from '../btns/ButtonBar';
import Tooltip from '../../atoms/Tooltip';
import useTooltip from './../../hooks/useTooltip';
import LinkUpload from './LinkUpload';
import NoteUpload from './NoteUpload';
import DragUpload from './DragUpload';
import Search from '../Search'; 
import TagBank from '../../sections/TagBank'; 
import { VscClose } from 'react-icons/vsc';
import AutoComplete from '../../atoms/AutoComplete';
import RecentTags from '../../atoms/RecentTags';
import Prompt from '../../atoms/Prompt'; 
import Error from '../../atoms/Error';
import CommentInput from '../../components/CommentInput'; 
import useTags from '../../hooks/useTags';
import { CSSTransition } from 'react-transition-group';
import { VscLink, VscSymbolParameter, VscArchive } from 'react-icons/vsc';

export default function UploadContainer(props) { 
    const nodeRef = useRef(null); 
    const { type, room, switchType, values, error } = props;
    const [comments, setComments] = useState(false);
    const { textRef, tooltip, tooltipCoords, getTooltip, hideTooltip } = useTooltip();

    const buttons = [
        {name: 'link', icon: <VscLink className="icon icon__btn"/>}, 
        {name: 'note', icon: <VscSymbolParameter className="icon icon__btn"/>},
        {name: 'file', icon: <VscArchive className="icon icon__btn"/>}
    ];

    const { lastThreeTags } = useTags();

    const openAutoComplete = ((props.results.length !== 0) && (props.values.input !== ''));

    return (  
        <div className="upload__container">  
            <div className="upload__controller">
                <ButtonBar buttons={buttons} ref={textRef} handleClick={switchType} type={type}
                        direction="column" getTooltip={getTooltip} hideTooltip={hideTooltip}/>
                        {tooltip && <Tooltip tooltip={tooltip} tooltipCoords={tooltipCoords}/>}
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
                <div className="upload">
                    { type === 'link' && <LinkUpload {...props} /> }
                    { type === 'note' && <NoteUpload {...props} /> }
                    { type === 'file' && <DragUpload /> }
                </div>
                    <div className="upload__extra"> 
                        <div className="upload__label"> <h4>Label</h4> </div> 
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
                                    <AutoComplete results={props.results} selectTag={props.selectTag}/>                       
                                    }
                            <TagBank tags={values.tags} 
                                    handleDelete={props.removeTag}/> 
                            <div style={{alignSelf:'flex-start'}}>
                                <RecentTags tags={lastThreeTags} selectTag={props.selectTag}/>
                            </div>
                        </div>                    
                    </div>
                    <div className="upload__extra"> 
                        <div className="upload__label active" onClick={() => setComments(!comments)}> 
                            <h4>Say more</h4>
                        </div>
                        <CommentInput show={comments} value={values.comment} handleChange={props.handleChange}  />
                    </div> 
                </div>
        </div> 
    )
}

