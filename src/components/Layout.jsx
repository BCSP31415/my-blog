import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen text-tempo-text selection:bg-tempo-text selection:text-tempo-bg relative overflow-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Blob 1 - Cyan/Blue */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
                {/* Blob 2 - Purple/Pink */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                {/* Blob 3 - Pink/Red */}
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>
            <div className="relative z-10">
                <Header />
                <main className="container mx-auto px-4 md:px-8 pt-32 pb-16">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
