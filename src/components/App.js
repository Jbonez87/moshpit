import React from 'react';
import {
  HashRouter as Router,
} from 'react-router-dom';

import NavBar from './NavBar';
import RoutesContainer from './RoutesContainer';
import Footer from './Footer';
import '../static/css/app.css';

const App = () => (
  <Router
    basename={process.env.PUBLIC_URL}
  >
    <div>
      <NavBar />
      <RoutesContainer />
      <Footer />
    </div>
  </Router>
);

export default App;
