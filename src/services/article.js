import Axios from 'axios';
import {validateAll} from 'indicative'
import config from './../config';

export default class ArticleServices {

    //Categories for Create Article
    async getArticleCategories(){
        let categories = JSON.parse(localStorage.getItem('categories'));
        
        if(categories){
            return categories;
        }else{
            categories = await Axios.get(`${config.apiUrl}/categories`);
            localStorage.setItem('categories', JSON.stringify(categories.data.categories)); //store cats
        }

        return categories.data.categories;
    }

    //value of this would be boud to this class, pass class if you want it to have access to same data
    createArticle = async(data, token) =>{
        try {
            const rules ={
                title: 'required',
                content: 'required' ,
                category: 'required',
            }

            const messages ={
                required: 'The {{field}} is required'
            }
            await validateAll(data, rules, messages)

        } catch (errors) {
            //errors from server
            if(errors.response){ 
                return Promise.reject(errors.response.data); 
            }
            
            return Promise.reject(errors);
        }
       
        const image = await this.uploadToCloudinary(data.image);

        try{
            const response = await Axios.post(`${config.apiUrl}/articles`,{
            title: data.title,
            content: data.content,
            category_id: data.category,
            imageUrl: image.secure_url,
        },{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        
        return response.data;
        }catch(errors){
            return errors.response.data;
        }
        //send response
        
    }

    async uploadToCloudinary(image){
        const form = new FormData();

        form.append('file' , image);

        form.append('upload_preset', 'sf1li94r');

        const response = await Axios.post('https://api.cloudinary.com/v1_1/dazp4u2d6/image/upload', form)

        //console.log(response)
        return response.data;
    }

    getArticles = async(url=`${config.apiUrl}/articles`) => {
        const response = await Axios.get(url)

        return response.data.data;
    }

    getArticle = async(slug)=>{
        const response = await Axios.get(`${config.apiUrl}/article/${slug}`);
        return response.data.data;
    }

}