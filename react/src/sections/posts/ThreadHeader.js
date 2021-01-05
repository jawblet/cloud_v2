import { Link } from 'react-router-dom';
import CTA from '../../components/btns/CTA';
import InlineButton from '../../components/btns/InlineButton';
import { VscArrowSmallLeft } from 'react-icons/vsc';


const ThreadHeader = ({ setEditor, showEdit }) => {
    return (
        <div className="thread__header"> 
        <Link to="/house" className="thread__header__L">
            <VscArrowSmallLeft className="icon icon__btn"/>
            <InlineButton name="threads"/>
        </Link>
        <div className="thread__header__R">
            <Link to="/house#new">  
                <InlineButton name="new thread"/>
            </Link>
            <CTA name={showEdit ? "close" : "reply"} handleClick={() => setEditor(!showEdit)}/> 
        </div>
    </div>
    );
}
 
export default ThreadHeader;