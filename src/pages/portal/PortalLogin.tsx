import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function PortalLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Signup successful! You can now log in.');
        setIsSignUp(false);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        // Fetch role
        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();
            
          if (profile?.role === 'manager') {
            navigate('/portal/manager');
          } else if (profile?.role === 'cleaner') {
            navigate('/portal/cleaner');
          } else {
            navigate('/portal/customer');
          }
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-32 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md">
        <span className="font-accent text-sm text-secondary tracking-widest block mb-8 text-center">
          system access
        </span>
        <h1 className="text-3xl mb-12 text-center">
          {isSignUp ? 'create account' : 'portal login'}
        </h1>
        
        <form onSubmit={handleAuth} className="flex flex-col gap-6">
          {error && <div className="text-red-500 text-sm border border-red-500/30 p-4 bg-red-500/10">{error}</div>}
          
          <div className="flex flex-col gap-2">
            <label className="text-sm text-secondary font-accent">email address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-subtle p-4 focus:outline-none focus:border-white transition-colors"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm text-secondary font-accent">password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-subtle p-4 focus:outline-none focus:border-white transition-colors"
              required
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-4">
            {loading ? 'processing...' : (isSignUp ? 'sign up →' : 'log in →')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-secondary text-sm hover:text-white transition-colors"
          >
            {isSignUp ? 'already have an account? > log in <' : 'need an account? > sign up <'}
          </button>
        </div>
      </div>
    </div>
  );
}
