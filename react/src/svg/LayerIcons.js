import React, { Suspense, lazy } from 'react';

const layerPath = id => 
    lazy(() => 
        import(`./icons/${id}`).catch(() => 
        import('./GroupIcon')
        )
    );
 
export const LayerIcon = ({l, id, ...props }) => {
    const LayerPath = layerPath(id);
    const strokeWidth = props.strokeWidth || 5;
    const stroke = props.stroke || "currentColor"; 
    const fill = props.fill || "none";
    
    return(
    <Suspense fallback={<span>...</span>}>
        <svg width={l} height={l} viewBox="-2.5 -2.5 105 105" 
            className="mapLayerIcon" 
            strokeLinecap="round" strokeLinejoin="round"
            strokeWidth={strokeWidth} stroke={stroke} fill={fill}
            xmlns="http://www.w3.org/2000/svg">
                <LayerPath/>
        </svg>
    </Suspense>
    )
}








