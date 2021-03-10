import React, { useContext } from 'react';
import { SYMBOL_KEY } from './key';
import { COLOR_OBJECTS } from '../../data/colors';
import { UserContext } from '../../hooks/UserContext';
import { LayerIcon } from '../../svg/LayerIcons';

const SymbolKey = () => {
    const { groups } = useContext(UserContext); 

    const rooms = groups.map(el => {
        return el.layers;
    });

    return ( 
        <>
        <div className="key symbolKey">
            <h3 className="houseTitle key__title"> 
                Rooms and signs 
            </h3>
                {SYMBOL_KEY.map((el, i) => {
                   return <div key={i} className="key__row">
                        {el.symbol} 
                        {el.label}
                    </div>
                })}
                {rooms.flat().map(el => {
                    return <div key={el.slug} className="key__row">
                        <LayerIcon l="1.5rem" id={`L${el.id}`}/>
                        {el.label}
                    </div>
                })}
        </div>
            <div className="key symbolKey">
                <h3 className="houseTitle key__title"> 
                    All path colors
                </h3>
                {COLOR_OBJECTS.map((obj) => {
                   return Object.entries(obj)
                            .map(([key, values]) => {
                        return <div key={key} className="key__row">
                            {key}
                            {values.map(el => {
                                return(
                                    <div key={el} className="key__color"
                                        style={{backgroundColor:el}}>
                                    </div>
                            )
                        })}
                    </div>
                    })
                })}
        </div>
        </>
    );
}

export default SymbolKey;

