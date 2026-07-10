import { AppScreen } from '../types';
import { Home, Gamepad2, ShoppingBag, User } from 'lucide-react';

interface BottomNavProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  // Determine general active state categories
  const isHomeActive = currentScreen === AppScreen.HOME;
  
  const isPlayActive = [
    AppScreen.PLAY_UPLOAD,
    AppScreen.PLAY_CONFIG,
    AppScreen.PLAY_LOBBY,
    AppScreen.PLAY_GAME,
    AppScreen.PLAY_GAMEOVER
  ].includes(currentScreen);
  
  const isShopActive = currentScreen === AppScreen.SHOP;
  
  const isProfileActive = currentScreen === AppScreen.PROFILE || currentScreen === AppScreen.EDIT_PROFILE;

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 pb-safe bg-white dark:bg-[#0f172a] shadow-[0_-4px_10px_rgba(0,0,0,0.06)] z-50 rounded-t-2xl border-t border-gray-100 dark:border-gray-800/60 md:hidden">
      {/* Home Button */}
      <button
        onClick={() => onNavigate(AppScreen.HOME)}
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl min-w-[64px] bouncy-tap transition-all ${
          isHomeActive
            ? 'bg-[#2b6cb0] text-white'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/40'
        }`}
      >
        <Home size={20} className={isHomeActive ? 'fill-current' : ''} />
        <span className="font-sans text-[10px] font-bold mt-1 tracking-tight">Home</span>
      </button>

      {/* Play Button */}
      <button
        onClick={() => {
          // If we click Play, go to Play Upload screen (Step 1)
          onNavigate(AppScreen.PLAY_UPLOAD);
        }}
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl min-w-[64px] bouncy-tap transition-all ${
          isPlayActive
            ? 'bg-[#2b6cb0] text-white'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/40'
        }`}
      >
        <Gamepad2 size={20} />
        <span className="font-sans text-[10px] font-bold mt-1 tracking-tight">Play</span>
      </button>

      {/* Shop Button */}
      <button
        onClick={() => onNavigate(AppScreen.SHOP)}
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl min-w-[64px] bouncy-tap transition-all ${
          isShopActive
            ? 'bg-[#2b6cb0] text-white'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/40'
        }`}
      >
        <ShoppingBag size={20} className={isShopActive ? 'fill-current' : ''} />
        <span className="font-sans text-[10px] font-bold mt-1 tracking-tight">Shop</span>
      </button>

      {/* Profile Button */}
      <button
        onClick={() => onNavigate(AppScreen.PROFILE)}
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl min-w-[64px] bouncy-tap transition-all ${
          isProfileActive
            ? 'bg-[#2b6cb0] text-white'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/40'
        }`}
      >
        <User size={20} className={isProfileActive ? 'fill-current' : ''} />
        <span className="font-sans text-[10px] font-bold mt-1 tracking-tight">Profile</span>
      </button>
    </nav>
  );
}
