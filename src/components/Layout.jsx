import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen text-tempo-text selection:bg-neo-yellow selection:text-neo-black relative bg-[#f0f0f0] dark:bg-[#0a0a0a]">
            {/* Atmospheric Gradient for Dark Mode */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-0 dark:opacity-100 bg-gradient-to-b from-[#0a0a12] via-[#0d1117] to-[#010409]" />

            {/* Vignette Effect */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-0 dark:opacity-60 bg-[radial-gradient(ellipse_at_center,transparent_40%,#000_100%)]" />

            {/* Grid Pattern */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.15] bg-[image:radial-gradient(#000_1px,transparent_1px)] dark:opacity-[0.08] dark:bg-[image:radial-gradient(rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative z-10">
                <Header />
                <main className="container mx-auto px-4 md:px-8 pt-24 pb-16 max-w-7xl">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
