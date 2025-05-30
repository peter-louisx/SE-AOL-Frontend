import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface TrendingArticle {
    id: number;
    title: string;
    imageUrl: string;
  }

interface TrendingArticlesProps {
  articles: TrendingArticle[];
}

const TrendingArticles: React.FC<TrendingArticlesProps> = ({ articles }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#DCE8B0]  p-6 rounded-xl">
      <h3 className="text-xl font-semibold mb-4 text-black">Trending Articles</h3>
      <div className="space-y-4">
        {articles.map(article => (
          <div 
            key={article.id}
            className="flex items-center space-x-3 cursor-pointer hover:bg-green-100 p-2 rounded-lg transition-colors"
            onClick={() => navigate(`/blog/${article.id}`)}
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-16 h-16 object-cover rounded"
            />
            <h4 className="text-sm font-medium text-gray-800">{article.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingArticles