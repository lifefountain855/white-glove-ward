import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import About from './pages/About';
import FAQ from './pages/FAQ';

import NotFound from './pages/NotFound';

// Portal Pages
import PortalLogin from './pages/portal/PortalLogin';
import CustomerDashboard from './pages/portal/CustomerDashboard';
import CleanerDashboard from './pages/portal/CleanerDashboard';
import ManagerDashboard from './pages/portal/ManagerDashboard';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow min-h-screen bg-primary-950 text-primary-100">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(5px)' }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="min-h-screen bg-primary-950"
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, filter: 'blur(7px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(7px)' }
  };

  return (
    <AnimatePresence mode="wait">
      {/* Passing location and key directly to Routes freezes the outgoing component state */}
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/portal/login" element={<PortalLogin />} />
          <Route path="/portal/customer" element={<CustomerDashboard />} />
          <Route path="/portal/cleaner" element={<CleanerDashboard />} />
          <Route path="/portal/manager" element={<ManagerDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}