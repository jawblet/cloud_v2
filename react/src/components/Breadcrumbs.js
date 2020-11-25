import React from 'react';
import { NavLink } from 'react-router-dom';

const BreadcrumbsNav = ({ nav } ) => {
    return(
        <div className="breadcrumbsNav">
             <NavLink to='/home'>
                <h4> skylight </h4> 
            </NavLink>
            {nav &&
                nav.map(crumb => {
                    return ( 
                        <h4 key={crumb.name}>
                            <span className="crumb__break">/</span>
                            <NavLink to={`/home/${crumb.url}`} className="crumb" activeClassName="crumb--active">
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