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
    <div className="bg-[#DCE8B0] p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">
        Trending Articles
      </h3>
      <div className="space-y-4">
        {articles.map(article => (
          <div
            key={article.id}
            className="flex items-center space-x-3 cursor-pointer hover:bg-green-50 p-2 rounded-lg transition-colors duration-150 ease-in-out" // Ganti hover bg dan tambahkan transisi
            onClick={() => navigate(`/blog/${article.id}`)}
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-16 h-16 object-cover rounded-md" 
            />
            <div className="flex-1 min-w-0">
              <h4 
                className="text-sm font-medium text-gray-800 truncate"
                title={article.title}
              >
                {article.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingArticles;