interface errorProps {
    errorMessage: string;
}
  
const Error = (props: errorProps)  => 
    <p style={{color: "red"}}>{props.errorMessage}</p>;

  
export default Error;