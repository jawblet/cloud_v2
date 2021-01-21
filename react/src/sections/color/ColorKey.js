import React from 'react';
import { COLOR_KEY } from './key';
import ColorSwatch from './ColorSwatch';
import ColorKeyHeader from './ColorKeyHeader';

const ColorKey = (props) => {
    return (
        <>
         <h3 className="key__title">
            Map color key
        </h3>
        <table className="key">
           <ColorKeyHeader/>
                <tbody className="fullWidth">
                {COLOR_KEY.map(el => {
                    return <tr key={el.zone} className="key__row">
                                <ColorSwatch el={el} {...props}/>
                                <td className="key__cell" 
                                    style={{fontWeight:'bold'}}> 
                                    {el.label} 
                                </td>
                                <td className="key__cell"> 
                                    {el.description} 
                                </td> 
                                <td className="key__cell colorKey__layers">
                                    {el.layers.map(color => {
                                        return <div className="colorKey__ex" 
                                            key={color}
                                            style={{backgroundColor:color}}
                                        >
                                    </div> })
                                }
                            </td>
                        </tr>
                    })}
                </tbody>
        </table>
        </>
    );
}
 
export default ColorKey;