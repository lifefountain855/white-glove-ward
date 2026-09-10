import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-off-white border-border-subtle mt-10">
      <div className="max-w-[1400px] mx-auto p-10 pt-24">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-4 mb-6 hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="white Glove Logo" className="w-6 h-6 object-contain filter invert" />
              <span className="font-medium">white glove ward</span>
            </Link>
            <p className="text-secondary leading-relaxed">
              professional cleaning.<br />
              without the hassle.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Link to="/services" className="hover:text-secondary/50 transition-colors w-fit">services</Link>
            <Link to="/pricing" className="hover:text-secondary/50 transition-colors w-fit">pricing</Link>
            <Link to="/about" className="hover:text-secondary/50 transition-colors w-fit">about</Link>
            <Link to="/faq" className="hover:text-secondary/50 transition-colors w-fit">faq</Link>
            <Link to="/contact" className="hover:text-secondary/50 transition-colors w-fit">contact</Link>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Link to="/portal/customer" className="px-4 py-2 group flex items-center gap-2 hover:bg-off-accent transition-colors">
              <span>book a cleaning</span>
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-250">↗</span>
            </Link>
            
            <Link to="/portal/login" className="px-4 py-2 group flex items-center gap-2 hover:bg-off-accent transition-colors">
              <span>cleaner / manager portal</span>
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-250">↗</span>
            </Link>
          </div>
        </div>

        <div className="mt-32 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-black font-accent text-sm">© {new Date().getFullYear()} white glove ward</p>
          <div className="flex gap-2 text-sm text-secondary-black font-accent">
            <Link to="#" className="px-4 py-2 hover:text-white hover:bg-black transition-colors">privacy</Link>
            <Link to="#" className="px-4 py-2 hover:text-white hover:bg-black transition-colors">terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
