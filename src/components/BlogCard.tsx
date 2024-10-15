import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ id, title, content }: {id: number, title: string, content: string}) => {
  return (
    <Link to={`/blog/${id}`} className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
      <p className="font-normal text-gray-700">{content.slice(0, 100)}...</p>
    </Link>
  );
};

export default BlogCard;
