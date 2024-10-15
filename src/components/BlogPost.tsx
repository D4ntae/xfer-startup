import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from './Navbar';

interface Blog {
    id: number,
    title: string,
    content: string
}

export const BlogPost = () => {
  const { id } = useParams(); // Get the blog post ID from the URL
  const [post, setPost] = useState<Blog | null>(null);

  useEffect(() => {
    // Fetch the individual blog post by ID
    fetch(`http://localhost:3000/api/blog/post/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((error) => console.error('Error fetching the blog post:', error));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto w-screen">
      <Navbar />
      <h1 className="mb-4 mt-8 text-center text-4xl font-bold">{post.title}</h1>
      <p className="text-center text-lg text-gray-700">{post.content}</p>
    </div>
  );
};
