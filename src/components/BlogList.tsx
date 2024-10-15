import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';

interface Blog {
    id: number,
    title: string,
    content: string
}

export const BlogList = () => {
  const [posts, setPosts] = useState<Blog[]>([]);

  useEffect(() => {
    // Fetch all blog posts from the API
    fetch('http://localhost:3000/api/blog/all')
      .then((res) => res.json())
      .then((data) => setPosts([...data]))
      .catch((error) => console.error('Error fetching blog posts:', error));
  }, []);

  return (
    <div className="container mx-auto mt-8 w-screen items-center justify-center">
      <h1 className="mb-8 text-center text-4xl font-bold">All Blog Posts</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} id={post.id} title={post.title} content={post.content} />
        ))}
      </div>
    </div>
  );
};

