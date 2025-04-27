import React from 'react';
import { useParams } from 'react-router-dom';
import { articles, trendingArticles } from '../data/articles';
import Header from '../components/Blog/Header';
import Footer from '../components/Blog/Footer';
import TrendingArticles from '../components/Blog/TrendingArticles';

const BlogDetail: React.FC = () => {
    const { id } = useParams();
    const article = articles.find(a => a.id === Number(id));
  
    if (!article) {
      return <div>Article not found</div>;
    }
  
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* <Header /> */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <article className="lg:col-span-2">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
              />
              
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                <div className="mb-4">
                  <span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500 ml-3">{article.date}</span>
                  {article.readingTime && (
                    <span className="text-sm text-gray-500 ml-3">· {article.readingTime}</span>
                  )}
                </div>
  
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {article.title}
                </h1>
  
                {article.author && (
                  <p className="text-gray-600 mb-6">By {article.author}</p>
                )}
  
                <div className="prose max-w-none">
                  {article.content?.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </article>
  
            <aside className="lg:col-span-1">
              <TrendingArticles articles={trendingArticles} />
            </aside>
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    );
  };
  
  export default BlogDetail;