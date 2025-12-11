import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen text-tempo-text selection:bg-neo-yellow selection:text-neo-black relative">
            {/* Grid Pattern: White dots on Black in Dark Mode for high contrast */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.15] bg-[image:radial-gradient(#000_1px,transparent_1px)] dark:opacity-[0.25] dark:bg-[image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

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
