import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const services=[
  {
    name:"standard clean",
    link:"std",
    price:150,
    tagline:"routine maintainence\nfor your home"
  },
  {
    name:"deep clean",
    link:"deep",
    price:250,
    tagline:"a more detailed\nreset for your home"
  },
  {
    name:"move-out clean",
    link:"move-out",
    price:350,
    tagline:"leave the property\nready for what's next"
  }
]

export default function Home() {
  return (
    <div className="w-full">
      {/* 01 / HERO */}
      <section className="max-w-[1400px] mx-auto px-8 pt-32 pb-48">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <span className="font-accent text-sm text-secondary tracking-widest block mb-12">
            01 / professional home cleaning
          </span>
          
          <h1 className="text-5xl md:text-7xl leading-[1.1] mb-12">
            a cleaner home.<br />
            without the hassle.
          </h1>
          
          <p className="text-xl text-secondary max-w-2xl leading-relaxed mb-16">
            reliable, detailed cleaning<br />
            for people who value their time.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <Link to="/portal/customer" className="btn-primary text-lg">
              book a cleaning →
            </Link>
            <span className="text-sm font-accent text-secondary tracking-wide">
              trusted • thorough • worry-free
            </span>
          </div>
        </motion.div>
      </section>

      {/* 02 / TRUST */}
      <section className="border-t border-subtle">
        <div className="max-w-[1400px] mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <span className="font-accent text-sm text-secondary tracking-widest block mb-8">
              02 / standard
            </span>
            <h2 className="text-3xl leading-snug">
              thorough cleaning.<br />
              simple experience.
            </h2>
          </div>
          
          <div className="flex flex-col gap-8 justify-center">
            {[
              "fully vetted and trained professionals",
              "transparent, flat-rate pricing",
              "easy online booking and management",
              "satisfaction guaranteed every time"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <Check className="w-5 h-5 text-secondary" />
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 / SERVICES */}
      <section className="border-t border-subtle">
        <div className="max-w-[1400px] mx-auto px-8 py-32">
          <span className="font-accent text-sm text-secondary tracking-widest block mb-16">
            03 / services
          </span>
          
          <div className="flex flex-col border-t border-subtle">
            {/* Service Row 1 */}
            { services.map((service,i)=>{
                return (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-subtle group hover:bg-[#151515] transition-colors duration-400">
                <div className="md:col-span-1 font-accent text-secondary">0{i}</div>
                <div className="md:col-span-5">
                  <h3 className="text-2xl mb-4">{service.name}</h3>
                  <p className="text-secondary leading-relaxed">{service.tagline}</p>
                </div>
                <div className="md:col-span-6 flex flex-col md:items-end justify-between">
                  <span className="text-secondary mb-8 md:mb-0">from ${service.price}</span>
                  <Link to={`/${service.link}`} className="group-hover:translate-x-2 transition-transform duration-250 flex items-center gap-2">
                    view service →
                  </Link>
                  <Link to={`/${service.link}`} className="group-hover:translate-x-2 transition-transform duration-250 flex items-center gap-2">
                    view service →
                  </Link>
                </div>
              </div>
                )
              })
            }
          </div>
        </div>
      </section>

      {/* 04 / PROCESS */}
      <section className="bg-white text-black py-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <span className="font-accent text-sm text-secondary tracking-widest block mb-24">
            04 / process
          </span>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <span className="font-accent text-2xl text-secondary block mb-8">01</span>
              <h3 className="text-3xl mb-4">book</h3>
              <p className="text-secondary text-lg">select your service, choose a time, and get exact pricing instantly.</p>
            </div>
            <div>
              <span className="font-accent text-2xl text-secondary block mb-8">02</span>
              <h3 className="text-3xl mb-4">we clean</h3>
              <p className="text-secondary text-lg">our professionals arrive on time and follow a rigorous checklist.</p>
            </div>
            <div>
              <span className="font-accent text-2xl text-secondary block mb-8">03</span>
              <h3 className="text-3xl mb-4">you relax</h3>
              <p className="text-secondary text-lg">come back to a perfectly clean home. no management required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 07 / CTA */}
      <section className="max-w-[1400px] mx-auto px-8 py-48 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl mb-16">ready for a cleaner home?</h2>
        <Link to="/portal/customer" className="btn-primary text-lg">
          book a cleaning →
        </Link>
      </section>
    </div>
  );
}
