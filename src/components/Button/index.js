import './Button.css';

const Button = (props) => {
  const { type, handler } = props;
  
  return (
    <button 
      className={ `btn ${ type } btn--raised btn--primary` }
      name = { type }
      onClick = { handler } >
    </button>
  );
}

export default Button;