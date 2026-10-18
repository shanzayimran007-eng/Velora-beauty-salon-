import { useState, useEffect } from 'react';
import type { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { BookingPage } from './pages/BookingPage';
import { ContactPage } from './pages/ContactPage';

function getInitialPage(): PageId {
  const path = window.location.pathname.toLowerCase().replace('/', '');
  if (['home', 'about', 'services', 'gallery', 'booking', 'contact'].includes(path)) {
    return path as PageId;
  }
  // Check hash fallback
  const hash = window.location.hash.toLowerCase().replace('#', '').replace('/', '');
  if (['home', 'about', 'services', 'gallery', 'booking', 'contact'].includes(hash)) {
    return hash as PageId;
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage());
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  // Sync with browser URL & popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: PageId, serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setCurrentPage(page);

    // Update browser URL without full page reload
    const targetUrl = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }

    // Smooth scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#352722]">
      {/* Global Header */}
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}
        {currentPage === 'services' && (
          <ServicesPage onNavigate={navigateTo} selectedServiceId={selectedService} />
        )}
        {currentPage === 'gallery' && <GalleryPage onNavigate={navigateTo} />}
        {currentPage === 'booking' && (
          <BookingPage onNavigate={navigateTo} initialService={selectedService} />
        )}
        {currentPage === 'contact' && <ContactPage onNavigate={navigateTo} />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
