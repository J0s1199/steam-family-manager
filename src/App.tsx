import React, { useState, useMemo, useEffect } from 'react';
import { User, FamilyStats, Game } from './types';
import { StatCard } from './components/StatCard';
import { GameModal } from './components/GameModal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useSession } from './components/SessionContextProvider';
import { supabase } from './integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const MAX_USERS = 6;
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const App: React.FC = () => {
  const { session, user: authUser } = useSession();
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('steam_family_v2');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showGameModal, setShowGameModal] = useState(false);
  const [view, setView] = useState<'dashboard' | 'my-profile'>('dashboard');

  useEffect(() => {
    if (!session) {
      navigate('/login');
    } else {
      // For now, we'll simulate a currentUser based on the authUser.
      // In a real app, you'd fetch the profile from the 'profiles' table.
      setCurrentUser({
        id: authUser?.id || '',
        name: authUser?.email?.split('@')[0] || 'Usuario', // Placeholder name
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser?.id}`,
        moneySpent: 0, // These will be fetched from DB later
        gamesCount: 0, // These will be fetched from DB later
        games: [] // These will be fetched from DB later
      });
    }
  }, [session, authUser, navigate]);

  useEffect(() => {
    localStorage.setItem('steam_family_v2', JSON.stringify(users));
  }, [users]);

  const stats: FamilyStats = useMemo(() => {
    const totalSpent = users.reduce((acc, u) => acc + u.moneySpent, 0);
    const totalGames = users.reduce((acc, u) => acc + u.gamesCount, 0);
    const averageSpentPerUser = users.length > 0 ? totalSpent / users.length : 0;
    return { totalSpent, totalGames, averageSpentPerUser };
  }, [users]);

  const addGame = (name: string, price: number, date: string) => {
    if (!currentUser) return;
    const newGame: Game = { id: crypto.randomUUID(), name, price, purchaseDate: date };
    
    const updatedUsers = users.map(u => {
      if (u.id === currentUser.id) {
        const updatedUser = {
          ...u,
          games: [newGame, ...u.games],
          gamesCount: u.gamesCount + 1,
          moneySpent: u.moneySpent + price
        };
        setCurrentUser(updatedUser);
        return updatedUser;
      }
      return u;
    });
    
    setUsers(updatedUsers);
    setShowGameModal(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    navigate('/login');
  };

  if (!session) {
    return null; // Redirect handled by SessionContextProvider
  }

  return (
    <div className="min-h-screen pb-12">
      <header className="steam-gradient py-6 px-4 border-b border-blue-900/50 shadow-xl mb-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('dashboard')}>
            <i className="fa-brands fa-steam text-4xl text-blue-400"></i>
            <h1 className="text-xl font-black text-white uppercase tracking-tighter hidden sm:block">Family Manager</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <nav className="flex gap-4 mr-4">
              <button 
                onClick={() => setView('dashboard')}
                className={`text-sm font-bold uppercase tracking-widest ${view === 'dashboard' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                Resumen Grupal
              </button>
              <button 
                onClick={() => setView('my-profile')}
                className={`text-sm font-bold uppercase tracking-widest ${view === 'my-profile' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                Mis Juegos
              </button>
            </nav>
            <div className="flex items-center gap-3 bg-black/20 p-2 rounded-lg border border-white/5">
              <img src={currentUser?.avatar} className="w-8 h-8 rounded bg-blue-500/20" alt="" />
              <span className="text-sm font-bold text-white hidden md:inline">{currentUser?.name}</span>
              <button onClick={logout} className="text-gray-400 hover:text-red-400 ml-2" title="Cerrar Sesión">
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        {view === 'dashboard' ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Inversión Familiar" value={`$${stats.totalSpent.toLocaleString()}`} icon="fa-solid fa-money-bill-trend-up" colorClass="bg-green-500/10 text-green-400" />
              <StatCard title="Biblioteca Colectiva" value={`${stats.totalGames} Juegos`} icon="fa-solid fa-layer-group" colorClass="bg-blue-500/10 text-blue-400" />
              <StatCard title="Miembros" value={`${users.length} / ${MAX_USERS}`} icon="fa-solid fa-users-viewfinder" colorClass="bg-purple-500/10 text-purple-400" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50">
                <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm opacity-70">Ranking de Inversión</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={users}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                      <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                      <Bar dataKey="moneySpent" radius={[4, 4, 0, 0]}>
                        {users.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700/50">
                <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-widest text-sm opacity-70">Lista de Miembros</h3>
                <div className="space-y-3">
                  {users.map((u, i) => (
                    <div key={u.id} className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full`} style={{backgroundColor: COLORS[i % COLORS.length]}}></div>
                        <img src={u.avatar} className="w-10 h-10 rounded shadow-lg" alt="" />
                        <div>
                          <p className="font-bold text-white leading-none">{u.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{u.gamesCount} juegos</p>
                        </div>
                      </div>
                      <p className="font-mono font-bold text-green-400">${u.moneySpent.toLocaleString()}</p>
                    </div>
                  ))}
                  {users.length === 0 && <p className="text-center text-gray-500 py-8">No hay miembros en el grupo.</p>}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-black text-white uppercase italic">Mi Biblioteca Personal</h2>
                <p className="text-blue-300">Has invertido <span className="text-green-400 font-bold">${currentUser?.moneySpent.toLocaleString()}</span> en {currentUser?.gamesCount} juegos.</p>
              </div>
              <button 
                onClick={() => setShowGameModal(true)}
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-900/20 transition-all"
              >
                <i className="fa-solid fa-plus"></i>
                Registrar Compra
              </button>
            </div>

            <div className="bg-gray-800/30 rounded-2xl border border-gray-700/50 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-black/40 text-xs font-bold uppercase tracking-widest text-gray-400 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-4">Juego</th>
                    <th className="px-6 py-4">Precio</th>
                    <th className="px-6 py-4">Fecha de Compra</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {currentUser?.games.map(game => (
                    <tr key={game.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">{game.name}</td>
                      <td className="px-6 py-4 font-mono text-green-400 font-bold">${game.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-gray-400">{new Date(game.purchaseDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {(!currentUser?.games || currentUser.games.length === 0) && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-gray-500">Aún no has registrado ningún juego.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {showGameModal && <GameModal onClose={() => setShowGameModal(false)} onAdd={addGame} />}
      
      <footer className="mt-20 border-t border-gray-800 pt-8 text-center text-gray-500 text-xs uppercase tracking-widest opacity-50">
        <p>&copy; 2024 Steam Family Manager. No oficial.</p>
      </footer>
    </div>
  );
};

export default App;