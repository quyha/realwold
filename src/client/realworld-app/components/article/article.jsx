import React, { Component, Fragment } from 'react'
import { articleApi } from '../../../api/article';
import { Link } from 'react-router-dom';
import { route } from '../../../route/route';
import { FollowButton } from '../common/follow-button'
import { FavoriteButton } from '../common/favorite-button'
import { CommentForm } from './comment-form'
import mark from 'marked';
import { Cols } from '../../../utils/Cols'
import { userInfo } from '../../../services/user-info'

export class Article extends Component {
    constructor (props) {
        super(props);
        this.state = {
            article: null,
            comments: null
        };
        articleApi.getArticle(this.props.match.params.slug).then(({errors, article}) => {
            if(article) {
                this.setState({article});
            }
        });
        articleApi.getComments(this.props.match.params.slug).then(({comments}) => this.setState({comments}));
    }
    deleteComment (slug, id, comments) {
        articleApi.deleteComment(slug, id).then((error) => error !== null ? this.setState({comments}) : null);
    }
    deleteArticle () {
        const {slug} = this.props.match.params;
        const {history} = this.props;
        const {username} = this.state.article.author;
        articleApi.delete(slug).then(history.push(route('profile',{username: username})));
    }
    render() {
        const {article, comments} = this.state;
        let user = userInfo.get();
        return (article == null ? null :
            <div className="article-page">
                <div className="banner">
                    <div className="container">
                        <h1>{article.title}</h1>
                        <div className="article-meta">
                            <a><img src={article.image} /></a>
                            <div className="info">
                                <Link to={route('profile',{username: article.author.username})} className="author">{article.author.username}</Link>
                                <span className="date">{new Date(article.updatedAt).toLocaleString()}</span>
                            </div>
                            {(user == null || user.username !== article.author.username) ? (
                                <Fragment>
                                    <FollowButton
                                        username={article.author.username}
                                        following={article.author.following}
                                        onChange={following => this.setState({article:{...article, author: {...article.author, following}}})}
                                    />
                                    &nbsp;&nbsp;
                                    <FavoriteButton
                                    count={article.favoritesCount}
                                    favorited={article.favorited}
                                    slug={article.slug}
                                    onChange={(favorited, favoritesCount) => this.setState({article:{...article, favorited, favoritesCount}})}
                                    label
                                    />
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <Link className="btn btn-outline-secondary btn-sm" to={route('editor.edit',{slug: article.slug})}>
                                        <i className="ion-edit"/> Edit Article
                                    </Link>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => this.deleteArticle()}
                                    >
                                        <i className="ion-trash-a"/> Delete Article
                                    </button>
                                </Fragment>
                            )}

                        </div>
                    </div>
                </div>
                <div className="container page">
                    <div className="row article-content">
                        <div className="col-md-12">
                            <div dangerouslySetInnerHTML={{__html: mark(article.body)}} />
                        </div>
                    </div>
                    <hr />

                    <div className="row">
                        <div className="col-xs-12 col-md-8 offset-md-2">
                            <CommentForm
                                slug={article.slug}
                                doPost={({comment}) => this.setState({comments: [comment, ...comments]})}
                            />
                            {comments && comments.length > 0 && (
                                comments.map(comment => {
                                   return (
                                       <div className="card" key={comment.id}>
                                           <div className="card-block">
                                               <p className="card-text">{comment.body}</p>
                                           </div>
                                           <div className="card-footer">
                                               <a className="comment-author">
                                                   <img src={comment.author.image} className="comment-author-img" />
                                               </a>
                                               &nbsp;
                                               <a className="comment-author">{comment.author.username}</a>
                                               <span className="date-posted">{new Date(comment.updatedAt).toLocaleString()}</span>
                                               {userInfo.get() !== null && userInfo.get() !== article.author.username &&
                                                   <span className="mod-options">
                                                       <i className="ion-trash-a" onClick={() => this.deleteComment(article.slug, comment.id, Cols.remove1(comments, comment))}/>
                                                   </span>
                                               }
                                           </div>
                                       </div>
                                   );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}