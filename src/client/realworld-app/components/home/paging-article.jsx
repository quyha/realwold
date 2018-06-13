import React, {Component,Fragment} from 'react';
import {ArticleList} from "./article-list";
import {Pagination} from "../common/pagination";
import {articleApi} from "../../../api/article";

export class PagingArticle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            articlesCount: 0
        };
    }
    render() {
        const {page, articlesCount} = this.state;
        const {api} = this.props;
        return(
            <Fragment>
                <ArticleList
                    key={page}
                    api={() => api(page).then(({articles, articlesCount}) => {
                        if(this.state.articlesCount === 0) {
                            this.setState({articlesCount});
                        }
                        return articles;
                    })}
                />
                <Pagination
                    total={articlesCount}
                    onChangePage={(page) => this.setState({page})}
                />
            </Fragment>
        );
    }
}