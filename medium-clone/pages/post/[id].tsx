import React from 'react';
import Header from '../../components/Header';
import { Post } from '../../types';

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  return (
    <main>
      <Header />

      <hr></hr>
      <img className="h-60 object-cover mx-auto mt-5" src={post.image} alt="" />

      <article className="max-w-3xl mx-auto p-5">
        <hr></hr>
        <h1 className="text-3xl mt-10 mb-3">{post.name}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          by {post.author}
        </h2>

        <div className="py-10">
          <p className="text-2xl">{post.content}</p>
        </div>
      </article>
    </main>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/posts');
  const { posts } = await res.json();

  const paths = posts.map((post: Post) => ({
    params: {
      id: post.id.toString(),
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: any) => {
  const res = await fetch('http://localhost:3000/api/posts');
  const { posts } = await res.json();

  const { id } = params;

  const post = posts.find((p: Post) => p.id.toString() === id);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // after 60s it'll update the old cached version
  };
};

export default Post;
