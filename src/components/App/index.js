import './App.css';
import Box from '../Box';
import LeftColumnControls from '../LeftColumnConrols';
import RightColumnControls from '../RightColumnControls';
import CenterControls from '../CenterControls';

const App = () => {
  return (
    <div className="App">
      <LeftColumnControls />
      <Box />
      <CenterControls />
      <Box />
      <RightColumnControls />
    </div>
  );
}

export default App;
