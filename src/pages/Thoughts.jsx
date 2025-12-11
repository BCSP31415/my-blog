import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Share2, Clock, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import { thoughts } from '../data/thoughts';

const Thoughts = () => {
    return (
        <Layout>
            <div className="max-w-3xl mx-auto pt-12">
                <header className="mb-20 border-l-4 border-neo-black dark:border-white pl-8 py-4 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                    <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tighter leading-none mb-4 text-neo-black dark:text-neo-white">
                        THOUGHTS_
                        <br />
                        STREAM
                    </h1>
                    <p className="font-mono text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl">
                        A COLLECTION OF RAW_DATA /// MUSINGS /// DEVELOPMENT_LOGS
                    </p>
                </header>

                <div className="space-y-12 relative border-l-2 border-dashed border-neo-black/20 dark:border-white/20 ml-4 md:ml-0 md:pl-12">
                    {thoughts.map((thought, index) => (
                        <motion.div
                            key={thought.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            {/* Connector Line/Dot */}
                            <div className="absolute -left-[5px] md:-left-[53px] top-6 w-3 h-3 bg-neo-black dark:bg-white border-2 border-white dark:border-neo-black rounded-full z-10" />

                            <div className="p-6 border-2 border-neo-black dark:border-white bg-white dark:bg-[#161616] shadow-neo dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4 border-b-2 border-gray-100 dark:border-white/10 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-neo-yellow text-neo-black border-2 border-neo-black dark:border-white flex items-center justify-center font-bold">
                                            ME
                                        </div>
                                        <div>
                                            <div className="font-bold text-neo-black dark:text-neo-white font-serif text-lg">SYSTEM_ADMIN</div>
                                            <div className="text-xs font-mono text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                                <Clock size={12} />
                                                {thought.date}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mb-6">
                                    <p className="font-serif text-lg leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                                        {thought.content}
                                    </p>
                                </div>

                                {/* Images */}
                                {thought.images && thought.images.length > 0 && (
                                    <div className={`grid gap-4 mb-6 ${thought.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                        {thought.images.map((img, i) => (
                                            <div key={i} className="border-2 border-neo-black dark:border-white p-1 bg-white dark:bg-[#161616]">
                                                <img
                                                    src={img}
                                                    alt="Thought attachment"
                                                    className="w-full h-auto grayscale hover:grayscale-0 transition-all cursor-pointer"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-4 pt-2 text-neo-black dark:text-neo-white">
                                    <button className="px-4 py-2 border-2 border-transparent hover:border-neo-black dark:hover:border-white hover:bg-neo-yellow dark:hover:bg-neo-yellow dark:hover:text-neo-black font-mono text-xs font-bold transition-all flex items-center gap-2">
                                        <Heart size={14} /> LIKE
                                    </button>
                                    <button className="px-4 py-2 border-2 border-transparent hover:border-neo-black dark:hover:border-white hover:bg-neo-yellow dark:hover:bg-neo-yellow dark:hover:text-neo-black font-mono text-xs font-bold transition-all flex items-center gap-2">
                                        <MessageSquare size={14} /> REPLY
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-20 py-8 border-t-2 border-neo-black dark:border-white font-mono text-sm text-gray-400">
                    /// END_OF_STREAM
                </div>
            </div>
        </Layout>
    );
};

export default Thoughts;
