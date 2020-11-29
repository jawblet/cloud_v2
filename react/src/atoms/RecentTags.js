import React from 'react'; 

export default function RecentTags({ tags, selectTag }){
    if(!tags) {
        return ( <div>No recent tags</div> )
    }
    
    return(
        <div className="recentTags">
            <h4 className="light" style={{marginRight:'1.5rem'}}>Recently used</h4>
            {tags.map(el => {
                return(
                    <h4 className="recentTags__tag" key={el._id} data-id={el._id} data-name={el.tag} onClick={selectTag}>
                            {el.tag}
                    </h4> 
                )
            })}
        </div>
    )
}