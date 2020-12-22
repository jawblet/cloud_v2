import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import slugify from 'react-slugify';
import { UserContext } from './UserContext';

export default function useRenameRoom(name, id) {
let history = useHistory();
const { user, setRooms } = useContext(UserContext);
const house = user.house._id;
const rooms = user.house.rooms;

//handle rename rooms
    const style = { 
        textStyle: {
            fontFamily: 'Work Sans, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 300,
            letterSpacing: '0.5px'
    }
}
    const [editInline, setEditInline] = useState(false); 
    const [editValue, setEditValue] = useState(name);
    const [size, setSize] = useState(name.length + 1);

    const handleChange = (e) => {
        console.log(e.target.value);
        setEditValue(e.target.value);
        setSize(e.target.value.length + 1);
    }

    const handleClickIn = () => {
        setEditInline(true);
    }

    const handleClickOut = async () => {
        setEditInline(false);
        const label = editValue; 
        const slug = slugify(editValue);
        const newRooms = rooms.map(el => {
            if(el.id === id) {
                return {label, slug, id: el.id}
            } else {
                return el;
            }
        })        
        await axios.put(`/houses/${house}`, {
          rooms: newRooms   
        }).then(res => {
            setRooms(newRooms);
            history.push(`/home/${slug}`);
        })
        .catch(err => console.log(err));
    }

//handle create rooms
    const addRoom = (e) => {
        e.preventDefault();
        const val = e.currentTarget.value;
        console.log(val);
    }

    return {
        style,
        editInline,
        editValue,
        size,
        handleClickIn,
        handleClickOut,
        handleChange,
        addRoom
    }
}