import './Box.css';

const Box = (props) => {
  const { header } = props;
  
  return (
    <div className = "Box">
      <div className = "Box-box">
        <div className = "Box-header">{ header }</div>
        <div 
          className = "Box-basket"
          data-type = 'box-backet'
        >
          { props.children }
        </div>
      </div>
    </div>
  );
};

export default Box;
