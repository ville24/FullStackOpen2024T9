interface totalProps {
    totalExercises: number;
}
  
const Total = (props: totalProps)  => 
    <p>
        Number of exercises {props.totalExercises}
    </p>;

  
export default Total;

