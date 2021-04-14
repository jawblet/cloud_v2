import React from 'react';

const Flex = (props) => {
    //initialize axis
    let mainAxis = "flex-start";
    let crossAxis = "stretch"; 

    const getFlex = (props) => {
        const {
            inline, // flex or flex-inline  
            column, // row or column 
            top, 
            middle,
            bottom,
            left,
            center,
            right,
            between,
            around, 
            gap,
            width
          } = props;

        // does primary axis have a value?
        if (left || center || right || between || around) {
            // set value
            if (left) {
            mainAxis = "flex-start";
                } else if (center) {
            mainAxis = "center";
                } else if (right) {
            mainAxis = "flex-end";
                } else if (between) {
            mainAxis = "space-between";
                } else if (around) {
            mainAxis = "space-around";
            }
        }

        if (top || middle || bottom) {
            if (top) {
            crossAxis = "flex-start";
            } else if (middle) {
            crossAxis = "center";
            } else if (bottom) {
            crossAxis = "flex-end";
            }
        }

    // if vertical flip it
    if (column) {
        if (left || center || right) {
        if (left) {
            crossAxis = "flex-start"; 
        } else if (center) {
            crossAxis = "center";
        } else if (right) {
            crossAxis = "flex-end";
        }
        }

        if (top || middle || bottom || between || around) {
            if (top) {
                mainAxis = "flex-start";
            } else if (middle) {
                mainAxis = "center";
            } else if (bottom) {
                mainAxis = "flex-end";
            } else if (between) {
                mainAxis = "space-between";
            } else if (around) {
                mainAxis = "space-around";
            }
        }
      }

      return {
          display: inline ? "inline-flex" : "flex",
          flexDirection: column ? "column" : "row",
          justifyContent: mainAxis,
          alignItems: crossAxis,
          width: width || 'auto',
          gap: `${gap}rem`
      }
    }

    return (
        <div style={getFlex(props)}
            className={props.className}>
            {props.children}
        </div>
    );
}
 
export default Flex;