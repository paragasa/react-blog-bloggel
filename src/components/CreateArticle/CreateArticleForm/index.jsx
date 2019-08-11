import React from 'react'
import Banner from './../../Banner';

const CreateArticleForm = ({handleInput, handleSubmit, categories, errors}) => {
    return (
        <div>
          {/* END Header */}
          <Banner
              backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`} 
              title="Write an article"
          ></Banner>
          {/* Main container */}
          <main className="main-content">
            <section className="section">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-12">
                  <ul className="list-group">
                    {
                        errors.map(error => <li key={error.message} className="list-group-item text-danger">{error.message}</li>)
                    }
                  </ul>
                    <form onSubmit={handleSubmit} className="p-30 bg-gray rounded" >
                      <div className="row">
                        <div className="form-group col-md-12 my-5">
                          <input 
                          name="image" 
                          onChange={handleInput}
                           type="file" 
                           className="form-control" />
                        </div>
                        <div className="form-group col-12 col-md-6">
                          <input 
                          onChange={handleInput} 
                          className="form-control form-control-lg" 
                          type="text" name="title" 
                          placeholder="Title" />
                        </div>
                        <div className="form-group col-12 col-md-6">
                          <select 
                          name="category" 
                          onChange={handleInput} 
                          className="form-control form-control-lg">
                            <option value>Select category</option>
                            {categories.map(category =>(<option key={category.id} value={category.id}>
                                {category.name}
                             </option>))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <textarea 
                        className="form-control form-control-lg" 
                        rows={4} placeholder="Content" 
                        name="content" 
                        onChange={handleInput}
                        defaultValue={""} />
                      </div>
                      <div className="text-center">
                        <button className="btn btn-lg btn-primary" type="submit">Create Article</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      );
}

export default CreateArticleForm;
