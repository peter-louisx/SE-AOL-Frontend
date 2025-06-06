import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface Article {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    imageUrl: string;
    date: string;
  }

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    const navigate = useNavigate();
  
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div 
            className="h-48 overflow-hidden cursor-pointer"
            onClick={() => navigate(`/blog/${article.id}`)}
        >
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="mb-1">
            <span className="text-xs font-medium bg-[#EDF1D6] text-[#40513B] px-2 py-1 rounded-full">
              {article.category}
            </span>
            <span className="text-xs text-gray-500 ml-2">{article.date}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{article.title}</h3>
          <p className="text-gray-600 text-sm flex-grow">{article.excerpt}</p>
          <button 
            onClick={() => navigate(`/blog/${article.id}`)}
            className="mt-4 text-[green-700] font-medium text-sm hover:text-green-800 transition-colors flex items-center cursor-pointer"
            >
            Read More
            </button>
        </div>
      </div>
    );
  };
  
  export default ArticleCard;