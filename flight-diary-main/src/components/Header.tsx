interface headerProps {
    header: string;
}
  
const Header = (props: headerProps)  => 
    <h2>{props.header}</h2>;

  
export default Header;