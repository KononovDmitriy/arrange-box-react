import { ButtonsTypes } from '../../constants';
import Controls from '../Controls';

const { UP, DOUBLE_UP, DOWN, DOUBLE_DOWN } = ButtonsTypes;

const RightColumnControls = (props) => {
  const { onButtonClickHandler } = props;
  
  return (
    <Controls 
      buttons={ [UP, DOUBLE_UP, DOUBLE_DOWN, DOWN] } 
      buttonClickHandler = { onButtonClickHandler }
    />
  ); 
};

export default RightColumnControls;