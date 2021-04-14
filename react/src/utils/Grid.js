import React from 'react';

const Grid = (props) => { 
    //initialize grid  
    const getGrid = (props) => { 
        const {
            columns,
            rows,
            autoColumns,
            autoRows,
            gap,
            justify, 
            align,
            width,
            inline,
        } = props;
    
        return {
            display: inline ? "inline-grid" : "grid",
            gap: `${gap}rem` || "0",
            gridTemplateColumns: columns || "none",
            gridTemplateRows: rows || "none",
            gridAutoColumns: autoColumns || "auto",
            gridAutoRows: autoRows || "auto", 
            justifyItems: justify || "stretch",
            alignItems: align || "stretch",
            width: width || "100%"
        }
    };

    return (
        <div style={getGrid(props)}
            className={props.className}>
            {props.children}
        </div>
    );
}
 
export default Grid;