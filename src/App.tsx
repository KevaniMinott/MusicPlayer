import './App.css';
import { Body } from './Body.tsx';

function App() {
  return (
    <div className="w-screen h-screen fixed bg-black flex flex-row gap-[40px] justify-center items-center overflow-hidden">
      <Body />
    </div>
  );
}

export default App;
