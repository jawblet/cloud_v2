import React from 'react';
import { VscArrowLeft, VscArrowRight } from 'react-icons/vsc'; 

export default function Paginate(props) {
   const { pageState, handlePageCounter } = props; 
   const { page, totalPages, prevPage, nextPage } = pageState;

   return (
       <>
       {(totalPages && totalPages > 1) ?
            <div className="paginate">
            {prevPage && 
            <VscArrowLeft className="icon icon__btn paginate__L" 
                            onClick={() => handlePageCounter(page - 1)}/>
                        }
            {(totalPages && totalPages > 1) &&
                <h4 className="paginate__pg" >
                    {page} of {totalPages}
                </h4> }
                {nextPage &&
                <VscArrowRight className="icon icon__btn paginate__R" 
                            onClick={() => handlePageCounter(page + 1)}/>
                        }
            </div>
            : null
            }
        </>
    )
}