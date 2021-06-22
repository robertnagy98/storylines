import React from "react";
import "../App.css";
import "../bootstrap/css/bootstrap.min.css";
import "../css/profile.css";
import "../css/common.css";
import user from "../graphics/icons/user.png";
import previewStory from "../graphics/icons/previewStory.png";
import History from '../utils/history';
import {Link} from "react-router-dom";
import {Navbar} from "./navbar";
import {ReactSession} from "react-client-session";
import axios from "axios";

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.location.userId,
            first_name: "",
            last_name: "",
            gender: "",
            email: "",
            dob: "",
            country: "",
            type:"",
            stories: [],
            reviews: [],
            editing: false,
            edit_first_name: "",
            edit_last_name: "",
            edit_gender: "",
            edit_country: ""

        };
        this.setStatesOnLoad = this.setStatesOnLoad.bind(this);
        this.setId = this.setId.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.handleSaveChange = this.handleSaveChange.bind(this);

    }

    async setStatesOnLoad() {
        const {data: resp} = await axios.get("/StoryLines/public/user/" + this.state.userId);
        this.setState({first_name: resp.first_name});
        this.setState({last_name: resp.last_name});
        this.setState({gender: resp.gender});
        this.setState({email: resp.email});
        this.setState({dob: resp.dob});
        this.setState({type: resp.type});
        this.setState({country: resp.country});

        this.setState({edit_first_name: resp.first_name});
        this.setState({edit_last_name: resp.last_name});
        this.setState({edit_gender: resp.gender});
        this.setState({edit_country: resp.country});

        if (resp.type === 'critic') {
            const {data: resp} = await axios.get("/StoryLines/public/reviews/" + this.state.userId);
            let tempReviews = [];
            console.log(resp.reviews);
            for (let review in resp.reviews)
            {
                const {data: resps} = await axios.get("/StoryLines/public/story/" + resp.reviews[review].STORY_ID);
                let temp =
                    <div>
                        <div className="row profile-articles">
                            <div className="row">
                                <div className="col-9 article-preview-prof">
                                    <div className="row article-row">
                                        <div className="col-md-auto">
                                            <img src={previewStory} width="100px" height="100px"/>
                                        </div>
                                        <div className="col-md-auto">
                                            <Link to={{pathname: "/story", storyId: resp.reviews[review].STORY_ID}} className={"link-style"}><p className="article-preview-title">{resps.title}</p></Link>
                                            <p>{resp.reviews[review].TEXT}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>;
                tempReviews = [...tempReviews, temp];
            }
            this.setState({reviews: tempReviews});
        }
        else
        {  const {data: resp} = await axios.get("/StoryLines/public/profileStory/" + this.state.userId);
            let tempStories = [];
            resp.stories.forEach( function (story) {
                let temp=
            <div className="row profile-articles">
                <div className="row">
                    <div className="col article-preview-prof" name="preview1">
                        <div className="row article-row">
                            <div className="col-md-auto">
                                <img src={previewStory} width="100px" height="100px"/>
                            </div>
                            <div className="col">
                                <p className="article-preview-title">{story.title}</p>
                                <p>{story.text}</p>
                            </div>
                        </div>
                        <div className="row article-row">
                            <div className="col-8">
                                <img src={user} className="link-icon" width="20px" height="20px"/>
                                <a href="#" className="link-style">{story.first_name} {story.last_name}</a>
                            </div>
                            <div className="col">
                                <Link to={{pathname: "/story", storyId: story.id}} className="full-post">View full post...</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
                tempStories = [...tempStories, temp]
            });
            this.setState({stories: tempStories});
        }
    }

    setId()
    {
        if(this.props.location.userId==null)
        {
            this.setState({userId: ReactSession.get("userId")});
        }
        else
        {
            this.setState({userId: this.props.location.userId})
        }
    }

    handleEditButton()
    {
        this.setState({editing: !this.state.editing});
    }

    handleEditChange(e)
    {
        switch (e.target.name)
        {
            case "editFirstName":
                this.setState({edit_first_name: e.target.value});
                break;
            case "editLastName":
                this.setState({edit_last_name: e.target.value});
                break;
            case "editGender":
                this.setState({edit_gender: e.target.value});
                break;
            case "editCountry":
                this.setState({edit_country: e.target.value});
                break;
            default:
                break;
        }
    }

    async handleSaveChange()
    {
        let {status: resp} = await axios.put("/StoryLines/public/edituser/" + ReactSession.get("userId"), {
            first_name: this.state.edit_first_name,
            last_name: this.state.edit_last_name,
            gender: this.state.edit_gender,
            country: this.state.edit_country
        });
        this.setState({first_name: this.state.edit_first_name});
        this.setState({last_name: this.state.edit_last_name});
        this.setState({gender: this.state.edit_gender});
        this.setState({country: this.state.edit_country});
        this.setState({editing: !this.state.editing});
    }

    componentWillMount() {
        this.setId();
        this.setStatesOnLoad();
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div>
                    <div className="py-5 container">
                        <div className={"row justify-content-center"}>
                            <div className={"col-md-auto"}>
                                {
                                    this.state.userId == ReactSession.get("userId")
                                        ?<div>
                                            <input type="submit" className={"edit-profile-btn"} onClick={this.handleEditButton} value="Edit profile"/>
                                        </div>
                                        :<div></div>
                                }
                            </div>
                        </div>
                        <div className={"row justify-content-center"}>
                            <div className={"col-md-auto"}>
                                {
                                    this.state.editing
                                        ?<div className={"row justify-content-center edit-box"}>
                                            <div className={"col-md-auto"}>
                                                <div className={"row"}>
                                                    <input name={"editFirstName"} type={"text"} className={"form-control edit-input"} value={this.state.edit_first_name} onChange={this.handleEditChange} placeholder={"First Name"}/>
                                                </div>
                                                <div className={"row"}>
                                                    <input name={"editLastName"} type={"text"} className={"form-control edit-input"} value={this.state.edit_last_name} onChange={this.handleEditChange} placeholder={"Last Name"}/>
                                                </div>
                                                <div className={"row"}>
                                                    <input name={"editGender"} type={"text"} className={"form-control edit-input"} value={this.state.edit_gender} onChange={this.handleEditChange} placeholder={"Gender"}/>
                                                </div>
                                                <div className={"row"}>
                                                    <input name={"editCountry"} type={"text"} className={"form-control edit-input"} value={this.state.edit_country} onChange={this.handleEditChange} placeholder={"Country"}/>
                                                </div>
                                                <div className={"row"}>
                                                    <input type={"submit"} className={"edit-profile-btn"} value={"Save"} onClick={this.handleSaveChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        :<div></div>
                                }
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-auto add-profile-img">
                                <img src={user} width="80px" height="80px"/>
                            </div>
                            <div className="col-md-auto shadow-lg profile-about-div">
                                <div className="row name-row">
                                    <div className="col-md-auto">
                                        <h1>{this.state.first_name} {this.state.last_name}</h1>
                                    </div>
                                </div>
                                <div className="row profile-about">
                                    <strong>ABOUT</strong>
                                </div>
                                <div className="row profile-articles py-3">
                                    <div className="row">
                                        <div className="col-md-auto">
                                            <div className="row">
                                                <div className="col">
                                                    <strong>Email</strong>
                                                </div>
                                                <div className="col-md-auto">
                                                    <label>{this.state.email}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <strong>Gender</strong>
                                                </div>
                                                <div className="col-md-auto">
                                                    <label>{this.state.gender}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <strong>DoB</strong>
                                                </div>
                                                <div className="col-md-auto">
                                                    <label>{this.state.dob}</label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <strong>Country</strong>
                                                </div>
                                                <div className="col-md-auto">
                                                    <label>{this.state.country}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.state.type==='author'?
                                <div>
                                    <div className="row profile-about">
                                        <strong>STORIES</strong>
                                    </div>
                                    {this.state.stories}
                                </div>
                                :<div className="row profile-about">
                                        <div className="row profile-about">
                                            <strong>REVIEWS</strong>
                                        </div>
                                        {this.state.reviews}
                                </div>
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}