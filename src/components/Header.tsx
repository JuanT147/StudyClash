import { Sparkles, Trophy } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  activeAvatarImage: string;
  onOpenPremium: () => void;
  onNavigateToProfile: () => void;
  onNavigateToHome: () => void;
}

export default function Header({
  user,
  activeAvatarImage,
  onOpenPremium,
  onNavigateToProfile,
  onNavigateToHome
}: HeaderProps) {
  return (
    <header className="w-full sticky top-0 z-40 bg-white dark:bg-[#0f172a] shadow-sm border-b border-gray-100 dark:border-gray-800/50">
      <div className="flex justify-between items-center px-4 md:px-8 py-3 max-w-7xl mx-auto h-16">
        {/* Left Brand Identity */}
        <div 
          onClick={onNavigateToHome}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-full border-2 border-[#2b6cb0] overflow-hidden shadow-md flex items-center justify-center bg-blue-50 dark:bg-blue-900/20">
            <img 
              className="w-full h-full object-cover transition-transform group-hover:scale-110" 
              alt="StudyClash Avatar"
              src={activeAvatarImage}
            />
            {/* Level Tag floating on Avatar */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                onNavigateToProfile();
              }}
              className="absolute bottom-0 right-0 bg-[#2b6cb0] text-white text-[9px] font-extrabold px-1 rounded-tl-md cursor-pointer hover:bg-blue-600"
            >
              LVL {user.level}
            </div>
          </div>
          <h1 className="font-display text-2xl font-extrabold text-[#005394] dark:text-[#a2c9ff] leading-none tracking-tight select-none">
            StudyClash
          </h1>
        </div>

        {/* Right Status Actions */}
        <div className="flex items-center gap-3">
          {/* Coin balance for desktop */}
          <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/20 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-900/30">
            <span className="font-mono text-sm font-extrabold text-amber-600 dark:text-amber-400">{user.coins}</span>
            <span className="material-symbols-outlined text-amber-500 text-lg material-symbols-fill select-none">monetization_on</span>
          </div>

          {/* Premium button or Premium Status banner */}
          {user.isPremium ? (
            <button
              onClick={onOpenPremium}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 text-[#1a365d] font-semibold text-xs px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all animate-pulse"
            >
              <Sparkles className="w-3.5 h-3.5 fill-[#1a365d]" />
              <span className="font-bold tracking-tight">PREMIUM</span>
            </button>
          ) : (
            <button
              onClick={onOpenPremium}
              className="bg-amber-500 hover:bg-amber-600 text-[#1a365d] hover:text-white font-semibold text-xs px-3 py-1.5 md:px-4 md:py-2 rounded-xl shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all font-display tracking-tight"
            >
              Go Premium
            </button>
          )}

          {/* Progress / Profile Shortcut button */}
          <button
            onClick={onNavigateToProfile}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors text-gray-500 dark:text-gray-400 flex items-center justify-center"
            title="Mi Perfil"
          >
            <Trophy className="w-5 h-5 text-[#2b6cb0]" />
          </button>
        </div>
      </div>
    </header>
  );
}
