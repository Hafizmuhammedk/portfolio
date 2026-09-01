import './globals.css';
import 'lenis/dist/lenis.css';
import Navbar from '@/components/Navbar';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata = {
  title: 'HAFIS MUHAMMED | AI ENGINEER',
  description:
    'AI Engineer and Software Developer specializing in real-time AI systems, voice agents, and intelligent backend applications. Building digital intelligent systems.',
  keywords: ['AI Engineer', 'Software Developer', 'Voice AI', 'Machine Learning', 'Portfolio'],
  openGraph: {
    title: 'HAFIS MUHAMMED | AI ENGINEER',
    description: 'I build digital intelligent systems.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
