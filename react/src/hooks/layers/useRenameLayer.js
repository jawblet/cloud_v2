import { useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import slugify from 'react-slugify';
import { UserContext } from '../UserContext';

export default function useRenameLayer(props) { 
const { label, id, description } = props.page;

const initValues = { name: label, 
                    description: description }

let history = useHistory();
const { user, setRooms } = useContext(UserContext); 
const house = user.house._id;
const rooms = user.house.rooms; // ??? bitch tf? 

//handle rename rooms
    const [editInline, setEditInline] = useState(false); 
    const [values, setValue] = useState(initValues || {});
    const [size, setSize] = useState(label.length + 1);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValue({...values,
            [name]: value});
        if (name === 'name') {
            setSize(value.length + 1);
        }
    };

    const handleClickIn = () => {
        setEditInline(true);
    };

    const handleBlur = (e) => {
        const name = e.target.name;
        switch(name) {
            case "name": blurName();
            break;
            case "description": blurDescription();
            break;
            default: return; 
        }
    };

    //validate to make sure room doesn't exist 
    const blurName= async () => {
        setEditInline(false);
        const label = values.name; 
        const slug = slugify(values.name);
        const newRooms = rooms.map(el => {
            if(el.id === id) {
                return { label, slug, 
                        id: el.id, 
                        description: el.description }
            } else {
                return el;
            }
        })        
        await axios.put(`/houses/${house}`, {
          rooms: newRooms   
        }).then(res => {
            setRooms(newRooms);
            history.push(`/${slug}`);
        })
        .catch(err => console.log(err));
    };

    const blurDescription = async () => {
        setEditInline(false);
        const description = values.description; 
        const newRooms = rooms.map(el => {
            if(el.id === id) {
                return { label: el.label, 
                        slug: el.slug, 
                        id: el.id, 
                        description: description }
            } 
                return el;
        })        
        await axios.put(`/houses/${house}`, {
          rooms: newRooms   
        }).then(res => {
            console.log(res);
            setRooms(newRooms);
        })
        .catch(err => console.log(err));
    };

    return {
        editInline,
        values,
        size,
        handleClickIn,
        handleBlur,
        handleChange
    }
}