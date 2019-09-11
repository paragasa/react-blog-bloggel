import React from 'react';
import Banner from './../../Banner';
import Article from './../../Article';

const Articles= ({articles, deleteArticle,editArticle, nextUrl, prevUrl, handlePagination}) =>{
    return (
        <div>
        <Banner 
            backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/hero.jpg`}
            title="My Peronsal Posts"
            subTitle="Timeline of my greatest blogs."
        >
        </Banner>
        <main className="main-content bg-gray">
        <div className="row">
            <div className="col-12 col-lg-6 offset-lg-3">
                {articles && articles.map(article => (
                    <div key={article._id}>
                    <Article article = {article} />
                    <div className="text-center">
                        <button onClick={()=>editArticle(article)}  className="btn btn-info">Edit Article</button>
                        <button onClick={()=>deleteArticle(article._id)} className="btn btn-danger">
                            Delete Post
                        </button>
                    </div>
                    <hr/>
                    </div>  
                ))}
                <nav className="flexbox mt-15 mb-30">
                    <a onClick={()=>handlePagination(prevUrl)} className={`btn btn-white ${prevUrl?'': 'disabled'}`} >Newer
                        <i className="ti-arrow-left fs-9 ml-4" />
                    </a>
                    <a onClick={()=>handlePagination(nextUrl)} className={`btn btn-white $ls{nextUrl?'': 'disabled'}`} >
                        <i className="ti-arrow-right fs-9 mr-4" /> Older
                    </a>
                    
                </nav>
                </div>
            </div>
        </main>
        
       
        </div>
    );
}
export default Articles;