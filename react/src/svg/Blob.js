import React from 'react';

const style = {
    filter: `url(#goo)` 
}


// MASTER BLOB
export function Blob(props) {
    return (
        <div className="blob">
        </div>
    )
}

// Blob garden 
export function BlobChildA() {
    return(
        <div className="blobTest">
        </div>
    )
}

export function BlobChildB() {
    return(
        <div className="blobTest flat" id="flatTop">
        </div>
    )
}

export function BlobChildC() {
    return(
        <div className="blobTest circle">
        </div>
    )
}

export function BlobChildD() {
    return(
        <div className="blobTest extrude">
        </div>
    )
}

export function BlobChildE() {
    return(
        <div className="blobTest extrudeTwice">
        </div>
    )
}

export function BlobChildF() {
    return(
        <div className="blobTest splat">
        </div>
    )
}

export function BlobChildSquare() {
    return(
        <div className="blobTest square">
        </div>
    )
}

export function BlobChildSemiCircle() {
    return(
        <div className="blobTest semiCircle">
        </div>
    )
}

export function BlobOne() {
    return(
        <div className="blobParent" style={style}>
            <div className="blobTest" id="rotate">
            </div>
            <div className="blobTest">
            </div>
        </div>
    )
}

export function BlobTwo() {
    return(
        <div className="blobParent" style={style}>
            <div className="blobTest flat" id="flatTop">
            </div>
            <div className="blobTest flat">
            </div>
        </div>
    )
}

export function BlobThree() {
    return(
        <div className="blobParent" style={style}>
            <div className="blobTest flat squat" id="flatTop">
            </div>
            <div className="blobTest flat squat">
            </div>
        </div>
    )
}
