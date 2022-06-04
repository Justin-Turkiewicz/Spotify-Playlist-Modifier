import React from 'react';
import { Routes, Route,} from 'react-router-dom';

import Home from './pages/home/home';

class Main extends React.Component {
  
  render(){
  return (
      <Routes> 
        <Route path='/' element={<Home/>}></Route>
      </Routes>
  );
  }
}

export default Main;