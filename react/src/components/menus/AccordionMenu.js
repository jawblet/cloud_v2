import React from 'react';

const AccordionMenu = (props) => {
    const tools = ['spackle', 'sandpaper', 'screwdriver'];

    return ( 
    <div className="accordion">
        <div className="accordion__panel">
            <input type="checkbox" className="accordion__panel__input" id="panel"/>
            <label className="accordion__panel__label" htmlFor="panel">
                <h4>group 1</h4>
            </label>
            <div className="accordion__list">
                <menu>
                    {tools.map(el => {
                    return( <li className="accordion__item">{el}</li>
                            )
                        })}
                </menu>
            </div>
        </div>
    </div>
    );
}
 
export default AccordionMenu;