
import React from 'react';
import { User } from '../types';

interface UserCardProps {
  user: User;
  onDelete: (id: string) => void;
  onUpdate: (id: string, field: 'moneySpent' | 'gamesCount', value: number) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onDelete, onUpdate }) => {
  return (
    <div className="bg-[#2a475e] rounded-xl overflow-hidden card-shadow border border-blue-900/30 transition-all hover:scale-[1.02]">
      <div className="p-4 flex items-center gap-4 bg-black/20">
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="w-16 h-16 rounded-lg object-cover border-2 border-blue-500/50"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white truncate">{user.name}</h3>
          <p className="text-blue-300 text-xs font-mono">ID: {user.id.slice(0, 8)}</p>
        </div>
        <button 
          onClick={() => onDelete(user.id)}
          className="text-gray-400 hover:text-red-400 p-2 transition-colors"
          title="Eliminar usuario"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center bg-black/10 p-3 rounded-lg">
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold">Inversión</p>
            <p className="text-xl font-bold text-green-400">${user.moneySpent.toLocaleString()}</p>
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => onUpdate(user.id, 'moneySpent', Math.max(0, user.moneySpent - 10))}
              className="w-8 h-8 rounded bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
            >
              -
            </button>
            <button 
              onClick={() => onUpdate(user.id, 'moneySpent', user.moneySpent + 10)}
              className="w-8 h-8 rounded bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center bg-black/10 p-3 rounded-lg">
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold">Juegos</p>
            <p className="text-xl font-bold text-blue-400">{user.gamesCount}</p>
          </div>
          <div className="flex gap-1">
             <button 
              onClick={() => onUpdate(user.id, 'gamesCount', Math.max(0, user.gamesCount - 1))}
              className="w-8 h-8 rounded bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
            >
              -
            </button>
            <button 
              onClick={() => onUpdate(user.id, 'gamesCount', user.gamesCount + 1)}
              className="w-8 h-8 rounded bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
