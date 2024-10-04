import { CoursePart } from '../types';

interface PartProps {
    coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
  
const Part = (props: PartProps)  => {
  switch (props.coursePart.kind) {
    case "basic":
      return (
        <p>
          <span style={{fontWeight: "bold"}}>{props.coursePart.name} {props.coursePart.exerciseCount}</span><br />
          <span style={{fontStyle: "italic"}}>{props.coursePart.description}</span><br />
        </p>
      );
  
    case "group":
      return (
        <p>
          <span style={{fontWeight: "bold"}}>{props.coursePart.name} {props.coursePart.exerciseCount}</span><br />
          <span>Group projects {props.coursePart.groupProjectCount}</span><br />
        </p>
      );

    case "background":
      return (
        <p>
          <span style={{fontWeight: "bold"}}>{props.coursePart.name} {props.coursePart.exerciseCount}</span><br />
          <span style={{fontStyle: "italic"}}>{props.coursePart.description}</span><br />
          <span>Background material: {props.coursePart.backgroundMaterial}</span><br />
        </p>
      );

    case "special":
      return (
        <p>
          <span style={{fontWeight: "bold"}}>{props.coursePart.name} {props.coursePart.exerciseCount}</span><br />
          <span style={{fontStyle: "italic"}}>{props.coursePart.description}</span><br />
          <span>Required skills: {props.coursePart.requirements.map((req, index) => {
            if (index) return (<span key={req}>, {req}</span>); else return (<span key={req}>{req}</span>);
          })}</span><br />
        </p>
      );

    default:
      return assertNever(props.coursePart);
  }
}
  
export default Part;