import './App.css';
import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Home} from "./components/home";
import {Login} from "./components/login";
import {CreateStory} from "./components/create-story";
import {Register} from "./components/register";
import {Profile} from "./components/profile";
import {Category} from "./components/category";
import {Story} from "./components/story";
import {ReactSession} from 'react-client-session';
import {Redirect} from "./components/redirect";

function App() {
    ReactSession.setStoreType("localStorage");
    if (!ReactSession.get("loggedIn")) {
        ReactSession.set("loggedIn", false);
        ReactSession.set("userId", -1);
        ReactSession.set("userType", "none");
    }
    return (
        <Switch>
            <Route path={"/home"}>
                <Home/>
            </Route>
            <Route path={"/login"}>
                <Login/>
            </Route>
            <Route path={"/register"}>
                <Register/>
            </Route>
            <Route path={"/profile"} component={Profile}/>
            <Route path={"/redirect"} component={Redirect}/>
            <Route path={"/category/romance"}>
                <Category category={"Romance"}/>
            </Route>
            <Route path={"/category/horror"}>
                <Category category={"Horror"}/>
            </Route>
            <Route path={"/category/comedy"}>
                <Category category={"Comedy"}/>
            </Route>
            <Route path={"/category/science-fiction"}>
                <Category category={"ScienceFiction"}/>
            </Route>
            <Route path={"/category/action"}>
                <Category category={"Action"}/>
            </Route>
            <Route path={"/category/mystery"}>
                <Category category={"Mystery"}/>
            </Route>
            <Route path={"/category/kids"}>
                <Category category={"Kids"}/>
            </Route>
            <Route path={"/create-story"}>
                <CreateStory/>
            </Route>
            <Route path={"/story"} component={Story}/>
        </Switch>
    );
}

export default App;
