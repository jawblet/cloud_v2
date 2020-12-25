import React from 'react';

const style = {
    filter: `url(#goo)`
}

// Blob library 
export function BlobChildA() {
    return(
        <div className="blob">
        </div>
    )
}

export function BlobChildB() {
    return(
        <div className="blob flat" id="flatTop">
        </div>
    )
}

export function BlobChildC() {
    return(
        <div className="blob circle">
        </div>
    )
}

export function BlobChildD() {
    return(
        <div className="blob extrude">
        </div>
    )
}

export function BlobChildE() {
    return(
        <div className="blob extrudeTwice">
        </div>
    )
}

export function BlobChildF() {
    return(
        <div className="blob splat">
        </div>
    )
}

export function Blob() {
    return(
        <div className="blobParent" style={style}>
            <div className="blob" id="rotate">
            </div>
            <div className="blob">
            </div>
        </div>
    )
}

export function BlobTwo() {
    return(
        <div className="blobParent" style={style}>
            <div className="blob flat" id="flatTop">
            </div>
            <div className="blob flat">
            </div>
        </div>
    )
}

export function BlobThree() {
    return(
        <div className="blobParent" style={style}>
            <div className="blob flat squat" id="flatTop">
            </div>
            <div className="blob flat squat">
            </div>
        </div>
    )
}
