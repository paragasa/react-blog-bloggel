import { validateAll } from 'indicative';
import Axios from 'axios';


import config from './../config'

export default class AuthService {

    async registerUser(data){
      const rules = {
        name: 'required|string',
        email: 'required|email',
        password: 'required|string|min:6|confirmed',
      };

      const messages = {
        required: 'This {{field}} is required',
        'email.email': 'Invalid email',
        'password.confirmed': 'The password confirmation does not match'
      };

      try{
        await validateAll(data,rules, messages)
        // const response = await Axios.post(`https://my-json-server.typicode.com/paragasa/demo/register`,{
        const response = await Axios.post(`${config.apiUrl}/auth/register`,{
              name: data.name,
              email: data.email,
              password: data.password
           });

           return response.data.data;

      }catch(errors){
        const formatedErrors = {}
        //SERVER ISUE
        if(errors.response && errors.response.status === 422){
            formatedErrors['email'] = errors.response.data['email'][0]
            return Promise.reject(formatedErrors);
        }
        //catch error of states, form validation error
        
        errors.forEach((error) => formatedErrors[error.field] = error.message);
        return Promise.reject(formatedErrors);
      }
    }
    async loginUser(data){
      const rules = {
        email: 'required|email',
        password: 'required|string',
      };

      const messages = {
        required: 'This {{field}} is required.',
        'email.email': 'Invalid email.',
      };
      try{
        await validateAll(data,rules, messages)
        
        const response = await Axios.post(`${config.apiUrl}/auth/login`,{
              email: data.email,
              password: data.password
           });
        return response.data.data;

      }catch(errors){
        const formatedErrors = {}
        //SERVER ISUE
       
        if(errors.response && errors.response.status === 401){
            formatedErrors['email'] = 'Invalid email or password.'
            return Promise.reject(formatedErrors);
        }
        //catch error of states, form validation error
        //console.log(errors)
        errors.forEach((error) => formatedErrors[error.field] = error.message);
        return Promise.reject(formatedErrors);
      }
    }
}