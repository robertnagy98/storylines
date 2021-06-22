import React from "react";
import "../App.css";
import "../bootstrap/css/bootstrap.min.css";
import "../css/login.css";
import "../css/common.css";
import History from '../utils/history';
import {Link} from "react-router-dom";
import {Navbar} from "./navbar";
import axios from "axios";

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                first_name: "",
                last_name: "",
                username: "",
                email: "",
                password: "",
                gender: "",
                dob: "",
                country: "",
                type: ""
            },
            cPassword: "",
            showError: false,
            errorMessage: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleInputChange(e)
    {
        switch(e.target.name)
        {
            case "username":
                this.setState({newUser: {
                        first_name: this.state.newUser.first_name,
                        last_name: this.state.newUser.last_name,
                        username: e.target.value,
                        email: this.state.newUser.email,
                        password: this.state.newUser.password,
                        gender: this.state.newUser.gender,
                        dob: this.state.newUser.dob,
                        country: this.state.newUser.country,
                        type: this.state.newUser.type
                    }
                });
                break;
            case "first_name":
                this.setState({newUser: {
                        first_name: e.target.value,
                        last_name: this.state.newUser.last_name,
                        username: this.state.newUser.username,
                        email: this.state.newUser.email,
                        password: this.state.newUser.password,
                        gender: this.state.newUser.gender,
                        dob: this.state.newUser.dob,
                        country: this.state.newUser.country,
                        type: this.state.newUser.type
                    }
                });
                break;
            case "last_name":
                this.setState({newUser: {
                        first_name: this.state.newUser.first_name,
                        last_name: e.target.value,
                        username: this.state.newUser.username,
                        email: this.state.newUser.email,
                        password: this.state.newUser.password,
                        gender: this.state.newUser.gender,
                        dob: this.state.newUser.dob,
                        country: this.state.newUser.country,
                        type: this.state.newUser.type
                    }
                });
                break;
            case "email":
                this.setState({newUser: {
                        first_name: this.state.newUser.first_name,
                        last_name: this.state.newUser.last_name,
                        username: this.state.newUser.username,
                        email: e.target.value,
                        password: this.state.newUser.password,
                        gender: this.state.newUser.gender,
                        dob: this.state.newUser.dob,
                        country: this.state.newUser.country,
                        type: this.state.newUser.type
                    }
                });
                break;
            case "password":
                this.setState({newUser: {
                        first_name: this.state.newUser.first_name,
                        last_name: this.state.newUser.last_name,
                        username: this.state.newUser.username,
                        email: this.state.newUser.email,
                        password: e.target.value,
                        gender: this.state.newUser.gender,
                        dob: this.state.newUser.dob,
                        country: this.state.newUser.country,
                        type: this.state.newUser.type
                    }
                });
                break;
            case "gender":
                this.setState({newUser: {
                        first_name: this.state.newUser.first_name,
                        last_name: this.state.newUser.last_name,
                        username: this.state.newUser.username,
                        email: this.state.newUser.email,
                        password: this.state.newUser.password,
                        gender: e.target.value,
                        dob: this.state.newUser.dob,
                        country: this.state.newUser.country,
                        type: this.state.newUser.type
                    }
                });
                break;
            case "dob":
                this.setState({newUser: {
                        first_name: this.state.newUser.first_name,
                        last_name: this.state.newUser.last_name,
                        username: this.state.newUser.username,
                        email: this.state.newUser.email,
                        password: this.state.newUser.password,
                        gender: this.state.newUser.gender,
                        dob: e.target.value,
                        country: this.state.newUser.country,
                        type: this.state.newUser.type
                    }
                });
                break;
            case "country":
                this.setState({newUser: {
                        first_name: this.state.newUser.first_name,
                        last_name: this.state.newUser.last_name,
                        username: this.state.newUser.username,
                        email: this.state.newUser.email,
                        password: this.state.newUser.password,
                        gender: this.state.newUser.gender,
                        dob: this.state.newUser.dob,
                        country: e.target.value,
                        type: this.state.newUser.type
                    }
                });
                break;
            case "cPass":
                this.setState({cPassword: e.target.value});
            default:
                break;
        }
    }

    handleTypeChange(e)
    {
        this.setState({newUser: {
                first_name: this.state.newUser.first_name,
                last_name: this.state.newUser.last_name,
                username: this.state.newUser.username,
                email: this.state.newUser.email,
                password: this.state.newUser.password,
                gender: this.state.newUser.gender,
                dob: this.state.newUser.dob,
                country: this.state.newUser.country,
                type: e.target.value
            }
        });
    }

    async handleRegister()
    {
        if( this.state.newUser.password === this.state.cPassword)
        {
            try{
            const {status:resp} = await axios.post("/StoryLines/public/register", {
                first_name: this.state.newUser.first_name,
                last_name: this.state.newUser.last_name,
                username: this.state.newUser.username,
                email: this.state.newUser.email,
                password: this.state.newUser.password,
                gender: this.state.newUser.gender,
                dob: this.state.newUser.dob,
                country: this.state.newUser.country,
                type: this.state.newUser.type
            });
            History.push("/login");
            }
            catch (e) {
                this.setState({errorMessage: "Something went wrong : " + e.message});
                this.setState({showError: true});
            }

        }
        else
        {
            this.setState({errorMessage: "Passwords do not match"});
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
                                <div className={"row flex-fill justify-content-center"}>{this.state.errorMessage}</div>
                            </div>
                            : <div></div>
                    }
                    <div className="container  py-3 login-container">
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <h1>Sign Up</h1>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <input name="first_name" type="text" className="form-control login-input-small" value={this.state.newUser.first_name} onChange={this.handleInputChange} placeholder="First Name"/>
                            </div>
                            <div className="col-md-auto">
                                <input name="last_name" type="text" className="form-control login-input-small" value={this.state.newUser.last_name} onChange={this.handleInputChange} placeholder="Last Name"/>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <input name="username" type="text" className="form-control login-input" value={this.state.newUser.username} onChange={this.handleInputChange} placeholder="Username"/>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <input name="email" type="text" className="form-control login-input" value={this.state.newUser.email} onChange={this.handleInputChange} placeholder="Email"/>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <input name="password" type="password" className="form-control login-input" value={this.state.newUser.password} onChange={this.handleInputChange} placeholder="Password"/>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <input name="cPass" type="password" className="form-control login-input" value={this.state.cPassword} onChange={this.handleInputChange} placeholder="Confirm password"/>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <input name="gender" type="text" className="form-control login-input" value={this.state.newUser.gender} onChange={this.handleInputChange} placeholder="Gender"/>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <input name="dob" type="date" className="form-control login-input" value={this.state.newUser.dob} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <input name="country" type="text" className="form-control login-input" value={this.state.newUser.country} onChange={this.handleInputChange} placeholder="Country"/>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-auto type-section">
                                <h3>Account type</h3>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-auto end-type-section">
                                <input name="type" type="radio" value="author" onClick={this.handleTypeChange}/><label>Author</label>
                            </div>
                            <div className="col-md-auto end-type-section">
                                <input name="type" type="radio" value="critic" onClick={this.handleTypeChange}/><label>Critic</label>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-md-auto">
                                <input className="btn btn-light signup-button" type="submit" onClick={this.handleRegister} value="Submit"/>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-auto">
                            <label>Already have an account?</label>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-auto">
                            <Link className="link-style" to="./login">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}