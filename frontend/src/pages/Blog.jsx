import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  { id: 1, title: 'The Future of Luxury Real Estate in 2024', date: 'Oct 15, 2023', excerpt: 'Explore the emerging trends shaping the ultra-luxury property market.', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80' },
  { id: 2, title: 'Top 5 Up-and-Coming Neighborhoods', date: 'Oct 10, 2023', excerpt: 'Discover the hidden gems where property values are expected to soar.', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
  { id: 3, title: 'Smart Home Automation Integration', date: 'Oct 05, 2023', excerpt: 'How technology is redefining the modern luxury living experience.', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80' },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-24 px-4">
      <Helmet><title>Blog | KeyStone Homes</title></Helmet>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif font-bold text-white mb-12 text-center">Market Insights</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map(post => (
            <article key={post.id} className="glassmorphism rounded-2xl overflow-hidden hover:-translate-y-2 transition duration-300">
              <img src={post.img} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-gold-500 text-sm mb-2">{post.date}</p>
                <h2 className="text-2xl font-serif text-white mb-4">{post.title}</h2>
                <p className="text-gray-400 mb-6">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="text-gold-500 font-bold hover:underline">Read More &rarr;</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
