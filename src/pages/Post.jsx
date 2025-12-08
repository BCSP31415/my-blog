import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Star } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS
import { getPostBySlug } from '../postLoader';
import { useFavorites } from '../FavoritesContext';
import Layout from '../components/Layout';
import Comments from '../components/Comments';

const Post = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorites();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        getPostBySlug(slug)
            .then(data => {
                setPost(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="animate-pulse text-xl font-light tracking-widest text-gray-400">LOADING...</div>
                </div>
            </Layout>
        );
    }

    if (!post) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold mb-4">Post not found</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="text-tempo-accent hover:underline"
                    >
                        Return Home
                    </button>
                </div>
            </Layout>
        );
    }

    const isFavorited = isFavorite(post.id);

    return (
        <Layout>
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--progress-start)] to-[var(--progress-end)] origin-left z-50"
                style={{ scaleX }}
            />

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
                onClick={() => toggleFavorite(post)}
                className="fixed top-36 left-4 z-40 flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20 shadow-lg hover:bg-white/20 dark:hover:bg-black/20 transition-all"
                aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
                <Star
                    className={`w-5 h-5 transition-colors ${isFavorited
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
                <div className="prose prose-lg max-w-none mb-16">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            img: ({ node, ...props }) => (
                                <div className="my-8">
                                    <img
                                        {...props}
                                        className="rounded-xl shadow-lg border border-white/10 w-full h-auto object-cover"
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                    />
                                    {props.alt && (
                                        <p className="text-center text-sm text-gray-500 mt-2 italic">
                                            {props.alt}
                                        </p>
                                    )}
                                </div>
                            ),
                            table: ({ node, ...props }) => (
                                <div className="overflow-x-auto my-8 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                                    <table {...props} className="w-full text-left border-collapse" />
                                </div>
                            ),
                            th: ({ node, ...props }) => (
                                <th
                                    {...props}
                                    className="bg-gray-50/50 dark:bg-white/5 p-4 font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/10 whitespace-nowrap"
                                />
                            ),
                            td: ({ node, ...props }) => (
                                <td
                                    {...props}
                                    className="p-4 border-b border-gray-100 dark:border-white/5 text-gray-700 dark:text-gray-300"
                                />
                            ),
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>

                {/* Comments Section */}
                <Comments postSlug={slug} />
            </motion.article>
        </Layout>
    );
};

export default Post;
