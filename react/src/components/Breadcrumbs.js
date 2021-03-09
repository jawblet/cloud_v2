import React from 'react';
import { NavLink } from 'react-router-dom';

const BreadcrumbsNav = ({ nav } ) => {
    return(
        <div className="breadcrumbsNav">
             <NavLink to='/'>
                <h4>arrive anywhere</h4> 
            </NavLink>
            {nav &&
                nav.map((crumb, index) => {
                    return ( 
                        <h4 key={index}>
                            <span className="crumb__break">/</span>
                            <NavLink to={`/${crumb.url}`} className="crumb" activeClassName="crumb--active">
                                {crumb.name}
                            </NavLink>
                        </h4> 
                    )}) 
                }
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

export { BreadcrumbsNav, Breadcrumbs }