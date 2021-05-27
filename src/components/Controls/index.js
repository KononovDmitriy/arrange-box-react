import Button from './../Button';

import './Controls.css';

const Controls = (props) => {
  const { buttons, buttonClickHandler } = props; 
  
  return (
    <div className="Controls">
      { buttons.map(el => <Button 
          key = { el }
          type = { el }
          handler = { buttonClickHandler } />) }
    </div>
  );
};

export default Controls;