import React from 'react';
import { VscArrowLeft, VscArrowRight } from 'react-icons/vsc'; 

export default function Paginate(props) {
   const { pageState, handlePageCounter } = props; 
   const { page, totalPages, prevPage, nextPage } = pageState;

    return (
        <div className="paginate" style={{paddingTop:'1rem'}}>
           {prevPage && 
           <VscArrowLeft className="icon icon__btn paginate__L" 
                        onClick={() => handlePageCounter(page - 1)}/>
                    }
            <h4 className="paginate__pg">
                {page} of {totalPages}
            </h4>
            {nextPage &&
            <VscArrowRight className="icon icon__btn paginate__R" 
                         onClick={() => handlePageCounter(page + 1)}/>
                    }
        </div>
    )
}

/*
{(totalPages > 1) &&
            <h4 className="paginate__pg">
                {page} of {totalPages}
            </h4> }


   if(totalPages === 1) {
        return null; 
   }


*/
