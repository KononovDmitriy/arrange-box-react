import { ButtonsTypes } from './../../constants';
import Controls from './../Controls';

const { RIGHT, DOUBLE_RIGHT, DOUBLE_LEFT, LEFT } = ButtonsTypes;

const CenterControls = (props) => {
  const { onButtonClickHandler } = props;
  
  return (
    <Controls 
      buttons={ [RIGHT, DOUBLE_RIGHT, DOUBLE_LEFT, LEFT] } 
      buttonClickHandler = { onButtonClickHandler }
    />
  ); 
};

export default CenterControls;