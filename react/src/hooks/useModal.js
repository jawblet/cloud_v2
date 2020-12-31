import React, { useState } from 'react'; 

export default function useModal() {
    const [modal, setModal] = useState(false);
    const modalRef = React.createRef(); 

    const toggleModal = () => {
        setModal(!modal);
    }

    const handleOutsideClick = (e) => {
        //if modalRef is rendered + modalRef does not contain the clicked class
        if(modalRef.current && !modalRef.current.contains(e.target)) {
            setModal(false);
        }
    }

    return {
        toggleModal,
        handleOutsideClick,
        modal,
        modalRef
    }
}