import React from 'react';
import Banner from './../../Banner';
import Article from './../../Article';

const Articles= ({articles, nextUrl, prevUrl, handlePagination}) =>{
    return (
        <div>
        <Banner 
            backgroundImage="url(assets/img/hero.jpg"
            title="Bloggel"
            subTitle="Check out some of the latest tech blogs."
        >
        </Banner>
        <main className="main-content bg-gray">
        <div className="row">
            <div className="col-12 col-lg-6 offset-lg-3">
                {articles && articles.map(article => (
                    <div key={article.id}>
                    <Article article = {article} />
                    <hr/>
                    </div>  
                ))}
                <nav className="flexbox mt-15 mb-50">
                     <a onClick={()=>handlePagination(prevUrl)} className={`btn btn-white ${prevUrl?'': 'disabled'}`} href="#">Older
                        <i className="ti-arrow-left fs-9 ml-4" />
                    </a>
                    <a onClick={()=>handlePagination(nextUrl)} className={`btn btn-white $ls{nextUrl?'': 'disabled'}`} >
                        <i className="ti-arrow-right fs-9 mr-4" /> Newer
                    </a>
                    
                </nav>
                </div>
            </div>
        </main>
        
       
        </div>
    );
}
export default Articles;