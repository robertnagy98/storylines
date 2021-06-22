import React from "react";
import "../App.css";
import "../bootstrap/css/bootstrap.min.css";
import "../css/home.css";
import "../css/common.css";
import logo from "../graphics/icons/story.png";
import searchButton from "../graphics/icons/search.png";
import prev from "../graphics/icons/previewStory.png";
import userIco from "../graphics/icons/user.png";
import likeIco from "../graphics/icons/like.png";
import dislikeIco from "../graphics/icons/dislike.png";
import writeIco from "../graphics/icons/write.png";
import profileIco from "../graphics/icons/profile.png";
import History from '../utils/history';
import {Link} from "react-router-dom";
import {ReactSession} from 'react-client-session';
import {Navbar} from "./navbar";

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div>
                    <Navbar/>
                </div>
                <div className="py-3 container">
                    <div className="row justify-content-center">
                        <div className="col section-title rounded" name="section-title">
                            <h1><strong>Most viewed stories</strong></h1>
                        </div>
                    </div>
                    <div className="row py-3 articles-container">
                        <div className="row py-2 article-row article-preview">
                            <div className="col-md-auto">
                                <img src={prev} width="70px" height="70px"/>
                            </div>
                            <div className="col-7">
                                <p className="article-preview-title">Big Bright Smiling Eyes</p>
                                <p>Big bright smiling eyes- Reminds me of my maid's very old husband who loved
                                    me as a child when I was about 3 years old, barely ready to take admission in
                                    school. </p>
                            </div>
                            <div className="col">
                                <img src={userIco} className="link-icon" width="20px" height="20px"/>
                                <Link to={{pathname: "/profile", userId: 1}} className="link-style">Emily Foster</Link>
                            </div>
                            <div className="col-md-auto">
                                <Link to={{pathname: "/story", storyId: 0}} className="full-post">View full
                                    post...</Link>
                            </div>
                            <div className="col-md-auto">
                                <img src={likeIco} width="20px" height="20px"/>
                                <p>234</p>
                            </div>
                            <div className="col-md-auto">
                                <img src={dislikeIco} width="20px" height="20px"/>
                                <p>13</p>
                            </div>
                        </div>
                        <div className="row py-2 article-row article-preview">
                            <div className="col-md-auto">
                                <img src={prev} width="70px" height="70px"/>
                            </div>
                            <div className="col-7">
                                <p className="article-preview-title">A Brush With the Captain</p>
                                <p>I can do no more repair work on the boats today, I must rest. It’s been a full five
                                    years since a British musket ball struck me in the back and came to rest in my
                                    kidney.
                                    Five years since the surgeon cut it out through my chest, leaving me with wounds
                                    that have never fully healed.</p>
                            </div>
                            <div className="col">
                                <img src={userIco} className="link-icon" width="20px" height="20px"/>
                                <Link to={{pathname: "/profile", userId: 1}} className="link-style">Emily Foster</Link>
                            </div>
                            <div className="col-md-auto">
                                <Link to={{pathname: "/story", storyId: 1}} className="full-post">View full
                                    post...</Link>
                            </div>
                            <div className="col-md-auto">
                                <img src={likeIco} width="20px" height="20px"/>
                                <p>632</p>
                            </div>
                            <div className="col-md-auto">
                                <img src={dislikeIco} width="20px" height="20px"/>
                                <p>4</p>
                            </div>
                        </div>
                        <div className="row py-2 article-row article-preview">
                            <div className="col-md-auto">
                                <img src={prev} width="70px" height="70px"/>
                            </div>
                            <div className="col-7">
                                <p className="article-preview-title">The Stranger</p>
                                <p>"It's one more route to go." yelled the old man. "Then we seal the stack and we are
                                    off to the house once again."
                                    "We need to move the lumber inside as well. Or the rain is going to spoil it."
                                    said the young man.</p>
                            </div>
                            <div className="col">
                                <img src={userIco} className="link-icon" width="20px" height="20px"/>
                                <Link to={{pathname: "/profile", userId: 1}} className="link-style">Emily Foster</Link>
                            </div>
                            <div className="col-md-auto">
                                <Link to={{pathname: "/story", storyId: 2}} className="full-post">View full
                                    post...</Link>
                            </div>
                            <div className="col-md-auto">
                                <img src={likeIco} width="20px" height="20px"/>
                                <p>733</p>
                            </div>
                            <div className="col-md-auto">
                                <img src={dislikeIco} width="20px" height="20px"/>
                                <p>60</p>
                            </div>
                        </div>
                        <div className="row py-2 article-row article-preview">
                            <div className="col-md-auto">
                                <img src={prev} width="70px" height="70px"/>
                            </div>
                            <div className="col-7">
                                <p className="article-preview-title">On the Origin of Shadows</p>
                                <p>There are two things I have always wanted you to know about the house.
                                    Ever since you picked it out, in the middle of a recession, at a heavy discount,
                                    as you put it. As if it was a carton of milk about to go out of date.</p>
                            </div>
                            <div className="col">
                                <img src={userIco} className="link-icon" width="20px" height="20px"/>
                                <Link to={{pathname: "/profile", userId: 3}} className="link-style">Sophie
                                    Sendors</Link>
                            </div>
                            <div className="col-md-auto">
                                <Link to={{pathname: "/story", storyId: 3}} className="full-post">View full
                                    post...</Link>
                            </div>
                            <div className="col-md-auto">
                                <img src={likeIco} width="20px" height="20px"/>
                                <p>179</p>
                            </div>
                            <div className="col-md-auto">
                                <img src={dislikeIco} width="20px" height="20px"/>
                                <p>108</p>
                            </div>
                        </div>
                    </div>
                    <div className="row py-3 justify-content-center">
                        <div className="col">
                            {
                                ReactSession.get("loggedIn")
                                    ? ReactSession.get("userType") === "author"
                                    ? <Link to="/create-story" className="link-style">
                                        <img src={writeIco} className="link-icon" width="15px" height="15px"/>
                                        Write your own story
                                    </Link>
                                    : <div></div>
                                    : <Link to="/login" className="link-style">
                                        <img src={writeIco} className="link-icon" width="15px" height="15px"/>
                                        Write your own story
                                    </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}