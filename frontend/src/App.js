import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './components/home/home.jsx';
import Shop from './components/shop/shop.jsx';
import Cart from './components/cart/cart.jsx';

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path='/shop' component={Shop} />
              <Route path='/cart' component={Cart} />
              <Route path='/' component={Home} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
