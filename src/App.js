import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import EnhancedHeader from './components/EnhancedHeader';
import EnhancedFooter from './components/EnhancedFooter';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Gallery from './pages/Gallery';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const theme = {
  colors: {
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#f59e0b',
    text: '#1f2937',
    light: '#f8fafc',
    white: '#ffffff',
  },
  fonts: {
    primary: 'Inter, sans-serif',
    secondary: 'Playfair Display, serif',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public routes with header and footer */}
          <Route path="/" element={
            <>
              <EnhancedHeader />
              <Home />
              <EnhancedFooter />
            </>
          } />
          <Route path="/about" element={
            <>
              <EnhancedHeader />
              <About />
              <EnhancedFooter />
            </>
          } />
          <Route path="/contact" element={
            <>
              <EnhancedHeader />
              <Contact />
              <EnhancedFooter />
            </>
          } />
          <Route path="/careers" element={
            <>
              <EnhancedHeader />
              <Careers />
              <EnhancedFooter />
            </>
          } />
          <Route path="/gallery" element={
            <>
              <EnhancedHeader />
              <Gallery />
              <EnhancedFooter />
            </>
          } />
          
          {/* Admin routes without header and footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
