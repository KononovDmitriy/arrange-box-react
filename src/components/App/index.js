import './App.css';
import ArrangeBox from '../ArrangeBox';
import LeftColumnControls from '../LeftColumnConrols';
import RightColumnControls from '../RightColumnControls';
import CenterControls from '../CenterControls';

const App = () => {
  return (
    <div className="App">
      <LeftColumnControls />
      <ArrangeBox />
      <CenterControls />
      <ArrangeBox />
      <RightColumnControls />
    </div>
  );
}

export default App;
