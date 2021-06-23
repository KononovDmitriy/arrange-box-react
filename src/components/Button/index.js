import './Button.css';
import { BUTTON_TYPE } from './../../constants';

const Button = (props) => {
  const { type, onClickHandler } = props;
  
  return (
    <button 
      className={ `btn ${ type } btn--raised btn--primary` }
      name = { type }
      onClick = { onClickHandler } 
      data-type = { BUTTON_TYPE }>
    </button>
  );
}

export default Button;