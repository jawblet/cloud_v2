import React from 'react';

const BreadcrumbNav = ({crumbs}) => {
    return(
        <div className="breadcrumbNav">
           {crumbs.map(crumb => {
               return( 
                    <h4 className="crumb" key={crumb}>
                        {crumb}
                    </h4> )
           })}
        </div>
    )
}

const Breadcrumbs = ({crumbs, active}) => {
    return (
        <div className="breadcrumbs">
            {crumbs.map(crumb => {
                return( 
                <h4 className={`crumb--w ${active === crumb ? 'active' : ''}`} key={crumb}>
                    {crumb}
                </h4>)
            })}
        </div>
    )
}

export { BreadcrumbNav, Breadcrumbs }