import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  
  // Booking Form State
  const [category, setCategory] = useState('STD');
  const [homeType, setHomeType] = useState('D');
  const [bedrooms, setBedrooms] = useState('1');
  const [bathrooms, setBathrooms] = useState('1');
  const [recurring, setRecurring] = useState('N');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [simulatingPay, setSimulatingPay] = useState(false);

  useEffect(() => {
    const fetchUserAndData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/portal/login');
        return;
      }
      setUser(user);
      
      const statusOrder: Record<string, number> = {
        confirmed: 1,
        pending: 2,
        completed: 3,
        canceled: 4,
      };
      const { data: bookingsData, error:err } = await supabase
        .from('bookings')
        .select(`
          *,
          cleaner:profiles!bookings_cleaner_id_fkey (
            full_name
          )`)
        .eq('customer_id', user.id)
        .order('scheduled_date', { ascending: false });
        
      console.log(bookingsData, err)
      if (bookingsData) {
        bookingsData.sort((a, b) => {
          // First, compare by scheduled_date descending
          const dateCompare = new Date(b.scheduled_date).getTime() - new Date(a.scheduled_date).getTime();
          if (dateCompare !== 0) return dateCompare;

          // If dates are identical, sort by status priority
          const priorityA = statusOrder[a.status] ?? 99;
          const priorityB = statusOrder[b.status] ?? 99;

          return priorityA - priorityB;
        });
      }
      if (bookingsData) setBookings(bookingsData);
    };
    fetchUserAndData();
  }, [navigate]);

  const calculatePrice = (n=false) => {
    let base = 0;
    switch (category){
      case 'LTE': base = 45;break;
      case 'STD': base = 100;break;
      case 'INS': base = 150;break;
      case 'MOV': base = 200;break;
      case 'DEP': base = 250;break;
    }
    switch (bedrooms){
      case '1': base-=20;break;
      case '3': base+=40;break;
      case '4': base+=60;break;
    }
    switch (bathrooms){
      case '2': base+=5;break;
      case '3': base+=10;break;
    }
    switch (homeType){
      case 'D': base*=0.7;break;
      case 'A': base-=10;break;
      case 'T': base+=50;break;
      case 'H': base*=1.5;break;
    }
    // if (homeSize.includes('4+ bed')) base += 100;
    let discount=1;
    if (recurring=='W') discount=0.80
    if (recurring=='B') discount=0.90
    if (n==true) return Math.floor(base*discount);
    // console.log(`SCL-${category}-${homeType+bedrooms+bathrooms}-${recurring}00`)
    return (<span className="text-3xl">{(recurring== 'W' || recurring=='B') && (<span className="text-black/50 line-through">${Math.round(base)}</span>)}<span> ${Math.floor(base*discount)}</span></span>)
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
          sku:`SCL-${category}-${homeType+bedrooms+bathrooms}-${recurring}00`,
          data:{"sku_descriptions":{category:category,item:`${homeType} ${bedrooms} bed ${bathrooms} bath`,recurring:recurring}},
          special_instructions: `Address: ${address}`,
        })
        .select();

      setSimulatingPay(false);
      if (!error && data) {
        setBookings([data[0], ...bookings]);
        alert('Payment successful and cleaning booked!');
      } else {
        alert('Error booking cleaning.');
        console.log(error)
      }
    }, 1500);
  };

  return (
    <div className="max-w-350 mx-auto px-2 md:px-8 py-16">
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
        {/* Previous/Upcoming Cleanings */}
        <div className="lg:col-span-7">
          <h2 className="text-2xl mb-8">your cleanings</h2>
          <div className="flex flex-col gap-4">
            {bookings.length === 0 ? (
              <p className="text-secondary border border-border-subtle p-8 text-center">no cleanings scheduled yet.</p>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className={`border ${booking.status == 'completed' ? 'bg-neutral-300/80' : booking.status == 'canceled' ? 'bg-red-100/80' : booking.status== 'confirmed' ? 'bg-green-100/80' :''} border-border-subtle p-6 flex flex-col gap-4`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm text-secondary font-accent uppercase tracking-wider block mb-2">
                        {new Date(booking.scheduled_date).toLocaleDateString()}
                      </span>
                      <h3 className="text-xl">{booking.data?.sku_descriptions?.category} cleaning</h3>
                      <p className="text-secondary mt-1">status: {booking.status}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl">${booking.price}</span>
                    </div>
                  </div>
                  
                  {booking.cleaner_id && (
                    <div className="mt-4 pt-4 border-t border-border-subtle flex justify-between items-center">
                      <span className="text-secondary text-sm">assigned cleaner: {booking.cleaner.full_name}</span>
                      <span className="text-white text-sm bg-[#222] px-3 py-1">notification sent</span>
                    </div>
                  )}

                  {/* Photos section (mock visual) */}
                  {booking.status === 'completed' && (
                    <div className="mt-4 flex gap-4">
                      <div className="h-24 w-24 bg-[#222] border border-border-subtle flex items-center justify-center text-xs text-white">before photo</div>
                      <div className="h-24 w-24 bg-[#222] border border-border-subtle flex items-center justify-center text-xs text-white">after photo</div>
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

        {/* Book a new cleaning */}
        <div className="lg:col-span-5">
          <h2 className="text-2xl mb-8">book a cleaning</h2>
          <form onSubmit={handleBook} className="flex flex-col gap-6 p-4 sm:p-8 border border-border-subtle">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-secondary font-accent">home type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)} className="bg-black border border-border-subtle p-3 focus:outline-none focus:border-accent transition-colors text-white">
                <option value="D">Dorm (roomates)</option>
                <option value="A">Apartment (self / family)</option>
                <option value="T">Town-Home</option>
                <option value="H">Home</option>
              </select>
            </div>

            <p className='text-xs italic text-black/80 -mb-5'>*select what rooms/baths to be cleaned</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-secondary font-accent">bedrooms</label>
                <select value={bedrooms} onChange={e => setBedrooms(e.target.value)} className="bg-black border border-border-subtle p-3 focus:outline-none focus:border-accent transition-colors text-white">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-secondary font-accent">bathrooms</label>
                <select value={bathrooms} onChange={e => setBathrooms(e.target.value)} className="bg-black border border-border-subtle p-3 focus:outline-none focus:border-accent transition-colors text-white">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="flex flex-col col-span-2 gap-2">
                <label className="text-sm text-secondary font-accent">service</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="bg-black border border-border-subtle p-3 focus:outline-none focus:border-accent transition-colors text-white">
                  <option value="LTE">lite clean</option>
                  <option value="STD">standard clean</option>
                  {homeType=='D' && (<option value="INS">inspection clean</option>)}
                  <option value="MOV">move-out clean</option>
                  <option value="DEP">deep clean</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-secondary font-accent">date & time *</label>
              <input type="datetime-local" required value={date} onChange={e => setDate(e.target.value)} className="bg-transparent border border-border-subtle p-3 focus:outline-none focus:border-accent transition-colors [color-scheme:dark]" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-secondary font-accent">address *</label>
              <input type="text" required value={address} onChange={e => setAddress(e.target.value)} className="bg-transparent border border-border-subtle p-3 focus:outline-none focus:border-accent transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-secondary font-accent">recurring schedule</label>
              <select value={recurring} onChange={e => setRecurring(e.target.value)} className="bg-black border border-border-subtle p-3 focus:outline-none focus:border-accent transition-colors text-white">
                <option value="N">just once</option>
                <option value="W">weekly (-20%)</option>
                <option value="B">biweekly (-10%)</option>
                <option value="M">monthly</option>
              </select>
            </div>

            <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col gap-4 sm:flex-row lg:flex-col justify-between items-center">
              <div className='text-center'>
                <span className="block text-sm text-secondary font-accent">exact price:</span>
                {calculatePrice()}
              </div>
              <button type="submit" disabled={simulatingPay} className="btn-primary">
                {simulatingPay ? 'processing payment...' : 'pay & book →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
