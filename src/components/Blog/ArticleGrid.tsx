import React, { useState } from 'react';
import ArticleCard from './ArticleCard';

export interface Article {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    imageUrl: string;
    date: string;
  }
  
export interface CategoryType {
    id: string;
    name: string;
  }

interface ArticleGridProps {
  articles: Article[];
  categories: CategoryType[];
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
    const filteredArticles = selectedCategory === 'all' 
      ? articles 
      : articles.filter(article => article.category === selectedCategory);
  
    return (
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">Latest Articles</h2>
          
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#609966] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ArticleGrid;