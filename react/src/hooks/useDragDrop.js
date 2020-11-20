import { useReducer } from 'react'

export default function useDragDrop() {
    const state = {
        inDropZone: false,
        uploadComplete: false,
        file: '',
        message: '',
      };

      const reducer = (state, action) => {
        switch (action.type) {
          case "AddToDropZone":
            return { ...state, inDropZone: action.inDropZone };
          case "AddFile":
            return { ...state, file: action.upload };
          case "AddMessage":
            return { ...state, message: action.msg };
          default:
            return state;
        }
      };

    const [data, dispatch] = useReducer(reducer, state);

    //support img, gif, and pdf upload
    const supportedTypes = ['image/jpg', 'image/png', 'image/svg+xml', 'image/gif', 'application/pdf'];

    const handleDragEnter = (event) => {
        event.preventDefault();
        dispatch({ type: "AddToDropZone", inDropZone: true });
      };
  
    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        dispatch({ type: "AddToDropZone", inDropZone: true });
      };
  
    const handleDragLeave = (event) => {
          event.preventDefault();
          dispatch({ type: "AddToDropZone", inDropZone: false });
        };

    const handleDrop = (event) => {
            event.preventDefault();
            const upload = [...event.dataTransfer.files];
            const type = upload[0].type;

            //check if upload exists, and if its type is supported
            if(upload) {
                let msg;
                if(supportedTypes.includes(type))  {
                    msg = upload[0].name;
                    console.log(msg);
                    dispatch({ type: "AddFile", upload });
                  } else {
                      msg = `Only images and PDFs are supported.`;
                  }
                  dispatch({ type: "AddToDropZone", inDropZone: false });
                  dispatch({ type: "AddMessage", msg });  
            }
        };

    return {
        handleDragEnter, handleDragLeave, handleDragOver, handleDrop,
        data, dispatch

    }
}