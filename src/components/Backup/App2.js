import React, { Component } from 'react';
import Navbar from './components/Navbar'
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import RealTime from './components/RealTime'
import test from './components/test'
import demo from './demo'
import Nav from './components/Navbar'

class App2 extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App2">
          <Nav />
          <Route exact path='/' component={Home}/>
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />
          <Route path='/realTime' component={RealTime} />
          <Route path='/test' component={test} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App2;
