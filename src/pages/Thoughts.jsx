import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Share2, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import { thoughts } from '../data/thoughts';

const Thoughts = () => {
    return (
        <Layout>
            <div className="max-w-2xl mx-auto pt-20 px-4">
                <header className="mb-20 text-center">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 text-[var(--thoughts-page-title)]"
                    >
                        Thoughts <br />
                        <span className="text-gray-400 dark:text-gray-500">Stream</span>
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        A collection of random musings, development updates, and fleeting ideas.
                        This is where I capture the stream of consciousness that doesn't quite fit into full articles.
                    </motion.p>
                </header>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-white/10 before:to-transparent">
                    {thoughts.map((thought, index) => (
                        <motion.div
                            key={thought.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative flex items-start group"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-0 mt-1.5 ml-3 h-4 w-4 rounded-full border-2 border-white dark:border-white/20 bg-gray-200 dark:bg-black/50 backdrop-blur-md shadow-md group-hover:scale-125 transition-transform duration-300 z-10" />

                            <div className="ml-12 w-full glass-panel p-6 rounded-2xl bg-white/40 dark:bg-gray-900/60 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors duration-300 border border-white/20 dark:border-white/10 shadow-sm">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 shadow-sm" />
                                        <span className="font-bold text-[var(--thoughts-title)]">Me</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-300 font-mono">
                                        <Clock size={12} />
                                        <time>{thought.date}</time>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mb-4">
                                    <p className="text-[var(--thoughts-text)] leading-relaxed text-base whitespace-pre-wrap">
                                        {thought.content}
                                    </p>
                                </div>

                                {/* Images */}
                                {thought.images && thought.images.length > 0 && (
                                    <div className={`grid gap-2 mb-4 ${thought.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                        {thought.images.map((img, i) => (
                                            <img
                                                key={i}
                                                src={img}
                                                alt="Thought attachment"
                                                className="rounded-xl w-full h-auto object-cover border border-black/5 dark:border-white/10 hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                                                loading="lazy"
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-6 pt-3 border-t border-black/5 dark:border-white/10 text-gray-500 dark:text-gray-400">
                                    <button className="flex items-center gap-2 hover:text-pink-500 dark:hover:text-pink-400 transition-colors group/btn">
                                        <Heart size={16} className="group-hover/btn:scale-110 transition-transform" />
                                        <span className="text-xs font-medium">Like</span>
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group/btn">
                                        <MessageSquare size={16} className="group-hover/btn:scale-110 transition-transform" />
                                        <span className="text-xs font-medium">Reply</span>
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-400 transition-colors group/btn">
                                        <Share2 size={16} className="group-hover/btn:scale-110 transition-transform" />
                                        <span className="text-xs font-medium">Share</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* End of timeline */}
                <div className="text-center mt-12 mb-20 text-gray-400 dark:text-gray-600 text-sm">
                    ~ No more thoughts ~
                </div>
            </div>
        </Layout>
    );
};

export default Thoughts;
