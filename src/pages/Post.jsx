import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from '../postLoader';
import { useFavorites } from '../FavoritesContext';
import Layout from '../components/Layout';

const Post = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorites();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPostBySlug(slug)
            .then(data => setPost(data))
            .catch(err => setError(err.toString()));
    }, [slug]);

    if (error) {
        return (
            <Layout>
                <div className="text-red-500 p-12">Error: {error}</div>
            </Layout>
        );
    }

    if (!post) {
        return (
            <Layout>
                <div className="p-12">Loading...</div>
            </Layout>
        );
    }

    const isFavorited = isFavorite(slug);

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

            {/* Favorite Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onClick={() => toggleFavorite(slug)}
                className="fixed top-36 left-4 z-40 flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 shadow-lg hover:bg-white/20 dark:hover:bg-black/20 transition-all"
                aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
                <Star
                    className={`w-5 h-5 transition-all ${isFavorited
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-400'
                        }`}
                />
            </motion.button>

            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto"
            >
                {/* Category and Date */}
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
                    <span className="uppercase tracking-wider font-medium">{post.category}</span>
                    <span>•</span>
                    <time>{post.date}</time>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                    {post.title}
                </h1>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </motion.article>
        </Layout>
    );
};

export default Post;
