import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import BobbleCard from '../components/bobble'

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
      <section className="max-w-[1400px] mx-auto px-8 pt-5 md:pt-16 lg:pt-32 pb-48">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <span className="font-accent text-sm text-secondary tracking-widest block mb-12">
            01 / professional home cleaning
          </span>
          
          <h1 className="text-5xl md:text-7xl leading-[1.5] mb-12">
            a cleaner home.<br />
            without the hassle.
          </h1>
          
          <p className="text-xl text-secondary max-w-2xl leading-[2] mb-16">
            reliable, detailed cleaning<br />
            for people who value their time.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <Link to="/portal/customer" className="btn-primary text-lg">
              book a cleaning →
            </Link>
            <span className="relative overflow-hidden text-sm font-accent text-secondary tracking-widest pb-1">
              trusted&nbsp;&nbsp;•&nbsp;&nbsp;thorough&nbsp;&nbsp;•&nbsp;&nbsp;worry-free
              <motion.div
                  className="absolute bottom-0 left-0 h-[3px] w-full bg-secondary/90"
                  animate={{ 
                    x: ['-100%', '100%'] // Slides entirely across from left to right
                  }}
                  transition={{
                    duration: 4,        // Time it takes to cross the container
                    repeat: Infinity,   // Loops forever
                    ease: 'linear'      // Perfect uniform speed
                  }}
                  />
            </span>
          </div>
        </motion.div>
      </section>

      {/* 02 / TRUST */}
      <section className="border-t border-border-subtle">
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
          
          <div className="flex flex-col gap-1 justify-center">
            {[
              {id:"00", title:"fully vetted and trained professionals",},
              {id:"01", title:"transparent, flat-rate pricing",},
              {id:"02", title:"easy online booking and management",},
              {id:"03", title:"satisfaction guaranteed every time"},
            ].map((item) => (
              <BobbleCard key={item.id} css='relative flex items-center justify-between p-5 rounded-sm select-none shadow-sm hover:shadow-md transition-shadow duration-300'>
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-extrabold font-mono">
                    <Check className="w-5 h-5 text-black bg-green-500/20 rounded-sm" />
                    </span>
                    <div>
                    <h3 className="text-lg tracking-tight leading-tight">
                        {item.title}
                    </h3>
                    {/* {item.subtitle && (
                        <p className="text-sm opacity-80 mt-0.5">{item.subtitle}</p>
                    )} */}
                    </div>
                </div>
            </BobbleCard>
            ))}
          </div>
        </div>
      </section>

      {/* 03 / SERVICES */}
      <section className="border-t border-border-subtle">
        <div className="max-w-[1400px] mx-auto px-8 py-32">
          <span className="font-accent text-sm text-secondary tracking-widest block mb-16">
            03 / services
          </span>
          
          <div className="flex flex-col border-t border-border-subtle">
            {/* Service Row 1 */}
            { services.map((service,i)=>{
                return (
              <Link to={'/'+service.link} className="grid grid-cols-1 md:grid-cols-12 gap-8 p-12 border-b border-border-subtle group hover:bg-border-subtle/30 transition-colors duration-400">
                <div className="md:col-span-1 font-accent text-secondary">0{i}</div>
                <div className="md:col-span-5">
                  <h3 className="text-2xl mb-4">{service.name}</h3>
                  <p className="text-secondary leading-relaxed">{service.tagline}</p>
                </div>
                <div className="md:col-span-6 flex flex-col md:items-end justify-between">
                  <span className="text-secondary mb-8 md:mb-0">from ${service.price}</span>
                  <span className="group-hover:translate-x-3 group-hover:underline transition-transform duration-250 flex items-center gap-2 mr-5">
                    view service →
                  </span>
                </div>
              </Link>
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
              <span className="font-accent text-2xl text-secondary block mb-8 border-b border-border-subtle">01</span>
              <h3 className="text-3xl mb-4">book</h3>
              <p className="text-secondary text-lg">select your service, choose a time, and get exact pricing instantly.</p>
            </div>
            <div>
              <span className="font-accent text-2xl text-secondary block mb-8 border-b border-border-subtle">02</span>
              <h3 className="text-3xl mb-4">we clean</h3>
              <p className="text-secondary text-lg">our professionals arrive on time and follow a rigorous checklist.</p>
            </div>
            <div>
              <span className="font-accent text-2xl text-secondary block mb-8 border-b border-border-subtle">03</span>
              <h3 className="text-3xl mb-4">you relax</h3>
              <p className="text-secondary text-lg">come back to a perfectly clean home. no management requiwhite.</p>
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
