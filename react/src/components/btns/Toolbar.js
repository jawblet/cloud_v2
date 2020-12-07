import React from 'react';
import Button from './Button';
import { VscBold, VscItalic, VscCode, VscQuote, VscSymbolNamespace, VscListUnordered, VscListOrdered } from 'react-icons/vsc';
import SelectMenu from '../SelectMenu';

export default function Toolbar(props) {
  
//define inline styles 
  const INLINE_STYLES = [
    {label: 'bold', style: 'BOLD', icon: <VscBold className="icon icon__btn"/>},
    {label: 'italic', style: 'ITALIC', icon: <VscItalic className="icon icon__btn"/>},
    {label: 'monospace', style: 'CODE', icon: <VscCode className="icon icon__btn"/>},
  ];

  const currentInlineStyle = props.editorState.getCurrentInlineStyle();
  //define block styles 
    //headings
    const HEADINGS = [   
        {label: 'Paragraph', id: 'paragraph'},
        {label: 'H1', id: 'header-one'},
        {label: 'H2', id: 'header-two'},
        {label: 'H3', id: 'header-three'},
        {label: 'H4', id: 'header-four'},
        {label: 'H5', id: 'header-five'},
        {label: 'H6', id: 'header-six'}
    ];

  const BLOCK_TYPES = [
    {label: 'Blockquote', style: 'blockquote', icon: <VscQuote className="icon icon__btn"/> },
    {label: 'UL', style: 'unordered-list-item', icon: <VscListUnordered className="icon icon__btn"/>},
    {label: 'OL', style: 'ordered-list-item', icon: <VscListOrdered className="icon icon__btn"/>},
    {label: 'Code Block', style: 'code-block', icon: <VscSymbolNamespace className="icon icon__btn"/>},
  ];
 
  const selection = props.editorState.getSelection();
  const blockType = props.editorState.getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
 
    return (
        <div className="toolbar">
            {INLINE_STYLES.map((type) => {
                return (
                <Button key={type.label}  
                        icon={type.icon}
                        active={currentInlineStyle.has(type.style)}
                        dataId={type.style}
                        handleClick={props.onToggleInline}
                        />
                    )   
                })}
            {BLOCK_TYPES.map((type) => {
                return (
                    <Button key={type.label}
                            icon={type.icon}
                            active={type.style === blockType}
                            dataId={type.style}
                            handleClick={props.toggleBlockType}
                            />
                    )
                })}
               <SelectMenu items={HEADINGS} active={(blockType.substring(0,6) === 'header') ? blockType : 'paragraph'} 
               selectItem={props.toggleBlockType}/> 
        </div>
    )
}