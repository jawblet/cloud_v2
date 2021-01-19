import React from 'react';
import { SYMBOL_KEY } from './key';

const SymbolKey = () => {
    return (
        <div className="key symbolKey">
            <h3 className="key__title">
                Symbols and signs
            </h3>
                {SYMBOL_KEY.map((el, i) => {
                   return <div key={i} className="key__row">
                        {el.symbol} 
                        {el.label}
                    </div>
                })}
        </div>
    );
}
 
export default SymbolKey;