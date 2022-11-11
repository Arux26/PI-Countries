import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import About from './components/About/About';
import CreateActivity from './components/CreateActivity/CreateActivity';
import DetailCountry from './components/DetailCountry/DetailCountry';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <div className='App'>
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
