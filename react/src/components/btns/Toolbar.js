import React from 'react';
import Button from './Button';
import SelectMenu from '../menus/SelectMenu'; 
import { HEADINGS, INLINE_STYLES, BLOCK_TYPES, ADD_PATH } from '../../data/buttons';
import TooltipBar  from './TooltipBar';

export default function Toolbar(props) {
  const currentInlineStyle = props.editorState.getCurrentInlineStyle();
 
  const selection = props.editorState.getSelection();
  const blockType = props.editorState.getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const setBlockType = (e) => {
      e.preventDefault()
      props.toggleBlockType(e);
  }

 
    return (
        <div className="toolbar">
            {INLINE_STYLES.map((type) => {
                return (
                  //this keeps the focus w/n the editor on inline style change
                  <div data-id={type.style} key={type.style}
                        onMouseDown={(e) => { 
                            e.preventDefault();
                            props.onToggleInline(e);
                          }}>
                <Button key={type.label}  
                        icon={type.icon}
                        active={currentInlineStyle.has(type.style)}
                        dataId={type.style}
                        />
                    </div>
                    )   
                })}
            {BLOCK_TYPES.map((type) => {
                return (
                  <div data-id={type.style} key={type.style}
                          onMouseDown={setBlockType}>
                    <Button icon={type.icon}
                            active={type.style === blockType}
                            dataId={type.style}
                            />
                    </div> 
                    )
                })}
               <SelectMenu 
                  items={HEADINGS} 
                  active={(blockType.substring(0,6) === 'header') ? blockType : 'paragraph'} 
                  selectItem={setBlockType}/> 

                {props.addTag && 
                    <div onMouseDown={(e) => { 
                        e.preventDefault();
                        props.addTagFromNote(e);
                      }}>
                          <TooltipBar 
                            handleClick={props.addTagFromNote}
                            buttons={ADD_PATH} 
                            direction="solo"/> 
                      </div>
              }
        </div>
    )
}

