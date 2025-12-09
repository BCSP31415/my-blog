import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getPosts } from '../postLoader';
import GlassCard from './GlassCard';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching posts...");
        getPosts()
            .then(data => {
                console.log("Fetched posts:", data);
                setPosts(data);
            })
            .catch(err => {
                console.error("Failed to fetch posts:", err);
                setError(err.toString());
            });
    }, []);

    if (error) {
        return <div className="text-red-500 p-12 text-center">Error loading posts: {error}</div>;
    }

    return (
        <section className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post, index) => (
                    <Link to={`/post/${post.slug}`} key={post.id} className="block group">
                        <div className="h-full p-6 border-2 border-neo-black dark:border-white bg-white dark:bg-neo-black hover:bg-neo-yellow dark:hover:bg-neo-yellow transition-colors relative shadow-neo dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
                            <div className="flex justify-between items-start mb-4 font-mono text-xs text-gray-500 dark:text-gray-400 uppercase group-hover:text-neo-black">
                                <span>{post.category}</span>
                                <span>{post.date}</span>
                            </div>
                            <h3 className="text-2xl font-serif font-bold mb-3 text-neo-black dark:text-neo-white group-hover:text-neo-black group-hover:underline decoration-2 underline-offset-4">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-serif group-hover:text-neo-black">
                                {post.excerpt}
                            </p>
                            <ArrowUpRight className="absolute top-4 right-4 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-neo-black" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default BlogList;
