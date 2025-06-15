import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Projects from './pages/Projects';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/customers" component={Customers} />
        <Route path="/projects" component={Projects} />
      </Switch>
    </Router>
  );
};

export default App;