import './Button.css';
import { BUTTON_TYPE } from './../../constants';

const Button = (props) => {
  const { type, handler } = props;
  
  return (
    <button 
      className={ `btn ${ type } btn--raised btn--primary` }
      name = { type }
      onClick = { handler } 
      data-type = { BUTTON_TYPE }>
    </button>
  );
}

export default Button;