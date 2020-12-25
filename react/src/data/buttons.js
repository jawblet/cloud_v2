import { VscAdd, VscSave, VscMilestone, 
        VscLink, VscSymbolParameter, VscArchive,
        VscBold, VscItalic, VscCode, VscQuote, 
        VscSymbolNamespace, VscListUnordered, VscListOrdered } from 'react-icons/vsc';

export const navButtons = [
    {id: 0, name: 'paths', url: 'paths', icon: <VscMilestone className="icon icon__btn" data-id="paths"/>}, 
    {id: 1, name: 'library', url: 'library', icon: <VscSave className="icon icon__btn" data-id="library"/>},
    {id: 2, name: 'add', url: 'add', icon: <VscAdd className="icon icon__btn" data-id="add"/>},
];

export const uploadBtns = [
    {id: 0, name: 'link', icon: <VscLink className="icon icon__btn"/>}, 
    {id: 1, name: 'note', icon: <VscSymbolParameter className="icon icon__btn"/>},
    {id: 2, name: 'file', icon: <VscArchive className="icon icon__btn"/>}
];

export const HEADINGS = [   
    {label: 'Paragraph', id: 'paragraph'},
    {label: 'H1', id: 'header-one'},
    {label: 'H2', id: 'header-two'},
    {label: 'H3', id: 'header-three'}, 
    {label: 'H4', id: 'header-four'},
    {label: 'H5', id: 'header-five'},
    {label: 'H6', id: 'header-six'}
];

export const INLINE_STYLES = [
    {label: 'bold', style: 'BOLD', icon: <VscBold className="icon icon__btn"/>},
    {label: 'italic', style: 'ITALIC', icon: <VscItalic className="icon icon__btn"/>},
    {label: 'monospace', style: 'CODE', icon: <VscCode className="icon icon__btn"/>},
  ];

export const ADD_PATH = [
    { id: 0, name: 'Add path', icon: <VscMilestone className="icon icon__btn"/> }
];

export const BLOCK_TYPES = [
    {label: 'Blockquote', style: 'blockquote', icon: <VscQuote className="icon icon__btn"/> },
    {label: 'UL', style: 'unordered-list-item', icon: <VscListUnordered className="icon icon__btn"/>},
    {label: 'OL', style: 'ordered-list-item', icon: <VscListOrdered className="icon icon__btn"/>},
    {label: 'Code Block', style: 'code-block', icon: <VscSymbolNamespace className="icon icon__btn"/>},
  ];

export const NOTE_TOOLTIP = () => {
  return (
   <div>
       <h5> Highlight the path text and click the 
           <span className="highlight"> add path </span>  
           button in the toolbar: </h5>
       <div style={{paddingTop:'1rem', textAlign:'center'}}>
            <VscMilestone className="icon icon__btn"/>
        </div>
   </div>
  )}
;