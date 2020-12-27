import React, { useEffect } from "react";
import "./App.scss";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage"
import UserInfo from "./pages/UserInfo"
import AddWeapon from "./pages/AddWeapon"
import WeaponInfo from "./pages/WeaponInfo"

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="background-container"></div>
<div className="stars"></div>
<div className="twinkling"></div>
<div className="clouds"></div>
      <Navigation />
      <MessageBox /> 
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/user-info/:id" component={UserInfo} />
        <Route path="/add-weapon/:id" component={AddWeapon} />
        <Route path="/weapon-info/:id" component={WeaponInfo} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
