import React from 'react';
import { TooltipBtn } from './TooltipBtn';
import useToolTipButtons from '../../hooks/useToolTipButtons';

export default function TooltipBar(props) { 
    const { buttons, direction } = props;
    const { tooltips, getTooltip, hideTooltip } = useToolTipButtons(buttons);

    return(
        <menu className={`btnbarWrapper ${direction}`}>
            {buttons.map(btn => {
                return(
                    <TooltipBtn key={btn.id}
                                button={btn} 
                                tooltips={tooltips}
                                getTooltip={getTooltip}
                                hideTooltip={hideTooltip}
                                handleClick={props.handleClick}
                                {...props}/>
                )
            })}
        </menu>
    )
}