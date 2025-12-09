import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import BrutalistHero from '../components/BrutalistHero';
import BlogList from '../components/BlogList';

const Home = () => {
    return (
        <Layout>
            <BrutalistHero />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-6xl mx-auto my-20 px-4"
            >
                <div className="border-l-4 border-neo-black pl-6 mb-12">
                    <h2 className="text-4xl font-serif font-bold">LATEST_TRANSMISSIONS</h2>
                </div>
                <BlogList />
            </motion.div>
        </Layout>
    );
};

export default Home;
