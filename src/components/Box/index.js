import './Box.css';

import { dndPugHandler } from './../../tools';

const Box = (props) => {
  const { header, onDndDropHandler, onDndEnterHandler,
    onDndLeaveHandler, boxDndFocus } = props;
  
  return (
    <div className = "Box">
      <div className = "Box-box">
        <div className = "Box-header">{ header }</div>
        <div 
          className = { `Box-basket ${ (boxDndFocus) ? 'Box-basket--dnd-focus' : '' }` }
          data-type = 'box-backet'

          onDragEnter = { onDndEnterHandler }
          onDragLeave = { onDndLeaveHandler }
          onDragOver = { dndPugHandler }
          onDrop = { onDndDropHandler }
        >
          { props.children }
        </div>
      </div>
    </div>
  );
};

export default Box;
