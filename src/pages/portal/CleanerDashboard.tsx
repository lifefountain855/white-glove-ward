import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function CleanerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserAndData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/portal/login');
        return;
      }
      setUser(user);
      
      const { data: assignmentsData } = await supabase
        .from('bookings')
        .select(`*, customer:profiles!customer_id(full_name, phone), photos(*), reviews(*)`)
        .eq('cleaner_id', user.id)
        .order('scheduled_date', { ascending: true });
        
      if (assignmentsData) setAssignments(assignmentsData);
    };
    fetchUserAndData();
  }, [navigate]);

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-16">
      <header className="mb-16 border-b border-subtle pb-8 flex justify-between items-end">
        <div>
          <span className="font-accent text-sm text-secondary tracking-widest block mb-4">
            cleaner portal
          </span>
          <h1 className="text-4xl">today's route.</h1>
        </div>
        <button 
          onClick={() => { supabase.auth.signOut(); navigate('/portal/login'); }}
          className="text-secondary hover:text-white transition-colors font-accent text-sm"
        >
          sign out
        </button>
      </header>

      <div className="flex flex-col gap-8">
        {assignments.length === 0 ? (
          <p className="text-secondary border border-subtle p-8 text-center">no assignments scheduled.</p>
        ) : (
          assignments.map((assignment) => (
            <div key={assignment.id} className="border border-subtle p-8 flex flex-col md:flex-row gap-12">
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-sm text-secondary font-accent uppercase tracking-wider block mb-2">
                      {new Date(assignment.scheduled_date).toLocaleString()}
                    </span>
                    <h3 className="text-2xl">{assignment.customer?.full_name}</h3>
                    <p className="text-secondary mt-1">{assignment.service_type} clean • {assignment.home_size}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl block mb-1">est. 2.5 hrs</span>
                    <span className={`text-sm px-2 py-1 ${assignment.status === 'completed' ? 'bg-[#222]' : 'border border-subtle'}`}>
                      {assignment.status}
                    </span>
                  </div>
                </div>

                <div className="mt-8 border-t border-subtle pt-6">
                  <h4 className="text-sm font-accent text-secondary mb-4">special instructions</h4>
                  <p className="bg-[#111] border border-subtle p-4 text-sm leading-relaxed">
                    {assignment.special_instructions || 'none provided.'}
                  </p>
                </div>

                <div className="mt-8">
                  <h4 className="text-sm font-accent text-secondary mb-4">checklist</h4>
                  <div className="flex flex-col gap-2">
                    {['dust all surfaces', 'vacuum and mop floors', 'clean bathrooms', 'clean kitchen counters'].map((item, i) => (
                      <label key={i} className="flex items-center gap-3 text-secondary hover:text-white cursor-pointer">
                        <input type="checkbox" className="accent-white w-4 h-4" defaultChecked={assignment.status === 'completed'} />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:w-72 flex flex-col gap-6 md:border-l md:border-subtle md:pl-12">
                <div>
                  <h4 className="text-sm font-accent text-secondary mb-4">action</h4>
                  <div className="flex flex-col gap-3">
                    <button className="btn-secondary text-sm justify-center w-full">upload before photo</button>
                    <button className="btn-secondary text-sm justify-center w-full">upload after photo</button>
                    <button className="btn-primary text-sm justify-center w-full" disabled={assignment.status === 'completed'}>
                      {assignment.status === 'completed' ? 'completed' : 'mark completed'}
                    </button>
                  </div>
                </div>

                {assignment.status === 'completed' && (
                  <>
                    <div className="border-t border-subtle pt-6">
                      <h4 className="text-sm font-accent text-secondary mb-2">payment receipt</h4>
                      <p className="text-xl">${(assignment.price * 0.7).toFixed(2)}</p>
                      <span className="text-xs text-secondary">transfer initiated</span>
                    </div>

                    {assignment.reviews?.[0] && (
                      <div className="border-t border-subtle pt-6">
                        <h4 className="text-sm font-accent text-secondary mb-2">customer rating</h4>
                        <div className="text-xl mb-2">{'★'.repeat(assignment.reviews[0].rating)}</div>
                        <p className="text-sm text-secondary italic">"{assignment.reviews[0].comment}"</p>
                      </div>
                    )}
                  </>
                )}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
