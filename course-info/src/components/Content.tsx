import Part from './Part';
import { CoursePart } from '../types';

interface contentProps {
    courseParts: CoursePart[]
};

  
const Content = (props: contentProps)  => {
    return (
        <>
            {
                props.courseParts.map(coursePart => {
                    return (<Part key={coursePart.name} coursePart={coursePart}></Part>);
                })
            }
        </>
)   ;
};

export default Content;