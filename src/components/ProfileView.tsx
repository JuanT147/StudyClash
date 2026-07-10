import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, CosmeticItem, AppScreen } from '../types';
import { Award, Gamepad2, Percent, Flame, Trophy, Lock, UserRoundPen, Bell, HelpCircle, LogOut, Sparkles, X, BookOpen, CheckCircle, Lightbulb } from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  cosmetics: CosmeticItem[];
  activeAvatarImage: string;
  onNavigate: (screen: AppScreen) => void;
  onLogout: () => void;
  onOpenPremium: () => void;
}

export default function ProfileView({
  user,
  cosmetics,
  activeAvatarImage,
  onNavigate,
  onLogout,
  onOpenPremium
}: ProfileViewProps) {
  const [showHelp, setShowHelp] = useState(false);

  // Achievements static list
  const achievements = [
    { id: '1', title: 'Primer PDF', icon: 'picture_as_pdf', unlocked: true, desc: 'Subiste tu primer PDF de estudio.' },
    { id: '2', title: 'Maestro del Duelo', icon: 'military_tech', unlocked: true, desc: 'Ganaste 5 duelos multijugador.' },
    { id: '3', title: '7 Días Seguidos', icon: 'calendar_today', unlocked: true, desc: 'Mantuviste tu racha por una semana.' },
    { id: '4', title: 'Cerebro de Oro', icon: 'psychology', unlocked: false, desc: 'Resuelve 50 preguntas sin equivocarte.' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 max-w-md mx-auto pb-10"
    >
      {/* Profile Hero Card */}
      <section className="flex flex-col items-center py-4 bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="relative">
          {/* Avatar ring */}
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
            <img
              className="w-full h-full object-cover"
              alt="Profile Avatar"
              src={activeAvatarImage}
            />
          </div>

          {/* Level Pill */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#2b6cb0] dark:bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-black shadow-lg flex items-center justify-center gap-1 min-w-[70px]">
            LVL {user.level}
            {user.isPremium && <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300 animate-pulse" />}
          </div>
        </div>

        <div className="mt-6 text-center space-y-1 px-4">
          <h2 className="font-display font-extrabold text-2xl text-gray-800 dark:text-white">
            {user.username}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{user.institution}</p>
          {user.bio ? (
            <p className="text-gray-400 dark:text-gray-500 text-xs italic mt-2 max-w-xs">{user.bio}</p>
          ) : (
            <p className="text-gray-400 dark:text-gray-500 text-xs italic mt-2">"Sin biografía definida."</p>
          )}
        </div>
      </section>

      {/* Progress Box */}
      <section className="bg-white dark:bg-[#1e293b] p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-3">
        <div className="flex justify-between items-end">
          <div>
            <span className="font-sans text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">
              Próximo Rango
            </span>
            <h3 className="font-display font-extrabold text-lg text-gray-800 dark:text-white">
              Nivel {user.level + 1}
            </h3>
          </div>
          <span className="font-mono text-sm font-bold text-gray-500 dark:text-gray-400">
            {user.xp} / {user.maxXp} XP
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-3.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(user.xp / user.maxXp) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-blue-500 to-[#2b6cb0] rounded-full"
          />
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
          ¡Solo te faltan {user.maxXp - user.xp} XP para subir de rango!
        </p>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-3 gap-3">
        {/* Games Card */}
        <div className="bg-white dark:bg-[#1e293b] p-3 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center space-y-1">
          <Gamepad2 className="w-5 h-5 text-blue-500" />
          <span className="font-mono text-base font-black text-gray-800 dark:text-white">124</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Partidas</span>
        </div>

        {/* Accuracies Card */}
        <div className="bg-white dark:bg-[#1e293b] p-3 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center space-y-1">
          <Percent className="w-5 h-5 text-amber-500" />
          <span className="font-mono text-base font-black text-gray-800 dark:text-white">88%</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Aciertos</span>
        </div>

        {/* Streak Card */}
        <div className="bg-white dark:bg-[#1e293b] p-3 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center space-y-1">
          <Flame className="w-5 h-5 text-red-500 fill-red-500" />
          <span className="font-sans text-base font-black text-gray-800 dark:text-white">7 días</span>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Racha</span>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#2b6cb0]" />
            <h3 className="font-display font-extrabold text-base text-gray-800 dark:text-white">
              Logros Recientes
            </h3>
          </div>
          <button className="text-xs text-[#2b6cb0] font-bold">Ver todos</button>
        </div>

        {/* Horizontal Scrolling Achievements list */}
        <div className="flex gap-4 overflow-x-auto pb-1 hide-scrollbar">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex flex-col items-center p-3 bg-white dark:bg-[#1e293b] rounded-2xl border min-w-[100px] shadow-sm flex-shrink-0 relative transition-transform bouncy-tap ${
                achievement.unlocked
                  ? 'border-gray-100 dark:border-gray-800'
                  : 'border-dashed border-gray-200 dark:border-gray-700 opacity-60 grayscale'
              }`}
            >
              {/* Badge Icon Slot */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-inner ${
                achievement.id === '1'
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-[#2b6cb0]'
                  : achievement.id === '2'
                  ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-600'
                  : achievement.id === '3'
                  ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
              }`}>
                {!achievement.unlocked ? (
                  <Lock size={18} />
                ) : (
                  <span className="material-symbols-outlined text-2xl select-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {achievement.icon}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold text-gray-800 dark:text-white text-center w-18 leading-tight truncate">
                {achievement.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Settings / Action Links List */}
      <section className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
        {/* Edit Profile */}
        <button
          onClick={() => onNavigate(AppScreen.EDIT_PROFILE)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors bouncy-tap text-left"
        >
          <div className="flex items-center gap-3">
            <UserRoundPen className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-semibold text-gray-800 dark:text-white">Editar Perfil</span>
          </div>
          <span className="material-symbols-outlined text-gray-400 select-none">chevron_right</span>
        </button>

        {/* Notifications */}
        <button
          onClick={onOpenPremium}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors bouncy-tap text-left"
        >
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-semibold text-gray-800 dark:text-white">Notificaciones</span>
          </div>
          <span className="material-symbols-outlined text-gray-400 select-none">chevron_right</span>
        </button>

        {/* Help */}
        <button
          onClick={() => setShowHelp(true)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors bouncy-tap text-left"
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-semibold text-gray-800 dark:text-white">Ayuda e Instrucciones</span>
          </div>
          <span className="material-symbols-outlined text-gray-400 select-none">chevron_right</span>
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-between p-4 hover:bg-red-50/50 dark:hover:bg-red-950/10 transition-colors bouncy-tap text-left"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-red-500" />
            <span className="text-sm font-semibold text-red-500">Cerrar Sesión</span>
          </div>
        </button>
      </section>

      {/* Custom Help Modal Overlay */}
      <AnimatePresence>
        {showHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelp(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white dark:bg-[#0f172a] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-4 text-left z-10"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <h4 className="font-display font-extrabold text-lg text-gray-900 dark:text-white">
                    Guía de StudyClash
                  </h4>
                </div>
                <button
                  onClick={() => setShowHelp(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Description Steps */}
              <div className="space-y-4 py-2">
                <div className="flex gap-3 items-start">
                  <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-500 mt-0.5">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Paso 1: Sube un PDF</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                      Ve a la pestaña <strong>Iniciar Desafío</strong> y arrastra o selecciona tus apuntes, resúmenes o libros de clase en formato PDF.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-500 mt-0.5">
                    <Lightbulb size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Paso 2: Genera la Trivia</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                      La IA de StudyClash analizará el texto para crear un set interactivo de preguntas adaptadas a tu nivel académico actual.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 mt-0.5">
                    <Trophy size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Paso 3: Gana y Compite</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                      Resuelve las preguntas solo o desafía a tus compañeros compartiendo el código de sala. ¡Gana monedas para canjear skins exclusivas en la tienda!
                    </p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => setShowHelp(false)}
                className="w-full bg-[#2b6cb0] hover:bg-[#235891] dark:bg-[#3182ce] dark:hover:bg-[#2b6cb0] text-white font-extrabold text-xs py-3 rounded-xl transition-all"
              >
                ¡Entendido, a Estudiar!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
