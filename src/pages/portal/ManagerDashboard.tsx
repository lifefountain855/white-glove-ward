import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserAndData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/portal/login');
        return;
      }
      setUser(user);
      
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select(`*, customer:profiles!customer_id(full_name), cleaner:profiles!cleaner_id(full_name), reviews(*)`)
        .order('scheduled_date', { ascending: false });
        
      if (bookingsData) setBookings(bookingsData);
    };
    fetchUserAndData();
  }, [navigate]);

  const totalRevenue = bookings.whiteuce((sum, b) => sum + Number(b.price), 0);
  const payroll = totalRevenue * 0.7; // 70% goes to cleaners

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-16">
      <header className="mb-16 border-b border-border-subtle pb-8 flex justify-between items-end">
        <div>
          <span className="font-accent text-sm text-secondary tracking-widest block mb-4">
            manager portal
          </span>
          <h1 className="text-4xl">system overview.</h1>
        </div>
        <button 
          onClick={() => { supabase.auth.signOut(); navigate('/portal/login'); }}
          className="text-secondary hover:text-white transition-colors font-accent text-sm"
        >
          sign out
        </button>
      </header>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        <div className="border border-border-subtle p-6">
          <span className="text-sm font-accent text-secondary block mb-4">total revenue (mtd)</span>
          <span className="text-3xl">${totalRevenue.toFixed(2)}</span>
        </div>
        <div className="border border-border-subtle p-6">
          <span className="text-sm font-accent text-secondary block mb-4">recurring revenue</span>
          <span className="text-3xl">${(totalRevenue * 0.4).toFixed(2)}</span>
        </div>
        <div className="border border-border-subtle p-6">
          <span className="text-sm font-accent text-secondary block mb-4">payroll (mtd)</span>
          <span className="text-3xl text-secondary">${payroll.toFixed(2)}</span>
        </div>
        <div className="border border-border-subtle p-6">
          <span className="text-sm font-accent text-secondary block mb-4">avg rating</span>
          <span className="text-3xl">4.9</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Scheduling / Route Optimization */}
        <div>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl">scheduling & routes</h2>
            <button className="text-sm font-accent text-secondary hover:text-white">optimize routes →</button>
          </div>
          <div className="flex flex-col gap-4">
            {bookings.filter(b => b.status !== 'completed').map((booking) => (
              <div key={booking.id} className="border border-border-subtle p-5 flex justify-between items-center bg-[#111]">
                <div>
                  <h4 className="text-lg mb-1">{booking.customer?.full_name}</h4>
                  <span className="text-sm text-secondary font-accent">
                    {new Date(booking.scheduled_date).toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-sm mb-2">{booking.cleaner?.full_name || 'unassigned'}</span>
                  <select className="bg-transparent border border-border-subtle text-sm text-secondary p-1">
                    <option>reassign</option>
                    <option>Carlos Cleaner</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Management & Reviews */}
        <div>
          <h2 className="text-2xl mb-8">recent activity</h2>
          <div className="flex flex-col gap-4">
            {bookings.filter(b => b.status === 'completed').map((booking) => (
              <div key={booking.id} className="border border-border-subtle p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg">{booking.customer?.full_name}</h4>
                    <span className="text-sm text-secondary">{booking.service_type}</span>
                  </div>
                  <span className="text-sm font-accent text-secondary">
                    {new Date(booking.scheduled_date).toLocaleDateString()}
                  </span>
                </div>
                
                {booking.reviews?.[0] ? (
                  <div className="bg-[#222] p-4 text-sm mt-4">
                    <div className="text-white mb-2">{'★'.repeat(booking.reviews[0].rating)}</div>
                    <p className="text-secondary">"{booking.reviews[0].comment}"</p>
                  </div>
                ) : (
                  <span className="text-sm text-secondary italic mt-4 block">pending review</span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
