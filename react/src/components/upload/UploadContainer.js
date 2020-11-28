import React, { useState } from 'react'; 
import ButtonBar from '../ButtonBar';
import Tooltip from '../../atoms/Tooltip';
import useTooltip from './../../hooks/useTooltip';
import AddTags from './../../sections/AddTags'; 
import InlineButton from './../InlineButton'; 
import LinkUpload from './LinkUpload';
import NoteUpload from './NoteUpload';
import DragUpload from './DragUpload';
import Search from '../Search'; 
import TagBank from '../../sections/TagBank';

export default function UploadContainer(props) { 
    const { type, buttons, switchType } = props;
    const [tagInput, setTagInput] = useState(false);
    const [comments, setComments] = useState(false);
    const { textRef, tooltip, tooltipCoords, getTooltip, hideTooltip } = useTooltip();

    return (  
        <div className="upload__container">  
            <div className="upload__controller">
            <ButtonBar buttons={buttons} ref={textRef} switchType={switchType} type={type}
                        direction="column" getTooltip={getTooltip} hideTooltip={hideTooltip}/>
                    {tooltip && <Tooltip tooltip={tooltip} tooltipCoords={tooltipCoords}/>}
            </div>
            <div className="upload__form">
                <div className="upload">
                    { type === 'link' && <LinkUpload {...props} /> }
                    { type === 'note' && <NoteUpload/> }
                    { type === 'file' && <DragUpload/> }
                </div>
                <div className="upload__extras">
                    <div className="upload__tags">
                        <div className="upload__label">
                           <h4>Label</h4>
                        </div> 
                        <div className="addTags">
                            <Search values={props.values} results={props.results} ref={props.searchRef} selectTag={props.selectTag}
                                    handleChange={props.handleChange} addTags={props.addTags} clearInput={props.clearInput}/>
                            
                            <TagBank tags={props.values.tags} handleDelete={props.removeTag}/> 
                        </div>                    
            </div>
                    <div className="upload__label"> 
                            <h4>Say more</h4>
                    </div>
                </div>
            </div>
        </div> 
    )
}
