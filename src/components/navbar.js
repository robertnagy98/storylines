import React from "react";
import "../App.css";
import "../bootstrap/css/bootstrap.min.css";
import "../css/common.css";
import logo from "../graphics/icons/story.png";
import searchButton from "../graphics/icons/search.png";
import {Link} from "react-router-dom";
import {ReactSession} from "react-client-session";
import profileIco from "../graphics/icons/profile.png";
import History from "../utils/history";

export class Navbar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            loggedIn: ReactSession.get("loggedIn")
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout()
    {
        this.setState({loggedIn: false});
        ReactSession.set("loggedIn", false);
        History.push("/home");
    }
    render()
    {
        return(
          <div>
              <div className="navbar navbar-dark container" style={{backgroundColor: "#2F4F4F"}}>
                  <div className="container">
                      <div className="row flex-fill justify-content-between">
                          <div className="col-md-auto">
                              <Link to="/home" className="navbar-brand">
                                  <img src={logo} width="40px" height="40px"/>
                                  <strong>Story Line</strong>
                              </Link>
                          </div>
                          <div className="col-md-auto search">
                              <form>
                                  <div className="input-group">
                                      <input type="text" className="form-control" placeholder="Search" name="search"/>
                                      <div className="input-group-btn">
                                          <input className="btn btn-light" width="50px" height="40px" type="image" src={searchButton}/>
                                      </div>
                                  </div>
                              </form>
                          </div>
                          <div className="col-md-auto">
                              <div>
                                  {
                                      ReactSession.get("loggedIn")
                                          ? <div>
                                              <Link to={{pathname: "/profile", userId: ReactSession.get("userId")}} className="link-style-light">
                                                  <img src={profileIco}/>
                                              </Link>
                                              <input type="submit" className="logout-button" onClick={this.handleLogout} value="Log out" />
                                          </div>
                                          :<Link to={"/login"} className="link-style">Login/ Register</Link>
                                  }
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <ul className="nav nav-tabs justify-content-center navbar-dark shadow-lg container" style={{backgroundColor: "#2F4F4F"}}>
                  <li className="nav-item">
                      <Link className="nav-link" to={{pathname: "/redirect", component:"romance"}}>Romance</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to={{pathname: "/redirect", component:"horror"}}>Horror</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to={{pathname: "/redirect", component:"comedy"}}>Comedy</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to={{pathname: "/redirect", component:"science-fiction"}}>Science Fiction</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to={{pathname: "/redirect", component:"action"}}>Action</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to={{pathname: "/redirect", component:"mystery"}}>Mystery</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to={{pathname: "/redirect", component:"kids"}}>Kids</Link>
                  </li>
              </ul>
          </div>
        );
    }
}