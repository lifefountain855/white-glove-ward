import { Link } from 'react-router-dom';
import Favicon from '../Favicon';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-black text-white border-border-subtle mt-10">
      <div className="max-w-[1400px] mx-auto p-10 pt-24">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-4 mb-6 hover:opacity-80 transition-opacity">
              {/* <img src="/logo.png" alt="white Glove Logo" className="w-6 h-6 object-contain filter invert" /> */}
              <Favicon className='w-15 md:w-20 lg:w-25' bg={'none'}/>
              <span className="font-bold text-md sm:text-lg md:text-xl lg:text-2xl flex flex-row sm:flex-col gap-2 sm:gap-0">
                <span className='tracking-widest'>white</span> <span className='tracking-widest'>glove</span> <span className='tracking-widest'>ward</span>
              </span>
            </Link>
            <p className="text-accent leading-relaxed">
              professional cleaning.<br />
              without the hassle.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Link to="/services" className="hover:text-accent transition-colors w-fit">services</Link>
            <Link to="/pricing" className="hover:text-accent transition-colors w-fit">pricing</Link>
            <Link to="/about" className="hover:text-accent transition-colors w-fit">about</Link>
            <Link to="/faq" className="hover:text-accent transition-colors w-fit">faq</Link>
            <Link to="/contact" className="hover:text-accent transition-colors w-fit">contact</Link>
          </div>

          <div className="flex flex-col items-start gap-2">
            <Link to="/portal/customer" className="px-4 py-2 group flex items-center gap-2 hover:bg-secondary transition-colors">
              <span>book a cleaning</span>
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-250">↗</span>
            </Link>
            
            <Link to="/portal/login" className="px-4 py-2 group flex items-center gap-2 hover:bg-secondary transition-colors">
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
