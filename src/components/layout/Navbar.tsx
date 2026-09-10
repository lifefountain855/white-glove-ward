import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-border-subtle">
      <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="white Glove Logo" className="w-8 h-8 object-contain filter invert" />
          <span className="flex flex-col lg:flex-row gap-1 font-medium text-lg tracking-widest"><span>white</span><span>glove</span><span>ward</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-10">
          <Link to="/services" className="hover:text-secondary transition-colors">services</Link>
          <Link to="/pricing" className="hover:text-secondary transition-colors">pricing</Link>
          <Link to="/about" className="hover:text-secondary transition-colors">about</Link>
          <Link to="/faq" className="hover:text-secondary transition-colors">faq</Link>
        </div>

        {/* CTA and Portal */}
        <div className="flex items-center gap-6">
          <Link to="/portal/login" className="px-6 py-3 text-sm hidden md:block text-secondary hover:bg-black hover:text-white transition-colors">
           &gt;portal login&lt;
          </Link>
          <Link to="/portal/customer" className="btn-primary text-sm">
            book a cleaning →
          </Link>
        </div>
      </div>
    </nav>
  );
}
