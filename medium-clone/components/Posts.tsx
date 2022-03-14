import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import React from 'react';
import { Post } from '../types';

interface Props {
  posts: [Post];
}

function Posts({ posts }: Props) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3
    md:gap-6 p-2 md:p-6"
    >
      {posts.map((post) => (
        <Link key={post.id} href={`/post/${post.id}`}>
          <div className="border rounded-lg group cursor-pointer content-center p-2">
            <div className="flex justify-center p-2">
              <img
                className="h-60 object-contain
              group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={post.image}
                alt=""
              />
            </div>
            <div className="justify-between p-2">
              <p className="text-lg font-bold">{post.name}</p>
              <p>Author: {post.author}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Posts;
