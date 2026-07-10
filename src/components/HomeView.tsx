import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { AppScreen, UserProfile, CosmeticItem } from '../types';
import { BookOpen, Check, Star, Users, ArrowRight, Sparkles, Plus } from 'lucide-react';

interface HomeViewProps {
  user: UserProfile;
  cosmetics: CosmeticItem[];
  onNavigate: (screen: AppScreen) => void;
  onOpenPremium: () => void;
  onEquipCosmetic: (id: string) => void;
  onJoinRoom: (code: string) => void;
}

export default function HomeView({
  user,
  cosmetics,
  onNavigate,
  onOpenPremium,
  onEquipCosmetic,
  onJoinRoom
}: HomeViewProps) {
  const [roomCode, setRoomCode] = useState('');

  // Filter cosmetics to show on the dashboard (first 4)
  const dashboardCosmetics = cosmetics.slice(0, 4);

  const handleJoin = (e: FormEvent) => {
    e.preventDefault();
    if (roomCode.trim().length > 0) {
      onJoinRoom(roomCode);
    } else {
      // Join a random room if blank
      onJoinRoom('734291');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      {/* Promo/Hero Banner */}
      <section className="bg-gradient-to-br from-[#005394] to-[#2b6cb0] text-white p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden">
        {/* Decorative background shape */}
        <div className="absolute top-0 right-0 opacity-15 transform translate-x-1/4 -translate-y-1/4 select-none pointer-events-none">
          <BookOpen size={160} className="text-white" />
        </div>

        <div className="relative z-10 max-w-lg space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-100 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 fill-blue-100" />
            Novedad: Temporada 1
          </div>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight leading-tight">
            Transforma tus PDFs en batallas multijugador
          </h2>
          <p className="text-blue-100/90 text-sm md:text-base">
            Sube de nivel estudiando con tus amigos de forma interactiva y divertida.
          </p>
        </div>
      </section>

      {/* Pricing / Plan Section */}
      <section className="grid grid-cols-2 gap-4">
        {/* Free Plan Card */}
        <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-sans text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">
              Plan Free
            </span>
            <h3 className="font-display font-extrabold text-xl text-gray-800 dark:text-white mt-1">
              Gratis
            </h3>
            <ul className="mt-3 space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-gray-400" />
                15 PDFs/mes
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-gray-400" />
                Salas básicas
              </li>
            </ul>
          </div>
          <button 
            disabled={!user.isPremium}
            className={`mt-4 w-full py-2 border rounded-xl font-bold text-xs transition-colors ${
              user.isPremium
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-[#2b6cb0] text-[#2b6cb0] bg-blue-50/50 dark:bg-transparent'
            }`}
          >
            {user.isPremium ? 'Estándar' : 'Plan Actual'}
          </button>
        </div>

        {/* Premium Plan Card */}
        <div className={`p-4 rounded-2xl border-2 flex flex-col justify-between relative transition-all ${
          user.isPremium
            ? 'border-amber-500 bg-amber-50/20 dark:bg-amber-950/10 shadow-md'
            : 'border-amber-400 bg-white dark:bg-[#1e293b] shadow-sm premium-glow'
        }`}>
          {/* Top Tag */}
          <div className="absolute -top-2.5 right-3 bg-amber-500 text-[#1a365d] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
            Top
          </div>
          
          <div>
            <span className="font-sans text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
              Premium
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <h3 className="font-display font-extrabold text-xl text-gray-800 dark:text-white">
                S/.15.00
              </h3>
              <span className="text-[10px] text-gray-400">/mes</span>
            </div>
            <ul className="mt-3 space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
              <li className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                PDFs ilimitados
              </li>
              <li className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                Skins exclusivas
              </li>
            </ul>
          </div>
          <button
            onClick={onOpenPremium}
            className={`mt-4 w-full py-2 font-bold rounded-xl text-xs transition-all bouncy-tap ${
              user.isPremium
                ? 'bg-amber-500 text-[#1a365d]'
                : 'bg-amber-500 hover:bg-amber-600 text-[#1a365d] hover:text-white'
            }`}
          >
            {user.isPremium ? 'Plan Actual' : 'Hazte Premium'}
          </button>
        </div>
      </section>

      {/* Main Action Greeting Box */}
      <section className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800/80">
        <h3 className="font-display font-extrabold text-xl text-gray-800 dark:text-white leading-tight">
          ¡Hola, {user.username}!
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
          ¿Listo para el clash de estudio de hoy?
        </p>

        <div className="mt-6 space-y-4">
          {/* Create Room Button */}
          <button
            onClick={() => onNavigate(AppScreen.PLAY_UPLOAD)}
            className="w-full bg-[#2b6cb0] hover:bg-blue-600 text-white p-5 rounded-2xl flex items-center justify-between group bouncy-tap shadow-md hover:shadow-lg transition-all"
          >
            <div className="text-left space-y-1">
              <span className="font-display font-extrabold text-lg block">Crear Nueva Sala</span>
              <span className="text-blue-100/80 text-xs block">Sube un PDF y empieza el duelo</span>
            </div>
            <div className="bg-white/20 p-3 rounded-full group-hover:scale-115 transition-transform">
              <Plus className="w-6 h-6 text-white" />
            </div>
          </button>

          {/* Join Room Form */}
          <div className="bg-gray-50 dark:bg-[#0f172a]/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-gray-800 dark:text-white">Unirse a una Sala</span>
              <Users className="w-6 h-6 text-[#2b6cb0]" />
            </div>
            <form onSubmit={handleJoin} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Código de 6 dígitos"
                className="flex-grow bg-white dark:bg-[#1e293b] border-2 border-gray-200 dark:border-gray-800 focus:border-[#2b6cb0] dark:focus:border-blue-500 rounded-xl px-4 py-2.5 text-center text-lg font-mono font-bold uppercase tracking-wider text-gray-800 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              />
              <button
                type="submit"
                className="bg-[#2b6cb0] hover:bg-blue-600 text-white font-bold px-6 rounded-xl bouncy-tap transition-all shadow-sm flex items-center justify-center"
              >
                IR
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Cosmetics shop summary */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-display font-extrabold text-lg text-gray-800 dark:text-white">
            Tus Cosméticos
          </h3>
          <button
            onClick={() => onNavigate(AppScreen.SHOP)}
            className="text-[#2b6cb0] hover:text-blue-600 font-bold text-xs flex items-center gap-0.5"
          >
            Ver todos <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {dashboardCosmetics.map((item) => {
            const isLocked = item.status === 'locked' && !(item.isPremiumExclusive && user.isPremium);
            
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isLocked) {
                    onEquipCosmetic(item.id);
                  } else if (item.isPremiumExclusive) {
                    onOpenPremium();
                  } else {
                    onNavigate(AppScreen.SHOP);
                  }
                }}
                className={`bg-white dark:bg-[#1e293b] p-2 rounded-2xl border shadow-sm relative overflow-hidden cursor-pointer group bouncy-tap transition-all ${
                  item.status === 'equipped'
                    ? 'border-[#2b6cb0] ring-2 ring-[#2b6cb0]/25'
                    : 'border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                {/* Lock Overlay */}
                {isLocked && (
                  <div className="absolute inset-0 bg-gray-100/50 dark:bg-gray-900/60 backdrop-blur-[1px] flex flex-col items-center justify-center z-10 p-2">
                    <span className="material-symbols-outlined text-amber-600 text-lg mb-1 bg-amber-100 p-1 rounded-full select-none">
                      lock
                    </span>
                    <span className="text-[8px] font-black text-amber-700 uppercase tracking-widest text-center">
                      {item.isPremiumExclusive ? 'Premium Exclusivo' : 'Tienda'}
                    </span>
                  </div>
                )}

                {/* Equipped Badge */}
                {item.status === 'equipped' && (
                  <div className="absolute top-2 right-2 bg-[#2b6cb0] text-white p-1 rounded-full z-10 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}

                <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800/50">
                  <img
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                      isLocked ? 'grayscale opacity-55' : ''
                    }`}
                    alt={item.name}
                    src={item.image}
                  />
                </div>

                <div className="pt-2 px-1 pb-1">
                  <p className="font-bold text-gray-800 dark:text-white text-xs truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {item.status === 'equipped'
                      ? 'Equipado'
                      : item.status === 'unlocked'
                      ? 'Desbloqueado'
                      : 'Bloqueado'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
