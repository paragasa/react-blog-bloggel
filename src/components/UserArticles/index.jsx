import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Articles from './Articles';

class UserArticles extends Component {
    constructor(){
        super();
        this.state={
            articles: {},
        }
    }

    async componentWillMount(){
     //send a get to articles
        const articles = await this.props.getUserArticles(this.props.token);

        this.setState({
            articles:articles,
        });
        //update app's article state
        this.props.setArticles(articles.data);
    }

    handlePagination= async(url)=>{
        //send a get to articles, next urls
        const articles= await this.props.getUserArticles(this.props.token, url);

        this.setState({
            articles:articles,
        });
        //update app's article state
        this.props.setArticles(articles.data);
    }

    editArticle =(article) =>{
        this.props.history.push(`/article/edit/${article.slug}`)
    }

    deleteArticle= async(id) => {
        await this.props.deleteArticle(id,this.props.token);

        const articles = this.state.articles.data.filter(article => article.id !== id);
        
        this.setState({
            articles: {
                data: articles,
            },
        });
        
    }

    render(){
        return(
            <Articles
                articles ={this.state.articles.data}
                nextUrl={this.state.articles.next_page_url}
                prevUrl ={this.state.articles.prev_page_url}
                handlePagination={this.handlePagination}
                deleteArticle = {this.deleteArticle}
                editArticle={this.editArticle}
            />

        );
    }
}
UserArticles.propTypes = {
    getUserArticles: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    setArticles: PropTypes.func.isRequired,
    deleteArticle: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
};
export default UserArticles;