import React, { Component } from 'react'
import { Cols } from '../../../utils/Cols'
import { articleApi } from '../../../api/article'
import { route } from '../../../route/route'
import { Obj } from '../../../utils/object'

export class Editor extends Component {
    constructor (props) {
        super(props);
        this.state = {
            article: null,
            errors: null
        };
        if(props.match.params.slug) {
            articleApi.getArticle(props.match.params.slug).then(({article}) => this.setState({article}));
        }
    }
    handleChangeInput (name, value) {
        const {article} = this.state;
        this.setState({
            article: {
                ...article,
                [name]: value
            }
        });
    }
    doSubmit() {
        const {history} = this.props;
        const {article} = this.state;
        const {slug} = this.props.match.params;
        if (article == null) return;
        (slug ? articleApi.update(article) : articleApi.create(article)).then(({errors, article}) => {
            if(article) {
                history.push(route('article',{slug: article.slug}));
            }
            if(errors) {
                this.setState({errors});
            }
        });
    }
    render () {
        const {article, errors} = this.state;
        return (
            <div className="editor-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-xs-12">
                            {errors && (
                                <ul className="error-messages">
                                    <li>{Obj.mapValueToList(errors, (list, key) => (
                                        key + list
                                    ))}</li>
                                </ul>
                            )}
                            <form onSubmit={e => {
                                e.preventDefault();
                                this.doSubmit();
                            }}>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input type="text" className="form-control form-control-lg" placeholder="Article Title"
                                               value={article == null || article.title == null ? '' : article.title}
                                               onChange={e => this.handleChangeInput('title', e.target.value)}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input type="text" className="form-control" placeholder="What's this article about?"
                                               value={article == null || article.description == null ? '' : article.description}
                                               onChange={e  => this.handleChangeInput('description', e.target.value)}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <textarea className="form-control" rows={8} placeholder="Write your article (in markdown)"
                                              value={article == null || article.body == null ? '' : article.body}
                                              onChange={e => this.handleChangeInput('body', e.target.value)}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input type="text" className="form-control" placeholder="Enter tags"
                                               onKeyDown={e => {
                                                   if(e.keyCode === 13) {
                                                       let v = e.target.value;
                                                       if(v && v.length > 0) {
                                                           let value = article == null || article.tagList == null ? [v] : [...article.tagList, v];
                                                           this.handleChangeInput('tagList', value);
                                                           e.target.value = '';
                                                           e.preventDefault();
                                                       }
                                                   }
                                               }}
                                        />
                                        <div className="tag-list">
                                            {article != null && article.tagList != null && (
                                                article.tagList.map((v, i) => {
                                                    return (
                                                        <span className="tag-default tag-pill" key={i}>
                                                            <i
                                                                className="ion-close-round"
                                                                onClick={() => this.handleChangeInput('tagList',Cols.remove1(article.tagList, v))}
                                                            >
                                                                &nbsp;&nbsp; {v}
                                                            </i>
                                                        </span>
                                                    );
                                                })

                                            )}
                                        </div>
                                    </fieldset>
                                    <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                                        Publish Article
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}