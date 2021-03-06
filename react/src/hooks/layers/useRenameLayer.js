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
const { user, groups, setGroups } = useContext(UserContext); 
const house = user.house._id;

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

    const handleBlur = async (e) => {
        const name = e.target.name;
        await blur(name, pushUser); 
    };

    const pushUser = (slug) => {
        history.push(`/${slug}`, {from: slug});
    };

    const blur = async (name, callback) => {
        setEditInline(false);
        const label = values.name; 
        const description = values.description;
        const slug = slugify(values.name);

        //create new room obj 
        let updatedLayer;

        groups.forEach(group => {
            group.layers.forEach(layer => { if(layer.id === id) { updatedLayer = layer; } 
              });
          });

        updatedLayer = { label, slug, description, id: updatedLayer.id };

        //replace renamed layer in groups array
          let targetGroup;
          let groupCopy = [...groups];
        
          groups.forEach(group => {
            group.layers.forEach(layer => { 
                if(layer.id === id) { targetGroup = group; } 
              });
          });

          const newGroupLayers = targetGroup.layers.map(layer => {
              if(layer.id === id) {
                  return updatedLayer;
              } return layer; 
          })
          const newGroupArray = groupCopy.map(el => {
              if(el.id === targetGroup.id) {
                  return { ...el,
                      layers: newGroupLayers }
              } return el;
          });
        
        await axios.put(`/houses/${house}`, {
          groups: newGroupArray   
        }).then(res => {
            setGroups(newGroupArray);
            if(name === 'name') {
                return callback(slug);
            } return;
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

/*
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
            //console.log(res);
            setRooms(newRooms);
        })
        .catch(err => console.log(err));
    };


    //replace renamed layer in layer array 
        const newLayerArray = rooms.map(el => {
            if(el.id === id) {
                return updatedLayer;
            } else {
                return el;
            }
        });


*/