import React, { Component } from 'react'
import { userInfo } from '../../../services/user-info'
import { Link } from 'react-router-dom'
import { route } from '../../../route/route'
import { articleApi } from '../../../api/article'

export class CommentForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            body: null
        };
    }
    doSubmit = () => {
        const {body} = this.state;
        const {slug, doPost} = this.props;
        if(body == null) return;
        articleApi.addComment(slug,body).then((comment) => {
           if(comment) {
               this.setState({body: null});
               doPost(comment);
           }
        });
    }
    render () {
        let user = userInfo.get();
        if(user == null) {
            return <p style={{display: 'inherit'}}>
                <Link to={route('login')}>Sign in</Link> or <Link to={route('register')}>sign up</Link> to add comments on this article.
            </p>;
        }
        return (
            <form className="card comment-form" onSubmit={e => {
                e.preventDefault();
                this.doSubmit();
            }}>
                <div className="card-block">
                    <textarea className="form-control" placeholder="Write a comment..." rows={3}
                              value={this.state.body === null ? '' : this.state.body}
                              onChange={e => this.setState({body: e.target.value})}
                    />
                </div>
                <div className="card-footer">
                    <img src={user.image} className="comment-author-img" />
                    <button type="submit" className="btn btn-sm btn-primary">
                        Post Comment
                    </button>
                </div>
            </form>
        );
    }
}