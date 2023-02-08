import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Idea from './components/post/Idea';
import Edit from './components/post/Edit';
import Create from './components/post/Create';
import Profile from "./contexts/profile";

function App(): JSX.Element {

  return (
    <div className="App">
      <div className={'container'}>
      <BrowserRouter>
        <Navbar />
        <Profile></Profile>
        <Switch>
          <Route path={"/ideas"} exact={true} component={Home} />
          <Route path={"/idea/:ideaId"} component={Idea}/>
          <Route path={"/edit/:ideaId"} component={Edit}/>
          <Route path={"/create"} component={Create} />
        </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
