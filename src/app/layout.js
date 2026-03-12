import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css'; // Make sure global CSS stays imported if it was

export const metadata = {
  title: "fourthlayer | Advanced Tech Solutions",
  description: "Explore fourthlayer systems, fourthlayer games, and fourthlayer web.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
