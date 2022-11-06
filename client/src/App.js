import './App.css';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import About from './components/About';
import CreateActivity from './components/CreateActivity';
import DetailCountry from './components/DetailCountry';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateActivity />
        </Route>
        <Route exact path="/countries/:id">
          <DetailCountry />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>

  );
}

export default App;
