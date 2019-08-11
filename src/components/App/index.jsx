import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter , Route, withRouter} from 'react-router-dom';

import Auth from '../Auth';
import Locked from '../Locked';
import Welcome from '../Welcome';
import Login from '../Login';
import SignUp from '../SignUp';
import CreateArticle from '../CreateArticle';
import SingleArticle from '../SingleArticle';
import Navbar from '../Navbar';
import Footer from '../Footer';

import PropTypes from 'prop-types';
//import { Test } from './App.styles';

class App extends React.Component{

  constructor(){
      super();

      this.state = {
          authUser:null,
          articles:[],
      }
      this.setAuthUser= this.setAuthUser.bind(this)
  }

 /**
  * Component mount to get user and set auth user as well 
  */
 componentWillMount(){
    const user = localStorage.getItem('user');
    if(user){
        this.setState({
            authUser: JSON.parse(user)
        })
    }
}

  setAuthUser(authUser){
      this.setState({
          authUser
      },() => {
        localStorage.setItem('user', JSON.stringify(authUser));
        this.props.history.push("/");
      })
  }

  //Welcome page sends Get for articles, set list articles to app state to optimeize req
  setArticles =(articles)=>{
    this.setState({
      articles:articles,
    });
  }

  //logout
  removeAuthUser= () =>{
    localStorage.removeItem('user');
    this.setState({
      authUser:null,
    })
  }

  render(){
      const {location} = this.props; //withRouter
      return(
          <div>
              {/* NAVBAR */}
              {  
                  location.pathname !== '/login' && location.pathname !== '/register' &&
                  <Navbar authUser={this.state.authUser}></Navbar>
               }

               {/* WELCOME */}
              <Route 
                  exact path="/" 
                  render={
                  props => <Welcome {...props} 
                  getArticles = {this.props.ArticleService.getArticles}
                  setArticles={this.setArticles}
                />}
                    
                />
             {/* CREATE ARTICLE , NEW AUTH METHOD*/}
             
             <Auth 
                path="/articles/create" 
                component ={CreateArticle}
                props={{
                    getArticleCategories: this.props.ArticleService.getArticleCategories,
                    createArticle : this.props.ArticleService.createArticle,
                    token: this.state.authUser? this.state.authUser.token: null
                }}
                isAuthenticated ={ this.state.authUser !==null}
             />
              {/* OLD ROUTE : unauthenticated
              <Route  
                path="/articles/create" 
                render= {props => 
                <CreateArticle 
                  {...props} 
                    getArticleCategories = {this.props.ArticleService.getArticleCategories}
                    createArticle = {this.props.ArticleService.createArticle}
                    token={this.state.authUser.token}
                    
                  />
               }/> */}

              {/* LOGIN */}
              <Locked 
                path="/login"
                component={Login}
                props={{
                  loginUser: this.props.AuthService.loginUser,
                  setAuthUser: this.setAuthUser
                }}
                //return if auth already, will redirect to page if true
                isAuthenticated={this.state.authUser!==null}
              />

              {/* OLD ROUTE TO LOGIN
               <Route 
                path="/login" 
                render={
                props => <Login 
                {...props} 
                loginUser={this.props.AuthService.loginUser} 
                setAuthUser={this.setAuthUser}/>
                }/> */}

               {/* Pass registerUser from auth to signup */}
              <Locked 
                path="/register"
                component={SignUp}
                props={{
                  registerUser: this.props.AuthService.registerUser,
                  setAuthUser: this.setAuthUser
                }}
                //return if auth already, will redirect to page if true
                isAuthenticated={this.state.authUser!==null}
              />

              {/* OLD ROUTE TO REGISTER
              <Route 
                path="/register" render={
                props => <SignUp {...props} 
                registerUser={this.props.AuthService.registerUser} 
                setAuthUser={this.setAuthUser}/>
                }/> */}
              
              {/* SINGLE ARTICLE  */}
              <Route path="/article/:slug" 
                render={
                  props => (
                    <SingleArticle
                      {...props}
                      getArticle= {this.props.ArticleService.getArticle}
                      articles = {this.state.articles}
                    />
                  )
                }
              />

              {/* FOOTER */}
              {  
                  location.pathname !== '/login' &&  location.pathname !== '/register' &&
                  <Footer></Footer>
               }   
          </div>
      )}
}

App.propTypes = {
  // bla: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
      push: PropTypes.func.isRequired,
  }),
  AuthService:PropTypes.objectOf(PropTypes.func).isRequired,
  AticleService: PropTypes.shape({
    getArticlegories: PropTypes.PropTypes.func.isRequired,
    getArticles: PropTypes.PropTypes.func.isRequired,
    getArticle: PropTypes.PropTypes.func.isRequired,
  }),
};

App.defaultProps = {
  // bla: 'test',
};

export default App;
