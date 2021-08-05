import logo from './logo.svg';
import './App.css';
import Homepage from './Components/Homepage';
import { Switch , Route  } from 'react-router';
import Login from './Components/login';
import Signup from './Components/signup';
import Screen2 from './Components/Screen2.js';

function App() {
  return (
    <div className="App">

      <Switch>
        <Route path="/" exact component={Homepage}></Route>
        <Route path="/screen2" exact component={Screen2} ></Route>
      </Switch>

    </div>
  );
}

export default App;
