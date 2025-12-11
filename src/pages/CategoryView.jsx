import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FolderOpen } from 'lucide-react';
import { getPosts } from '../postLoader';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';

const CategoryView = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPosts()
            .then(allPosts => {
                const filtered = allPosts.filter(post =>
                    post.category === decodeURIComponent(category)
                );
                setPosts(filtered);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load posts:', err);
                setLoading(false);
            });
    }, [category]);

    return (
        <Layout>
            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => navigate('/categories')}
                className="fixed top-20 left-4 z-40 flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 shadow-lg hover:bg-white/20 dark:hover:bg-black/20 transition-all"
                aria-label="Back to categories"
            >
                <ArrowLeft className="w-5 h-5" />
            </motion.button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Category Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <FolderOpen className="w-8 h-8 text-cyan-400" />
                        <h1 className="text-4xl md:text-5xl font-bold">
                            {decodeURIComponent(category)}
                        </h1>
                    </div>
                    <p className="text-gray-400">
                        {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
                    </p>
                </div>

                {/* Posts Grid */}
                {loading ? (
                    <div className="text-gray-400">Loading posts...</div>
                ) : posts.length === 0 ? (
                    <div className="text-gray-400">No posts found in this category.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {posts.map((post, index) => (
                            <Link to={`/post/${post.slug}`} key={post.id} className="block group">
                                <div className="h-full p-6 border-2 border-neo-black dark:border-white bg-white dark:bg-[#161616] hover:bg-neo-yellow dark:hover:bg-neo-yellow transition-colors relative shadow-neo dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <div className="flex justify-between items-start mb-4 font-mono">
                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider group-hover:text-neo-black">
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-neo-black">{post.date}</span>
                                        </div>
                                        <h3 className="text-xl font-serif font-bold mb-3 text-neo-black dark:text-neo-white group-hover:text-neo-black transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-serif group-hover:text-neo-black">
                                            {post.excerpt}
                                        </p>
                                    </motion.div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </motion.div>
        </Layout>
    );
};

export default CategoryView;
