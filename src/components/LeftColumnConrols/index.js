import { ButtonsTypes } from '../../constants';
import Controls from '../Controls';

const { UP, DOUBLE_UP, DOWN, DOUBLE_DOWN } = ButtonsTypes;

const buttonClickHandler = (ev) => {
  console.log('LEFT');
  console.log(ev.target.name);
};

const LeftColumnControls = () => {
  return (
    <Controls 
      buttons={ [UP, DOUBLE_UP, DOUBLE_DOWN, DOWN] } 
      buttonClickHandler = { buttonClickHandler }
    />
  ); 
};

export default LeftColumnControls;