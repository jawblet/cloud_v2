import React from 'react';
import { VscArrowLeft, VscArrowRight } from 'react-icons/vsc'; 

export default function Paginate(props) {
   const {page, setPage} = props;

   const currentPg = page.currentPage; 
   const totalPgs = page.totalPages; 

   if(!currentPg) {
    return(<></>);
   }

    return (
        <div className="paginate" style={{paddingTop:'1rem'}}>
           {(currentPg !== 1) && 
           <VscArrowLeft className="icon icon__btn paginate__L" 
                        onClick={() => setPage({...page, currentPage: page.currentPage - 1}
                            )}/>
                    }
                <h4 className="paginate__pg">
                    {page.currentPage} of {page.totalPages}
                </h4> 
               {(currentPg !== totalPgs) &&
                <VscArrowRight className="icon icon__btn paginate__R" 
                         onClick={() => setPage({...page, 
                            currentPage: page.currentPage + 1})}/>}
        </div>
    )
}