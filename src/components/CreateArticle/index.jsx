
import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw } from 'draft-js';
import CreateArticleForm from './CreateArticleForm'
import draftToHtml from 'draftjs-to-html';


// HANDLE CREATIONG AND EDITNG
class CreateArticle extends React.Component {
    constructor() {
      super();
      this.state={
        categories: [],
        errors: [],
        editing: false,
        article: null,
        title: '',
        image: null,
        content: EditorState.createEmpty(),
        category: null,
      }
    }
    async componentWillMount(){
      //API: GET to Categories 
      const categories = await this.props.getArticleCategories();
      
      if(this.props.match.params.slug){
        //find matching article
        const article = this.props.articles.find(article=> article.slug ===this.props.match.params.slug);
        //redirect user if loading again
        if(!article){
          this.props.history.push('/user/articles');
          return;
        }
        this.setState({
          title: article.title,
          category: article.category_id,
          content: article.content,
          editing: true,
          article: article,
          categories: categories,
        });
      }else{
        this.setState({
          categories: categories,
        });
      }
    }
      /**
   * Alter state from inputs
   */
    handleInput = (event) => {
      
      this.setState({
        [event.target.name] : event.target.type === 'file'? event.target.files[0]: event.target.value  //append input object
      })
    }

    handleEditorState=(editorState)=>{
      this.setState({
        content:editorState,
      })
    }

    handleSubmit = async(event) => {
 
      event.preventDefault();
 
      try{
        const article= await this.props.createArticle({
          title: this.state.title,
          content: draftToHtml(convertToRaw(this.state.content.getCurrentContent())),
          category: this.state.category,
          image: this.state.image,
        }, this.props.token)
        this.props.NotificationService.success('Article Posted!');
        this.props.history.push("/")
      }catch(errors){
        this.props.NotificationService.error('Something went wrong.');
        this.setState({
          errors: errors
        })
      }
    }


    updateArticle= async(event) => {
      //update service
      event.preventDefault();
      //pass update objct and psuh
      try{
        await this.props.updateArticle({
          title: this.state.title,
          image:this.state.image,
          content: this.state.content,
          category: this.state.category,
        }, this.state.article, this.props.token)
        this.props.NotificationService.success('Article Updated');
        this.props.history.push("/");
      }catch(errors){
        this.props.NotificationService.error('Something went wrong.');
        this.setState({errors})
      }

    }
    render(){
      return(
    
              <CreateArticleForm
              handleInput={this.handleInput}
              handleSubmit={this.handleSubmit}
              categories = {this.state.categories}
              errors = {this.state.errors}
              editing={this.state.editing}
              article={this.state.article}
              title={this.state.title}
              category={this.state.category}
              content={this.state.content}
              updateArticle={this.updateArticle}
              handleEditorState={this.handleEditorState}
              />
       
      )

    }
}
CreateArticle.propTypes = {
  getArticleCategories: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  updateArticle: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }).isRequired,
  }).isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    created_at: PropTypes.string.isRequired,
  })),
  NotificationService: PropTypes.shape({
    success: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
  }).isRequired,
};

CreateArticle.defaultProps = {
  updateArticle: () => {},
  articles: [],
};
export default CreateArticle;