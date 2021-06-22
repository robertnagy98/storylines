import React from "react";
import "../App.css";
import "../bootstrap/css/bootstrap.min.css";
import "../css/login.css";
import "../css/common.css";
import logo from "../graphics/icons/story.png";
import searchButton from "../graphics/icons/search.png";
import loginIco from "../graphics/icons/log-in.png";
import History from '../utils/history';
import {ReactSession} from 'react-client-session';
import {Link} from "react-router-dom";
import axios from "axios";
import {Navbar} from "./navbar";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputUsername: "",
            inputPassword: "",
            showError: false
        };
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleUsername(e) {
        this.setState({inputUsername: e.target.value});
    }

    handlePassword(e) {
        this.setState({inputPassword: e.target.value});
    }

    async handleClick() {
        const {data: res} = await axios.get("/StoryLines/public/login/" + this.state.inputUsername, {params: {password: this.state.inputPassword}});
        if (res.id != null) {
            ReactSession.set("userId", res.id);
            ReactSession.set("loggedIn", true);
            const {data: uRes} = await axios.get("/StoryLines/public/user/" + res.id);
            ReactSession.set("userType", uRes.type);
            History.push("/home");
        } else {
            this.setState({showError: true});
        }
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div>
                    {
                        this.state.showError
                            ? <div className={"container"} style={{color: "red", fontSize: "40px"}}>
                                <div className={"row flex-fill justify-content-center"}>Incorrect username or password</div>
                            </div>
                            : <div></div>
                    }
                    <div className="container py-3 login-container">
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <img src={loginIco} width="50px" height="50px"/>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <h1>Login</h1>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <input name="username" type="text" className="form-control login-input"
                                       placeholder="Username" value={this.state.inputUsername}
                                       onChange={this.handleUsername}/>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <input name="password" type="password" className="form-control login-input"
                                       placeholder="Password" value={this.state.inputPassword}
                                       onChange={this.handlePassword}/>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <input name="submit" className="btn btn-light login-button" type="submit" value="Login"
                                       onClick={this.handleClick}/>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <Link to="/register"><input className="btn btn-light signup-link" type="button" value="SignUp"/></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}