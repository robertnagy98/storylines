import React from "react";
import "../App.css";
import "../bootstrap/css/bootstrap.min.css";
import "../css/story.css";
import "../css/common.css";
import logo from "../graphics/icons/story.png";
import searchButton from "../graphics/icons/search.png";
import likeIco from "../graphics/icons/like.png";
import dislikeIco from "../graphics/icons/dislike.png";
import submitIco from "../graphics/icons/submit.png";
import deleteIco from "../graphics/icons/delete.png";
import History from '../utils/history';
import {Link} from "react-router-dom";
import axios from "axios";
import {Navbar} from "./navbar";
import {ReactSession} from "react-client-session";
import {Review} from "./review";

export class Story extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            post_date: "",
            story_title: "",
            paragraphs: [],
            likes: "",
            dislikes: "",
            views: "",
            reviews: [],
            inputReview: "",
            userId: "",
            storyType: "",
            editing: false,
            editTitle: "",
            editCategory: "",
            storyId: ""
        };
        this.setStatesOnLoad = this.setStatesOnLoad.bind(this);
        this.addReview = this.addReview.bind(this);
        this.handlerReviewAdded = this.handlerReviewAdded.bind(this);
        this.handleEditing = this.handleEditing.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleDeleteStory = this.handleDeleteStory.bind(this);
    }

    async handleDeleteStory()
    {
        let {status: resp} = await axios.delete("/StoryLines/public/deletestory/" + this.state.storyId);
        History.push("/home");
    }

    handleEditing()
    {
        this.setState({editing: !this.state.editing});
    }

    handleTitleChange(e)
    {
        this.setState({editTitle: e.target.value});
    }

    handleCategoryChange(e)
    {
        this.setState({editCategory: e.target.value});
    }

    async handleEditSubmit()
    {
        let {status: resp} = await axios.put("/StoryLines/public/editstory/" + this.state.storyId,{
            title: this.state.editTitle,
            views: this.state.views,
            type: this.state.editCategory
        });
        this.setState({story_title: this.state.editTitle});
        this.setState({editing: false});
    }

    async setStatesOnLoad() {
        const {data: resp} = await axios.get("/StoryLines/public/story/" + this.props.location.storyId);
        this.setState({first_name: resp.first_name});
        this.setState({last_name: resp.last_name});
        this.setState({post_date: resp.post_date});
        this.setState({story_title: resp.title});
        this.setState({likes: resp.likes});
        this.setState({dislikes: resp.dislikes});
        this.setState({views: parseInt(resp.views) + 1});
        this.setState({userId: resp.userId});
        this.setState({storyType: resp.type});
        this.setState({editTitle: resp.title});
        this.setState({editCategory: resp.type});
        this.setState({storyId: this.props.location.storyId});

        let tempPars = [];
        resp.paragraphs.forEach(function (paragraph) {
            let temp = <p>{paragraph.text}</p>;
            tempPars = [...tempPars, temp]
        });
        this.setState({paragraphs: tempPars});

        let tempRevs = [];
        resp.reviews.forEach(function (review) {
            let temp = <div>
                <Review review={review}/>
                <hr/>
            </div>;
            tempRevs = [...tempRevs, temp];
        });
        this.setState({reviews: tempRevs});

        let {status: respV} = await axios.put("/StoryLines/public/editstory/" + this.props.location.storyId,{
            title: resp.title,
            views: parseInt(resp.views) + 1,
            type: resp.type
        });
    }

    async addReview() {
        console.log(ReactSession.get("userId"));
        console.log(this.props.location.storyId);
        console.log(this.state.inputReview);
        const {data: resp} = await axios.post("/StoryLines/public/review/add",
            {
                criticId: ReactSession.get("userId"),
                storyId: this.props.location.storyId,
                text: this.state.inputReview
            }
        );
        const {data: currUser} = await axios.get("/StoryLines/public/user/" + ReactSession.get("userId"));
        let tempReview = {
            id: resp.id,
            userId: ReactSession.get("userId"),
            first_name: currUser.first_name,
            reviewText: this.state.inputReview
        };
        let temp = <div>
            <Review review={tempReview}/>
            <hr/>
        </div>;
        this.setState({
            reviews: [...this.state.reviews, temp]
        });

    }

    handlerReviewAdded(text) {
        this.setState({
            inputReview: text.target.value
        });
    }

    componentWillMount() {
        this.setStatesOnLoad();
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div>
                    <div className="py-5 container shadow-lg">
                        {
                            this.state.userId === ReactSession.get("userId")
                                ?<div className="row justify-content-between">
                                    <div className="col-md-auto">
                                        <input type="submit" className="edit-review-button" onClick={this.handleEditing} value="Edit"/>
                                    </div>
                                    <div className="col-md-auto">
                                        <input type="image" src={deleteIco} onClick={this.handleDeleteStory} width="40px" height="40px"/>
                                    </div>
                                </div>
                                :<div></div>
                        }
                        {
                            this.state.editing
                                ?<div className="row justify-content-center">
                                    <div className= "col-md-auto">
                                        <div className="row">
                                            <input type="text" value={this.state.editTitle} onChange={this.handleTitleChange}/>
                                        </div>
                                        <div className="row">
                                            <select className="form-control" value={this.state.editCategory} onChange={this.handleCategoryChange}>
                                                <option value={"Horror"}>Horror</option>
                                                <option value={"Kids"}>Kids</option>
                                                <option value={"Romance"}>Romance</option>
                                                <option value={"Action"}>Action</option>
                                                <option value={"Comedy"}>Comedy</option>
                                                <option value={"Science Fiction"}>Science Fiction</option>
                                                <option value={"Mystery"}>Mystery</option>
                                            </select>
                                        </div>
                                        <div className="row">
                                            <input type="submit" value="Save" onClick={this.handleEditSubmit}/>
                                        </div>
                                    </div>
                                </div>
                                :<div></div>
                        }
                        <div className="row justify-content-between">
                            <div className="col-md-auto">
                                <label>{this.state.first_name} {this.state.last_name}</label>
                            </div>
                            <div className="col-md-auto">
                                <label> {this.state.post_date} </label>
                            </div>
                        </div>
                        <div className="row">
                            <h2 className="article-title">{this.state.story_title}</h2>
                        </div>
                        <div className="py-3 row">
                            {this.state.paragraphs}
                        </div>
                        <div className="py-2 row justify-content-between">
                            <div className="col-9">
                            </div>
                            <div className="col-md-auto">
                                <div className="row">
                                    <div className="col-md-auto">
                                        <a href="#"><img width="50px" height="50px"
                                                         src={likeIco}/></a>
                                    </div>
                                    <div className="col-md-auto">
                                        <a href="#"><img width="50px" height="50px"
                                                         src={dislikeIco}/></a>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-7">
                                        <label>{this.state.likes}</label>
                                    </div>
                                    <div className="col-md-auto">
                                        <label>{this.state.dislikes}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-auto">
                                <strong>{this.state.views} views</strong>
                            </div>
                        </div>
                        {
                            ReactSession.get("userType")==="critic"
                                ?<div className="row">
                                    <div className="col-md-auto">
                                        <input name="text" type="text" onChange={this.handlerReviewAdded} value={this.state.inputReview} className="form-control critic-input"/>
                                    </div>
                                    <div className="col-md-auto">
                                        <input type="image" className="btn btn-light critic-submit" src={submitIco} onClick={this.addReview}/>
                                    </div>
                                </div>
                                :<div></div>
                        }

                        <div className="row flex-fill review-section">
                            <div className="col">
                                {this.state.reviews}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}