import React from 'react';
import Header from '../components/Blog/Header';
import Hero from '../components/Blog/Hero';
import ArticleGrid from '../components/Blog/ArticleGrid';
import Footer from '../components/Blog/Footer';
import { articles, categories } from '../data/articles';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* <Header /> */}
      <Hero />
      <main className="flex-grow">
        <ArticleGrid articles={articles} categories={categories} />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Blog;