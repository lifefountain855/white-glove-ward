import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full border-t border-subtle mt-32">
      <div className="max-w-[1400px] mx-auto px-8 py-24">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-4 mb-6 hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="White Glove Logo" className="w-6 h-6 object-contain filter invert" />
              <span className="font-medium">white glove ward</span>
            </Link>
            <p className="text-secondary leading-relaxed">
              professional cleaning.<br />
              without the hassle.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Link to="/services" className="hover:text-secondary transition-colors w-fit">services</Link>
            <Link to="/pricing" className="hover:text-secondary transition-colors w-fit">pricing</Link>
            <Link to="/about" className="hover:text-secondary transition-colors w-fit">about</Link>
            <Link to="/faq" className="hover:text-secondary transition-colors w-fit">faq</Link>
            <Link to="/contact" className="hover:text-secondary transition-colors w-fit">contact</Link>
          </div>

          <div className="flex flex-col items-start gap-8">
            <Link to="/portal/customer" className="group flex items-center gap-2 hover:text-secondary transition-colors">
              <span>book a cleaning</span>
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-250">↗</span>
            </Link>
            
            <Link to="/portal/login" className="text-secondary hover:text-white transition-colors">
              cleaner / manager portal
            </Link>
          </div>
        </div>

        <div className="mt-32 pt-8 border-t border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary font-accent text-sm">© {new Date().getFullYear()} white glove ward</p>
          <div className="flex gap-6 text-sm text-secondary font-accent">
            <Link to="#" className="hover:text-white transition-colors">privacy</Link>
            <Link to="#" className="hover:text-white transition-colors">terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
