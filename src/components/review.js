import React from "react";
import "../App.css";
import "../bootstrap/css/bootstrap.min.css";
import "../css/story.css";
import "../css/common.css";
import deleteIco from "../graphics/icons/delete.png";
import {Link} from "react-router-dom";
import {ReactSession} from "react-client-session";
import axios from "axios";

export class Review extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            reviewId: "",
            editText: "",
            userId: "",
            firstName: "",
            reviewText: "",
            storyId: "",
            editing: false
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleEditing = this.handleEditing.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleEditing()
    {
        this.setState({editing: !this.state.editing});
    }

    handleTextChange(e)
    {
        this.setState({editText: e.target.value});
    }

    async handleEditSubmit()
    {
        console.log(this.state.reviewId);
        console.log(this.state.editText);
        let {status: resp} = await axios.put("/StoryLines/public/editreview/" + this.state.reviewId,{
            text: this.state.editText
        });
        this.setState({reviewText: this.state.editText});
        this.setState({editing: false});
    }

    async handleDelete()
    {
        this.setState({reviewText: "[REMOVED]"});
        let {status: resp} = await axios.delete("/StoryLines/public/deletereview/" + this.state.reviewId);
    }

    componentDidMount() {
        this.setState({reviewId: this.props.review.id});
        this.setState({editText: this.props.review.reviewText});
        this.setState({userId: this.props.review.userId});
        this.setState({reviewText: this.props.review.reviewText});
        this.setState({firstName: this.props.review.first_name});
    }

    render()
    {
        return(
            <div className="row review-row">
                <div className="col-md-auto review-col">
                    <div className="row review-author-row">
                        <div className="col-md-auto">
                            <Link to={{pathname: "/profile", userId: this.state.userId}} className={"link-style"}><h3>{this.state.firstName}</h3>
                            </Link>
                        </div>
                    </div>
                    <div className="row review-comment-row">
                        <div className="col-md-auto">
                            <p>{this.state.reviewText}</p>
                        </div>
                    </div>
                </div>
                {
                    this.props.review.userId === ReactSession.get("userId")
                        ?<div className="row edit-row justify-content-end">
                            <div className="col-md-auto">
                                <input type="submit" className="edit-review-button" value="edit" onClick={this.handleEditing}/>
                            </div>
                            <div className={"col-md-auto"}>
                                <input type="image" src={deleteIco} onClick={this.handleDelete} width="25px" height="25px"/>
                            </div>
                        </div>
                        :<div></div>
                }
                {
                    this.state.editing
                        ?<div className="row">
                            <div className="col-md-auto">
                                <input type="text" className="form-control" value={this.state.editText} onChange={this.handleTextChange}/>
                            </div>
                            <div className="col-md-auto">
                                <input type="submit" className="edit-review-button" value="Save" onClick={this.handleEditSubmit}/>
                            </div>
                        </div>
                        :<div></div>
                }
            </div>
        );
    }
}