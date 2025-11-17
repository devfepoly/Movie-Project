import Navbar from '../../pages/HomeTemplate/_components/Navbar';
import Footer from '../../pages/HomeTemplate/_components/Footer';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-linear-to-br from-gray-900 via-purple-900 to-gray-900">
            <Navbar />
            <main className="grow pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
}
