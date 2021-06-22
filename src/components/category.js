import React from "react";
import "../App.css";
import "../bootstrap/css/bootstrap.min.css";
import "../css/category.css";
import "../css/common.css";
import logo from "../graphics/icons/story.png";
import searchButton from "../graphics/icons/search.png";
import prevIco from "../graphics/icons/previewStory.png";
import userIco from "../graphics/icons/user.png";
import dateIco from "../graphics/icons/date.png";
import viewsIco from "../graphics/icons/eye.png";
import History from '../utils/history';
import {Link} from "react-router-dom";
import axios from "axios";
import {Navbar} from "./navbar";

export class Category extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            stories: [],
        };
        this.setStatesOnLoad = this.setStatesOnLoad.bind(this);
    }

    async setStatesOnLoad()
    {
        const {data:resp} = await axios.get("/StoryLines/public/allStories/" + this.props.category);
        let tempStories = [];
        resp.allStories.forEach(function (story) {
            let temp = <div className="py-5 row container">
                <div className=" row py-2 container">
                    <div className="column article-div" name="preview1">
                        <div className="row">
                            <div className="col-md-auto">
                                <img src={prevIco} width="100px" height="100px"/>
                            </div>
                            <div className="col">
                                <p className="article-preview-title">{story.title}</p>
                                <p>{story.ptext}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-auto">
                                <img src={userIco} className="link-icon" width="20px" height="20px"/>
                                <Link to={{pathname: "/profile", userId: story.userId}} className="link-style">{story.first_name} {story.last_name}</Link>
                            </div>
                            <div className="col-7">
                                <Link to={{pathname: "/story", storyId: story.storyId}} className="full-post">View full post...</Link>
                            </div>
                            <div className="col-md-auto article-date">
                                <img src={dateIco} className="link-icon" width="20px" height="20px"/>
                                <a href="#" className="link-style">{story.post_date}</a>
                            </div>
                            <div className="col-md-auto">
                                <img src={viewsIco} className="link-icon" width="20px" height="20px"/>
                                <a href="#" className="link-style">{story.views}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> ;
            tempStories = [...tempStories, temp]
        });
        this.setState({stories: tempStories});
    }

    componentWillMount()
    {
        this.setStatesOnLoad();
    }
    render()
    {
        return(
            <div>
                <Navbar/>
                <div>
                    {this.state.stories}
                </div>
            </div>
        );
    }
}