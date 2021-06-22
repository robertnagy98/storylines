import React from "react";
import "../App.css";
import "../bootstrap/css/bootstrap.min.css";
import "../css/create-story.css";
import "../css/common.css";
import saveIco from "../graphics/icons/save.png";
import typeIco from "../graphics/icons/storyType.png";
import History from '../utils/history';
import {Link} from "react-router-dom";
import {Navbar} from "./navbar";
import {ReactSession} from "react-client-session";
import axios from "axios";

export class CreateStory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            category: "",
            text: ""
        };

        this.handleTitleChange=this.handleTitleChange.bind(this);
        this.handleTextChange=this.handleTextChange.bind(this);
        this.handleCategoryChange=this.handleCategoryChange.bind(this);
        this.handleStorySave=this.handleStorySave.bind(this);

    }

    handleTitleChange(e)
    {
        this.setState({title: e.target.value});
    }

    handleTextChange(e)
    {
        this.setState({text: e.target.value});
    }

    handleCategoryChange(e)
    {
        this.setState({category: e.target.value});
    }

    async handleStorySave()
    {
        const {data: resp} = await axios.post("/StoryLines/public/story/add", {
            title: this.state.title,
            type: this.state.category,
            text: this.state.text,
            userId: ReactSession.get("userId")
        });
        History.push("/home");
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div>
                    <div className="py-3 container page-borders rounded shadow-lg">
                        <div className="row container">
                            <input name="articleTitle" type="text" className="form-control title-style" value={this.state.title} onChange={this.handleTitleChange} placeholder="Story title..."/>
                        </div>
                        <div className="row container">
                            <textarea rows={50} className={"text-area"} value={this.state.text} onChange={this.handleTextChange}/>
                        </div>
                        <div className="row container justify-content-end py-4">
                            <div className="col-md-auto save-colum">
                                <input type="image" width="50px" height="50px" src={saveIco} onClick={this.handleStorySave}/>
                            </div>
                            <div className="col-md-auto save-colum">
                                <select className="form-control" value={this.state.category} onChange={this.handleCategoryChange}>
                                    <option value={""}>Choose category</option>
                                    <option value={"Horror"}>Horror</option>
                                    <option value={"Kids"}>Kids</option>
                                    <option value={"Romance"}>Romance</option>
                                    <option value={"Action"}>Action</option>
                                    <option value={"Comedy"}>Comedy</option>
                                    <option value={"Science Fiction"}>Science Fiction</option>
                                    <option value={"Mystery"}>Mystery</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}