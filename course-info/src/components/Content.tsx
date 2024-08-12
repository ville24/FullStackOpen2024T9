interface contentProps {
    courseParts: {
        name: string,
        exerciseCount: number
    }[]
};

  
const Total = (props: contentProps)  => 
    props.courseParts.map(coursePart =>
    <p key={coursePart.name}>
        {coursePart.name} {coursePart.exerciseCount}
    </p>);
  
export default Total;