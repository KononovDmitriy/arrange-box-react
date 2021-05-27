import { ButtonsTypes } from './../../constants';
import Controls from './../Controls';

const { RIGHT, DOUBLE_RIGHT, DOUBLE_LEFT, LEFT } = ButtonsTypes;

const buttonClickHandler = (ev) => {
  console.log('CENTER');
  console.log(ev.target.name);
};

const CenterControls = () => {
  return (
    <Controls 
      buttons={ [RIGHT, DOUBLE_RIGHT, DOUBLE_LEFT, LEFT] } 
      buttonClickHandler = { buttonClickHandler }
    />
  ); 
};

export default CenterControls;