import React from 'react';
import Flex from '../utils/Flex';

const SyllabusHeading = () => {
    return (
    <div className="syllabus__header"> 
        <p style={{ paddingBottom:'3rem' }}> 
            We found ourselves returning to themes of alternate software landscapes,
            epistolary narratives, 
            and hypertext.  
        </p>
        <Flex middle>
            <h4 className="heavy syllabus__title justifyStart">
                Domestic online metaphors
            </h4>
            <h4 className="heavy syllabus__title justifyCenter">
                Epistolary narrative
            </h4>
            <h4 className="heavy syllabus__title justifyEnd">
                Hypertext
            </h4>
        </Flex>
    </div>
    );
}
 
export default SyllabusHeading;