import React from 'react';

const AccordionMenu = (props) => {
    const { items } = props; 

    return ( 
        <div className="accordion">
        {items && Object.entries(items).map(([key, values], col) => {
            return ( 
            <div className="accordion__panel" key={key}>
                <input type="checkbox" className="accordion__panel__input" id={`panel-${key}`} defaultChecked/>
                <label className="accordion__panel__label" htmlFor={`panel-${key}`}>
                    <h4> {values.group} </h4> 
                </label>
                <div className="accordion__list">
                    <menu>
                        {values.layers.map((el, i) => {
                            return( <li key={el.id} 
                                    className={'accordion__item'}>
                                    {el.label}
                                </li> )
                            })}
                        </menu>
                </div>
            </div> );
        })}
    </div>
    )
} 
 
export default AccordionMenu;