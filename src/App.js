import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Destination from './components/Destination/Destination';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NavBar from './components/NavBar/NavBar';


export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
        <Router>
        <NavBar></NavBar>
          <Switch>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/Login">
              <Login></Login>
            </Route>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <PrivateRoute path="/destination/:transportType">
              <Destination></Destination>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
  );
}

export default App;
