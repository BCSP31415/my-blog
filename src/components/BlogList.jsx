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
                        <GlassCard className="h-full p-6">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{post.category}</span>
                                <span className="text-xs text-gray-600">{post.date}</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors flex items-center gap-2">
                                {post.title}
                                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {post.excerpt}
                            </p>
                        </GlassCard>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default BlogList;
