import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, User } from 'lucide-react';
import GlassCard from './GlassCard';

const Comments = ({ postSlug }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load comments from localStorage
    useEffect(() => {
        const storedComments = localStorage.getItem(`comments_${postSlug}`);
        if (storedComments) {
            try {
                setComments(JSON.parse(storedComments));
            } catch (e) {
                console.error('Failed to parse comments', e);
            }
        }
    }, [postSlug]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim() || !name.trim()) return;

        setIsSubmitting(true);

        const comment = {
            id: Date.now(),
            name: name.trim(),
            content: newComment.trim(),
            date: new Date().toLocaleDateString(),
            timestamp: Date.now()
        };

        const updatedComments = [comment, ...comments];
        setComments(updatedComments);
        localStorage.setItem(`comments_${postSlug}`, JSON.stringify(updatedComments));

        setNewComment('');
        setIsSubmitting(false);
    };

    return (
        <div className="mt-16 pt-8 border-t border-white/10">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-tempo-accent" />
                Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            <GlassCard className="p-6 mb-10">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                            Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-tempo-text placeholder-gray-500 focus:outline-none focus:border-tempo-accent/50 focus:bg-white/10 transition-all"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-400 mb-1">
                            Message
                        </label>
                        <textarea
                            id="comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your thoughts..."
                            rows="3"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-tempo-text placeholder-gray-500 focus:outline-none focus:border-tempo-accent/50 focus:bg-white/10 transition-all resize-none"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-6 py-2 bg-tempo-accent/20 hover:bg-tempo-accent/30 text-tempo-accent border border-tempo-accent/30 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4" />
                            Post Comment
                        </motion.button>
                    </div>
                </form>
            </GlassCard>

            {/* Comments List */}
            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {comments.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-10 text-gray-500"
                        >
                            No comments yet. Be the first to share your thoughts!
                        </motion.div>
                    ) : (
                        comments.map((comment) => (
                            <motion.div
                                key={comment.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                layout
                            >
                                <GlassCard className="p-5" hoverEffect={false}>
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-tempo-accent/20 to-purple-500/20 flex items-center justify-center text-tempo-accent font-bold text-sm border border-white/10">
                                                {comment.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-semibold text-tempo-text">{comment.name}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">{comment.date}</span>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed pl-10">
                                        {comment.content}
                                    </p>
                                </GlassCard>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Comments;
