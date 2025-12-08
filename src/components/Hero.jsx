import { motion } from 'framer-motion';
import { blogConfig } from '../blogConfig';

const Hero = () => {
    return (
        <section className="py-20 md:py-32">
            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8"
            >
                {blogConfig.hero.title} <br />
                <span className="text-gray-500">{blogConfig.hero.subtitle}</span>
            </motion.h1>
            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed"
            >
                {blogConfig.hero.description}
            </motion.p>
        </section>
    );
};

export default Hero;
