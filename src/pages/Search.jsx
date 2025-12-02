import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search as SearchIcon } from 'lucide-react';
import { getPosts } from '../postLoader';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [allPosts, setAllPosts] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get query from URL
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';

    useEffect(() => {
        getPosts()
            .then(posts => {
                setAllPosts(posts);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load posts:', err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const searchQuery = query.toLowerCase();
        const filtered = allPosts.filter(post => {
            const titleMatch = post.title?.toLowerCase().includes(searchQuery);
            const excerptMatch = post.excerpt?.toLowerCase().includes(searchQuery);
            const categoryMatch = post.category?.toLowerCase().includes(searchQuery);
            const contentMatch = post.content?.toLowerCase().includes(searchQuery);

            return titleMatch || excerptMatch || categoryMatch || contentMatch;
        });

        setResults(filtered);
    }, [query, allPosts]);

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
                className="max-w-5xl mx-auto mt-12"
            >
                {/* Search Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Search Results</h1>
                    <p className="text-gray-400">
                        {query ? `Showing results for "${query}"` : 'Enter a search term above'}
                    </p>
                </div>

                {/* Search Results */}
                {loading ? (
                    <div className="text-gray-400">Loading...</div>
                ) : query.trim() === '' ? (
                    <div className="text-center py-20">
                        <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">Type in the search bar above to find articles</p>
                    </div>
                ) : results.length === 0 ? (
                    <div className="text-center py-20">
                        <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No matches found</p>
                        <p className="text-gray-500 text-sm mt-2">Try different keywords</p>
                    </div>
                ) : (
                    <div>
                        <p className="text-gray-400 mb-6">
                            Found {results.length} articles
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {results.map((post, index) => (
                                <Link to={`/post/${post.slug}`} key={post.id} className="block group">
                                    <GlassCard className="h-full p-6">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: index * 0.05 }}
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
                    </div>
                )}
            </motion.div>
        </Layout>
    );
};

export default Search;
