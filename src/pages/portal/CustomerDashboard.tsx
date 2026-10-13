import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  
  // Booking Form State
  const [address, setAddress] = useState('');
  const [homeSize, setHomeSize] = useState('2 bed, 1 bath');
  const [serviceType, setServiceType] = useState('standard');
  const [date, setDate] = useState('');
  const [recurring, setRecurring] = useState('none');
  const [simulatingPay, setSimulatingPay] = useState(false);

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
        .select(`*, cleaner:profiles!cleaner_id(full_name), photos(*), reviews(*)`)
        .eq('customer_id', user.id)
        .order('scheduled_date', { ascending: false });
        
      if (bookingsData) setBookings(bookingsData);
    };
    fetchUserAndData();
  }, [navigate]);

  const calculatePrice = (n=false) => {
    let base = serviceType === 'standard' ? 150 : serviceType === 'deep' ? 250 : 350;
    if (homeSize.includes('3 bed')) base += 50;
    if (homeSize.includes('4+ bed')) base += 100;
    let discount=1;
    if (recurring=='weekly') discount=0.85
    if (recurring=='biweekly') discount=0.95
    if (n==true) return Math.round(base*discount);
    return (<span className="text-3xl">{(recurring== 'weekly' || recurring=='biweekly') && (<span className="text-black/50 line-through">${base}</span>)}<span> ${Math.round(base*discount)}</span></span>)
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setSimulatingPay(true);
    
    // Simulate payment delay
    setTimeout(async () => {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          customer_id: user?.id,
          scheduled_date: new Date(date).toISOString(),
          home_size: homeSize,
          service_type: serviceType,
          price: calculatePrice(true),
          special_instructions: `Address: ${address}`,
          recurring:recurring,
        })
        .select();

      setSimulatingPay(false);
      if (!error && data) {
        setBookings([data[0], ...bookings]);
        alert('Payment successful and cleaning booked!');
      } else {
        alert('Error booking cleaning.');
      }
    }, 1500);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-2 md:px-8 py-16">
      <header className="mb-16 border-b border-border-subtle pb-8 flex justify-between items-end">
        <div>
          <span className="font-accent text-sm text-secondary tracking-widest block mb-4">
            customer portal
          </span>
          <h1 className="text-4xl">welcome back.</h1>
        </div>
        <button 
          onClick={() => { supabase.auth.signOut(); navigate('/portal/login'); }}
          className="btn-invert"
        >
          sign out
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Book a new cleaning */}
        <div className="lg:col-span-5">
          <h2 className="text-2xl mb-8">book a cleaning</h2>
          <form onSubmit={handleBook} className="flex flex-col gap-6 p-8 border border-border-subtle">
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-secondary font-accent">address *</label>
              <input type="text" required value={address} onChange={e => setAddress(e.target.value)} className="bg-transparent border border-border-subtle p-3 focus:outline-none focus:border-accent transition-colors" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-secondary font-accent">home size</label>
                <select value={homeSize} onChange={e => setHomeSize(e.target.value)} className="bg-black border border-border-subtle p-3 focus:outline-none focus:border-accent transition-colors text-white">
                  <option value="1 bed, 1 bath">1 bed, 1 bath</option>
                  <option value="2 bed, 1 bath">2 bed, 1 bath</option>
                  <option value="2 bed, 2 bath">2 bed, 2 bath</option>
                  <option value="3 bed, 2 bath">3 bed, 2 bath</option>
                  <option value="4+ bed">4+ bed</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-secondary font-accent">service</label>
                <select value={serviceType} onChange={e => setServiceType(e.target.value)} className="bg-black border border-border-subtle p-3 focus:outline-none focus:border-accent transition-colors text-white">
                  <option value="standard">standard clean</option>
                  <option value="deep">deep clean</option>
                  <option value="move-out">move-out clean</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-secondary font-accent">date & time *</label>
              <input type="datetime-local" required value={date} onChange={e => setDate(e.target.value)} className="bg-transparent border border-border-subtle p-3 focus:outline-none focus:border-accent transition-colors [color-scheme:dark]" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-secondary font-accent">recurring schedule</label>
              <select value={recurring} onChange={e => setRecurring(e.target.value)} className="bg-black border border-border-subtle p-3 focus:outline-none focus:border-accent transition-colors text-white">
                <option value="none">just once</option>
                <option value="weekly">weekly (-15%)</option>
                <option value="biweekly">biweekly (-5%)</option>
                <option value="monthly">monthly</option>
              </select>
            </div>

            <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col gap-4 sm:flex-row lg:flex-col justify-between items-center">
              <div className='text-center'>
                <span className="block text-sm text-secondary font-accent">exact price:</span>
                {calculatePrice()}
              </div>
              <button type="submit" disabled={simulatingPay || !address || !date} className="btn-primary">
                {simulatingPay ? 'processing payment...' : 'pay & book →'}
              </button>
            </div>
          </form>
        </div>

        {/* Previous/Upcoming Cleanings */}
        <div className="lg:col-span-7">
          <h2 className="text-2xl mb-8">your cleanings</h2>
          <div className="flex flex-col gap-4">
            {bookings.length === 0 ? (
              <p className="text-secondary border border-border-subtle p-8 text-center">no cleanings scheduled yet.</p>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className="border border-border-subtle p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm text-secondary font-accent uppercase tracking-wider block mb-2">
                        {new Date(booking.scheduled_date).toLocaleDateString()}
                      </span>
                      <h3 className="text-xl">{booking.service_type} clean</h3>
                      <p className="text-secondary mt-1">status: {booking.status}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl">${booking.price}</span>
                    </div>
                  </div>
                  
                  {booking.cleaner && (
                    <div className="mt-4 pt-4 border-t border-border-subtle flex justify-between items-center">
                      <span className="text-secondary text-sm">assigned cleaner: {booking.cleaner.full_name}</span>
                      <span className="text-secondary text-sm bg-[#222] px-3 py-1">notification sent</span>
                    </div>
                  )}

                  {/* Photos section (mock visual) */}
                  {booking.status === 'completed' && (
                    <div className="mt-4 flex gap-4">
                      <div className="h-24 w-24 bg-[#222] border border-border-subtle flex items-center justify-center text-xs text-secondary">before photo</div>
                      <div className="h-24 w-24 bg-[#222] border border-border-subtle flex items-center justify-center text-xs text-secondary">after photo</div>
                      {!booking.reviews?.length && (
                        <div className="ml-auto flex items-end">
                          <button className="btn-secondary text-sm py-1 px-3">rate service</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
