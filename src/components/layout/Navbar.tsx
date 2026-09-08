import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-subtle">
      <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="White Glove Logo" className="w-8 h-8 object-contain filter invert" />
          <span className="font-medium text-lg">white glove ward</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <Link to="/services" className="hover:text-secondary transition-colors">services</Link>
          <Link to="/pricing" className="hover:text-secondary transition-colors">pricing</Link>
          <Link to="/about" className="hover:text-secondary transition-colors">about</Link>
          <Link to="/faq" className="hover:text-secondary transition-colors">faq</Link>
        </div>

        {/* CTA and Portal */}
        <div className="flex items-center gap-6">
          <Link to="/portal/login" className="hidden md:block text-secondary hover:text-white transition-colors">
            portal login
          </Link>
          <Link to="/portal/customer" className="btn-primary py-2 px-4 text-sm">
            book a cleaning →
          </Link>
        </div>
      </div>
    </nav>
  );
}
