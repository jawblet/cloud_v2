import React, { useState } from 'react';
import ButtonBar from '../ButtonBar';
import Tooltip from '../Tooltip';
import useTooltip from './../../hooks/useTooltip';
import AddTags from './../../sections/AddTags';
import InlineButton from './../InlineButton'; 
import LinkUpload from './LinkUpload';
import NoteUpload from './NoteUpload';
import DragUpload from './DragUpload';

export default function UploadContainer(props) { 
    const { type, buttons, switchType } = props;
    const [tags, setTags] = useState(false);
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
                    <div className="flex">
                        <div className="upload__label" style={{marginTop:'-1rem'}}>
                            <InlineButton name={"add tags"} handleClick={() => setTags(!tags)}/>
                        </div> 
                        <AddTags tags={tags}/>
                    </div>
                    <div className="upload__label" style={{marginTop:'-1.5rem'}}> 
                        <InlineButton name={"say more"}/> 
                    </div>
                </div>
            </div>
        </div> 
    )
}
