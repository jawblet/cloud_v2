import React from 'react';
import { BlobChildA, BlobChildB, BlobChildC, BlobChildD, BlobChildE, BlobChildF,
    BlobChildSquare, BlobChildSemiCircle,
    BlobOne, BlobTwo, BlobThree }  from '../svg/Blob';
import SVGFilter from '../svg/SVGFilter';

export default function Test() {
    const filter = 'goo';
    return (
        <div className="blobGarden">
            <h3 style={{paddingBottom:'1.5rem'}}>Blob library</h3>
            <SVGFilter filter={filter}/>
        <h4 style={{paddingBottom:'1.5rem'}}>blob children</h4>
        <div className="blobGarden__row">
            <figure>
                <BlobChildA/>
                <figcaption>Base blob</figcaption> 
            </figure>
            <figure>
                <BlobChildB/>
                <figcaption>Flat-sided blob</figcaption> 
            </figure>
            <figure>
                <BlobChildC/>
                <figcaption>Circular blob</figcaption> 
            </figure>
            <figure>
                <BlobChildD/>
                <figcaption>Nipple-looking blob?</figcaption> 
            </figure>
            <figure>
                <BlobChildE/>
                <figcaption>Lumpy blob</figcaption> 
            </figure>
            <figure>
                <BlobChildF/>
                <figcaption>Splat blob</figcaption> 
            </figure>
        </div>
        <h4 style={{paddingBottom:'1.5rem'}}>blob template shapes</h4>
        <div className="blobGarden__row">
            <figure>
                <BlobChildA/>
                <figcaption>Circle</figcaption> 
            </figure>
            <figure>
                <BlobChildSquare/>
                <figcaption>Square</figcaption> 
            </figure>
            <figure>
                <BlobChildSemiCircle/>
                <figcaption>Semi-Circle</figcaption> 
            </figure>
        </div>
        <h4 style={{padding:'1.5rem 0'}}>test blobs</h4>
        <div className="blobGarden__row">
            <BlobOne/>
            <BlobTwo/>
            <BlobThree/>
        </div>

        </div>
    )
}




























/*

style={{width:'100vw', display:'flex', flexWrap:'wrap', padding:'1rem'}}


   <div>
            <svg width="188" height="229" viewBox="0 0 188 229" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                <path d="M110.635 17.1869C95.6049 12.1635 80.0438 15.2532 66.5691 23.5467C54.5382 30.9515 44.989 46.3515 46.0899 60.9859C46.8504 71.0959 50.1908 80.8728 52.3206 90.7162C54.517 100.868 57.1738 118.029 51.9574 127.732C46.5804 137.734 40.2282 146.102 36.4564 157.111C34.326 163.33 30.7862 170.449 30.8187 177.135C30.9244 198.9 53.1968 203.593 68.7936 208.805C83.6333 213.765 103.54 212.593 115.074 201.077C120.682 195.478 126.549 190.253 132.164 184.647C135.27 181.546 136.857 177.602 138.901 173.777C144.71 162.906 149.692 152.706 153.614 140.972C158.98 124.917 167.496 108.073 165.354 90.7709C164.391 82.9921 162.874 76.0554 160.4 68.6134C158.944 64.2318 158.278 57.5416 154.403 54.4838C143.224 45.6615 138.657 29.5093 125.176 24.1554C122.249 22.993 119.154 22.1426 116.166 21.1441C113.117 20.1251 111.758 17.562 108.738 16.5529" 
                stroke="blue" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div>
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke="#FF0066" 
                d="M47.5,-11.2C55.5,9.2,51.8,37.7,34.3,51.3C16.9,65,-14.3,63.8,-35.4,48.5C-56.4,33.2,-67.4,3.9,-59.8,-15.9C-52.2,-35.8,-26.1,-46.1,-3.2,-45.1C19.7,-44.1,39.5,-31.7,47.5,-11.2Z" 
                transform="translate(100 100)" />
            </svg>
        </div>

    <div>
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                  <path stroke="#FF0066" d="M48.4,-53.8C64.5,-44.1,80.7,-30.6,86.7,-12.9C92.7,4.8,88.5,26.7,76.7,41.7C65,56.6,45.7,64.7,26,72.1C6.3,79.5,-13.8,86.3,-32,82.2C-50.1,78,-66.3,62.8,-72.2,45.3C-78,27.7,-73.4,7.8,-67.3,-9.2C-61.1,-26.2,-53.3,-40.2,-41.8,-50.8C-30.4,-61.3,-15.2,-68.4,0.5,-69C16.1,-69.5,32.2,-63.5,48.4,-53.8Z" 
                  transform="translate(100 100)" />
        </svg>
     </div>
     <div>
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                <path stroke="#FF0066" d="M43.8,-73.6C55,-69.4,61,-54.1,59.6,-39.9C58.2,-25.8,49.4,-12.9,44.4,-2.9C39.3,7,38,14.1,38.6,26.9C39.2,39.8,41.8,58.4,35.7,66.9C29.6,75.4,14.8,73.8,0.7,72.7C-13.5,71.5,-27,70.8,-31.1,61.1C-35.2,51.5,-29.9,32.9,-27.8,21.2C-25.7,9.5,-26.8,4.7,-29,-1.3C-31.1,-7.3,-34.4,-14.5,-33.3,-20.6C-32.2,-26.8,-26.7,-31.8,-20.4,-38.8C-14.2,-45.8,-7.1,-54.8,4.6,-62.8C16.3,-70.8,32.6,-77.8,43.8,-73.6Z"
                  transform="translate(100 100)" />
        </svg>
     </div>
     <div>
        <svg width="225" height="268" viewBox="0 0 225 268" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M164.284 28.0391C177.929 44.8563 168.068 72.8461 167.813 92.2831C167.813 95.5 169.332 97.0901 169.987 100.037C171.067 104.897 171.969 109.684 174.089 114.395C176.337 119.389 177.478 124.295 179.053 129.369C181.101 135.969 185.97 142.089 189.391 147.994C192.262 152.949 194.345 158.43 197.473 163.214C200.674 168.11 204.888 172.188 209.001 176.301C214.649 181.949 216.718 188.957 219.339 196.403C224.1 209.927 224.629 225.768 222.088 239.888C220.808 246.999 216.85 253.423 210.601 257.283C205.738 260.286 200.046 260.547 194.807 262.534C186.853 265.551 180.735 266.719 172.079 266.513C160.772 266.244 149.512 265.816 138.193 265.816L137.769 265.816C132.716 265.817 127.535 265.818 122.604 264.585C117.089 263.206 111.885 260.776 106.194 260.072C100.678 259.39 94.9857 259.003 89.5793 257.652C84.8585 256.472 80.2609 254.856 75.3439 254.739C71.4276 254.646 67.546 254.897 63.652 254.329C51.6474 252.578 38.5975 249.437 27.3455 244.975C19.1453 241.724 13.5003 235.881 7.57178 229.632C-0.930699 220.67 0.909936 201.697 1.82839 190.331C2.71174 179.4 5.24352 169.194 8.63841 158.783C11.7753 149.164 17.3928 140.831 22.8328 132.323C37.1261 109.967 50.3227 86.0118 53.3138 59.3406C54.4055 49.6067 54.4732 40.3584 57.9086 31.0339C60.1433 24.968 63.7536 19.2279 67.5493 14.0088C73.5516 5.75552 81.5788 1.45536 91.5895 1.45536C103.153 1.45536 117.643 -0.954029 127.937 5.31164C134.348 9.2142 140.405 13.3714 147.3 16.3882C150.709 17.8792 154.029 19.563 157.433 21.065C160.725 22.5171 162.125 25.377 164.284 28.0391Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
     </div>
     <div>
        <svg width="225" height="268" viewBox="0 0 225 268" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path stroke="#FF0066" d="M40.5,-62.7C49.2,-49.4,50.7,-33.2,58.4,-17.2C66,-1.2,79.7,14.6,78.5,27.8C77.4,41.1,61.5,51.9,45.9,59.5C30.3,67.1,15.2,71.6,4.4,65.5C-6.4,59.5,-12.8,43,-25.3,34.3C-37.7,25.7,-56.3,25,-67.2,16C-78.1,7.1,-81.3,-10.2,-78.3,-27.3C-75.3,-44.5,-66.2,-61.5,-52.1,-73C-38,-84.5,-19,-90.6,-1.5,-88.4C15.9,-86.3,31.8,-76,40.5,-62.7Z" transform="translate(100 100)" />
        </svg>
     </div>
*/