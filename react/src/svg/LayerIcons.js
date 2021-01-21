import React, { Suspense, lazy } from 'react';

const layerPath = id => 
    lazy(() => 
        import(`./icons/${id}`).catch(() => 
        import('./GroupIcon')
        )
    );

export const LayerIcon = ({l, id, ...props }) => {
    const LayerPath = layerPath(id);
    const stroke = props.stroke || 5;
   
    return(
    <Suspense fallback={<span>...</span>}>
        <svg width={l} height={l} viewBox="-2.5 -2.5 105 105" fill="none" 
            className="mapLayerIcon" stroke="currentColor" 
            strokeLinecap="round" strokeLinejoin="round"
            strokeWidth={stroke} 
            xmlns="http://www.w3.org/2000/svg">
                <LayerPath/>
        </svg>
    </Suspense>
    )
}











//const LayerPath = React.lazy(() => import ('./LayerPaths'));

/*

<path d="M11.4234 43.6704C6.20348 53.422 1.2551 63.4398 1.00536 74.5198C0.807679 83.2899 6.09456 92.587 14.4471 95.7474C23.2363 99.0729 29.5779 102.329 39.1705 100.446C41.81 99.9282 44.4518 100.092 47.1125 99.7979C51.101 99.3564 54.9672 98.2185 58.962 97.8442C65.013 97.2772 70.6602 95.4219 76.4071 93.6804C79.3902 92.7765 83.311 92.2667 85.6421 90.1181C88.5584 87.4301 91.2754 84.5288 94.1667 81.8389C96.0019 80.1316 96.8507 78.1228 98.0657 76.0584C99.6062 73.4408 99.0641 71.2741 99.6681 68.5241C100.829 63.2375 101.228 56.9494 100.877 51.5263C100.663 48.2124 96.8542 43.7328 95.171 40.9307C92.8602 37.0838 89.9988 33.3814 86.839 30.2399C81.4024 24.8348 77.2629 18.5188 71.6468 13.2933C67.393 9.33541 62.3788 4.18612 56.6701 2.57444C47.9177 0.103474 37.4288 0.769755 28.6286 2.99089C19.3721 5.32718 19.7556 16.0878 17.9918 23.7044C16.5706 29.8419 15.2277 37.418 12.5053 43.0383"/>

(() => {
    switch (id) {
        case 1: return <L1/>
        case 2: return <L2/>
        case 3: return <L3/>
        default: return;
    }
})()
*/