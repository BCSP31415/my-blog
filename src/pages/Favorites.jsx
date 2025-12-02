import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star } from 'lucide-react';
import { getPosts } from '../postLoader';
import { useFavorites } from '../FavoritesContext';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';

const Favorites = () => {
    const navigate = useNavigate();
    const { favorites } = useFavorites();
    const [favoritePosts, setFavoritePosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPosts()
            .then(allPosts => {
                const filtered = allPosts.filter(post => favorites.includes(post.slug));
                setFavoritePosts(filtered);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load posts:', err);
                setLoading(false);
            });
    }, [favorites]);

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
            >
                {/* Page Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                        <h1 className="text-4xl md:text-5xl font-bold">收藏夹</h1>
                    </div>
                    <p className="text-gray-400">
                        {favoritePosts.length} {favoritePosts.length === 1 ? 'post' : 'posts'} saved
                    </p>
                </div>

                {/* Posts Grid */}
                {loading ? (
                    <div className="text-gray-400">Loading favorites...</div>
                ) : favoritePosts.length === 0 ? (
                    <div className="text-center py-20">
                        <Star className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">暂无收藏文章</p>
                        <p className="text-gray-500 text-sm mt-2">在文章页面点击星标即可收藏</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {favoritePosts.map((post, index) => (
                            <Link to={`/post/${post.slug}`} key={post.id} className="block group">
                                <GlassCard className="h-full p-6">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-gray-600">{post.date}</span>
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {post.excerpt}
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

export default Favorites;
