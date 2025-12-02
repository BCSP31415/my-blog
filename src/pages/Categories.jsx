import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FolderOpen } from 'lucide-react';
import { getPosts } from '../postLoader';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';

const Categories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPosts()
            .then(posts => {
                // Extract unique categories with post counts
                const categoryMap = {};
                posts.forEach(post => {
                    const cat = post.category || 'Uncategorized';
                    if (!categoryMap[cat]) {
                        categoryMap[cat] = { name: cat, count: 0, posts: [] };
                    }
                    categoryMap[cat].count++;
                    categoryMap[cat].posts.push(post);
                });

                const categoriesArray = Object.values(categoryMap);
                setCategories(categoriesArray);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load categories:', err);
                setLoading(false);
            });
    }, []);

    return (
        <Layout>
            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => navigate('/')}
                className="fixed top-20 left-4 z-40 flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 shadow-lg hover:bg-white/20 dark:hover:bg-black/20 transition-all"
                aria-label="Back to home"
            >
                <ArrowLeft className="w-5 h-5" />
            </motion.button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto"
            >
                {/* Page Title */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Categories</h1>
                    <p className="text-gray-400">Browse articles by category</p>
                </div>

                {/* Categories Grid */}
                {loading ? (
                    <div className="text-gray-400">Loading categories...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {categories.map((category, index) => (
                            <Link
                                to={`/category/${encodeURIComponent(category.name)}`}
                                key={category.name}
                                className="block group"
                            >
                                <GlassCard className="h-full p-6">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex flex-col items-center text-center"
                                    >
                                        <FolderOpen className="w-12 h-12 mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                                        <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {category.count} {category.count === 1 ? 'post' : 'posts'}
                                        </p>
                                    </motion.div>
                                </GlassCard>
                            </Link>
                        ))}
                    </div>
                )}
            </motion.div>
        </Layout>
    );
};

export default Categories;
