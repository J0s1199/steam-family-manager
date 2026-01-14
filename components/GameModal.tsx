
import React, { useState } from 'react';

interface GameModalProps {
  onClose: () => void;
  onAdd: (name: string, price: number, date: string) => void;
}

export const GameModal: React.FC<GameModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && price) {
      onAdd(name, parseFloat(price), date);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1b2838] border border-blue-900/50 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <i className="fa-solid fa-cart-plus text-green-500"></i>
          Registrar Nuevo Juego
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Nombre del Juego</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/30 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ej: Elden Ring"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Precio ($)</label>
              <input 
                required
                type="number" 
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-black/30 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Fecha</label>
              <input 
                required
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-black/30 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-bold">Cancelar</button>
            <button type="submit" className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
