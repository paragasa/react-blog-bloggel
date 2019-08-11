
import React from 'react';


import CreateArticleForm from './CreateArticleForm'


class CreateArticle extends React.Component {
    constructor() {
      super();
      this.state={
        title: '',
        image: null,
        content: '',
        category: null,
        categories: [],
        errors: [],
        
      }
    }
    async componentWillMount(){
      //API: GET to Categories 
      const categories = await this.props.getArticleCategories();
      console.log(categories)
      this.setState({
        categories: categories,
      });
      
    }
      /**
   * Alter state from inputs
   */
    handleInput = (event) => {
      
      this.setState({
        [event.target.name] : event.target.type === 'file'? event.target.files[0]: event.target.value  //append input object
      })
    }

    handleSubmit = async(event) => {
      event.preventDefault();

      try{
        const article= await this.props.createArticle(this.state, this.props.token)
        this.props.history.push("/")
      }catch(errors){
        
        this.setState({
          errors: errors
        })
      }
    }

    render(){
      return(
    
              <CreateArticleForm
              handleInput={this.handleInput}
              handleSubmit={this.handleSubmit}
              categories = {this.state.categories}
              errors = {this.state.errors}
              />
       
      )

    }
}

export default CreateArticle;