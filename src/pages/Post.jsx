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
                className="max-w-4xl mx-auto my-12"
            >
                {/* Brutalist Container */}
                <div className="bg-white dark:bg-[#161616] border-2 border-neo-black dark:border-white shadow-neo dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] p-8 md:p-12 relative transition-colors duration-300">

                    {/* Header Block */}
                    <div className="border-b-2 border-dashed border-neo-black/30 dark:border-white/30 pb-8 mb-12">
                        <div className="flex flex-wrap items-center gap-4 font-mono text-sm text-neo-black dark:text-neo-white mb-6 uppercase tracking-wider">
                            <span className="px-3 py-1 bg-neo-yellow text-neo-black border border-neo-black font-bold">
                                {post.category}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                                ///
                            </span>
                            <time className="border-b border-neo-black dark:border-white">
                                {post.date}
                            </time>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif font-black leading-tight text-neo-black dark:text-neo-white">
                            {post.title}
                        </h1>
                    </div>

                    {/* Spotify Embed */}
                    {post.spotify && (
                        <div className="mb-12 border-2 border-neo-black dark:border-white p-2 bg-white dark:bg-neo-black shadow-neo dark:shadow-none">
                            <iframe
                                style={{ borderRadius: '0px' }}
                                src={post.spotify}
                                width="100%"
                                height="152"
                                frameBorder="0"
                                allowFullScreen=""
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                className="bg-neo-black"
                            ></iframe>
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-lg max-w-none mb-16 dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-p:font-serif prose-p:leading-loose prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:bg-neo-yellow hover:prose-a:text-black transition-colors">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                            components={{
                                img: ({ node, ...props }) => (
                                    <div className="my-12">
                                        <div className="border-2 border-neo-black dark:border-white p-2 bg-white dark:bg-neo-black shadow-sm inline-block w-full">
                                            <img
                                                {...props}
                                                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                                                loading="lazy"
                                                referrerPolicy="no-referrer"
                                            />
                                        </div>
                                        {props.alt && (
                                            <p className="text-left font-mono text-xs text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-wide border-l-2 border-neo-yellow pl-3">
                                                FIG_REF: {props.alt}
                                            </p>
                                        )}
                                    </div>
                                ),
                                table: ({ node, ...props }) => (
                                    <div className="overflow-x-auto my-12 border-2 border-neo-black dark:border-white">
                                        <table {...props} className="w-full text-left border-collapse" />
                                    </div>
                                ),
                                th: ({ node, ...props }) => (
                                    <th
                                        {...props}
                                        className="bg-neo-black dark:bg-white text-neo-white dark:text-neo-black p-4 font-mono text-sm font-bold border-b-2 border-neo-black dark:border-white whitespace-nowrap uppercase"
                                    />
                                ),
                                td: ({ node, ...props }) => (
                                    <td
                                        {...props}
                                        className="p-4 border-b border-neo-black/10 dark:border-white/10 font-serif text-sm border-r border-neo-black/10 dark:border-white/10 last:border-r-0"
                                    />
                                ),
                                code: ({ node, inline, className, children, ...props }) => {
                                    return inline ? (
                                        <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-mono text-sm border border-gray-300 dark:border-gray-600" {...props}>
                                            {children}
                                        </code>
                                    ) : (
                                        <pre className="bg-neo-black text-gray-200 p-6 rounded-none border-l-4 border-neo-yellow overflow-x-auto my-8 font-mono text-sm shadow-inner">
                                            <code className="bg-transparent" {...props}>
                                                {children}
                                            </code>
                                        </pre>
                                    );
                                }
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Comments Section */}
                    <div className="border-t-4 border-neo-black dark:border-white pt-12 mt-12">
                        <h3 className="font-mono text-xl font-bold mb-8 uppercase text-neo-black dark:text-neo-white">/// User_Comments</h3>
                        <Comments postSlug={slug} />
                    </div>
                </div>
            </motion.article>
        </Layout>
    );
};

export default Post;
