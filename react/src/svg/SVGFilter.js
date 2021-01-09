import React from 'react';

const blue = "#00f7ff";

export function BlobFilter() {
    return(
        <>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1"  x='0%' y='0%' width='100%' height='0px'>
            <defs>
                <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                </filter>
            </defs>
        </svg>
        </> 
    )
}

export function OutlineFilter() {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1"  x='0%' y='0%' width='100%' height='0px'>
        <defs>
            <filter id="outline">
                <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="2"></feMorphology>
                <feFlood flood-color={blue} flood-opacity="1" result="BLUE"></feFlood>
                <feComposite in="BLUE" in2="DILATED" operator="in" result="OUTLINE"></feComposite>
                <feMerge>
            <feMergeNode in="OUTLINE" />
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
            </filter>
        </defs>
    </svg>
    )
}