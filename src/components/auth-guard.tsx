import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check initial auth state
    const sessionStr = localStorage.getItem('sb-dbprbdmabmwnvngzpkmn-auth-token');
    setLoggedIn(!!sessionStr);
    setLoading(false);
  }, []);

  if (loading) {
    return null; // Or a loading spinner
  }

  if (!loggedIn) {
    navigate('/login');
    return null;
  }

  return children;
}

export default AuthGuard;