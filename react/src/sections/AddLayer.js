import React from 'react'; 
import FormInput from '../components/FormInput';
import Error from '../atoms/Error';
import Notification from '../atoms/Notification';
import CTA from '../components/btns/CTA';
import { VscAdd, VscArrowSmallLeft } from 'react-icons/vsc';
import useAddLayer from '../hooks/layers/useAddLayer';

export default function AddLayer(props) {
    const { setAdd } = props; 

    const { handleAddRoom, 
            roomInput, 
            handleChange,
            error,
            success } = useAddLayer();
            
    return (
        <div className="page" onSubmit={handleAddRoom} style={{marginTop:'10rem'}}>
        <form style={{width:'75%'}}>
            <div className="addLayer" onClick={() => setAdd(true)}>
                <VscArrowSmallLeft className="icon icon__btn icon--active"/> 
                <h5 className="light">Back to post</h5> 
            </div>
            <div className="inlineForm__notif">
                {error && <Error error={error.messages}/>}
                {success && <Notification notif={success}/>}
            </div>
            <div className="upload__extra">
                <h4 className="upload__label">Add layer</h4>
                <FormInput type={"text"} placeholder={"Layer name"} name={"room"} 
                            value={roomInput} 
                            handleChange={handleChange} 
                            /> 
            </div>
            <div className="inlineForm__submit" style={{justifyContent:'flex-end'}}>  
                <CTA name={<VscAdd/>} type={"submit"}/> 
            </div>
        </form>
    </div>
    )
}
 