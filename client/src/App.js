import './App.css';
import Home from './components/Home';
import LandingPage from './components/landingPage';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Route exact path={"/"}>
        <LandingPage />
      </Route>
      <Route path={"/home"}>
        <Home />
      </Route>
    </div>
  );
}

export default App;
