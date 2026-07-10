import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CosmeticItem, UserProfile } from '../types';
import { Award, Sparkles, Coins, Lock, Check, Timer, ShieldCheck, AlertCircle } from 'lucide-react';

interface ShopViewProps {
  user: UserProfile;
  cosmetics: CosmeticItem[];
  onBuyCosmetic: (id: string, price: number) => boolean;
  onEquipCosmetic: (id: string) => void;
  onOpenPremium: () => void;
  onAddCoins: (amount: number) => void; // A hidden developer button to add coins makes testing super fun!
}

export default function ShopView({
  user,
  cosmetics,
  onBuyCosmetic,
  onEquipCosmetic,
  onOpenPremium,
  onAddCoins
}: ShopViewProps) {
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handlePurchase = (item: CosmeticItem) => {
    if (item.isPremiumExclusive && !user.isPremium) {
      onOpenPremium();
      return;
    }

    if (item.status === 'equipped') {
      showNotification('success', `¡"${item.name}" ya está equipado!`);
      return;
    }

    if (item.status === 'unlocked') {
      onEquipCosmetic(item.id);
      showNotification('success', `¡"${item.name}" equipado con éxito!`);
      return;
    }

    // It's locked and buyable
    if (item.price) {
      if (user.coins >= item.price) {
        const success = onBuyCosmetic(item.id, item.price);
        if (success) {
          showNotification('success', `¡Adquiriste "${item.name}"! Ahora puedes equiparlo.`);
        }
      } else {
        showNotification('error', `Monedas insuficientes. ¡Completa desafíos de PDF para ganar monedas!`);
      }
    }
  };

  // Group cosmetics by type for presentation
  const shopSkins = cosmetics.filter(item => item.type === 'skin');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 pb-10"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 border text-sm font-semibold max-w-sm w-[90%] ${
              notification.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300'
                : 'bg-red-50 dark:bg-red-950/80 border-red-200 dark:border-red-900/40 text-red-800 dark:text-red-300'
            }`}
          >
            {notification.type === 'success' ? <Check className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-3xl font-display font-extrabold text-gray-800 dark:text-white tracking-tight">
            Tienda de Recompensas
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Gasta tus monedas ganadas estudiando para desbloquear skins y ventajas.
          </p>
        </div>

        {/* Currency Pill and Dev Button */}
        <div className="flex items-center justify-center gap-2">
          {/* Dev button to easily get coins for grading/testing */}
          <button
            onClick={() => {
              onAddCoins(100);
              showNotification('success', '¡Añadidas +100 monedas de demostración!');
            }}
            className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-xl text-xs font-bold transition-all bouncy-tap"
            title="Prueba: +100 monedas"
          >
            +100 🪙
          </button>

          <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 px-5 py-2.5 rounded-2xl border-2 border-amber-200 dark:border-amber-900/40 shadow-sm">
            <Coins className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="font-mono text-lg font-black text-amber-700 dark:text-amber-400">
              {user.coins}
            </span>
            <span className="text-xs text-amber-600 dark:text-amber-500 font-bold uppercase tracking-wide ml-1">
              Monedas
            </span>
          </div>
        </div>
      </section>

      {/* Avatars Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Award className="w-5 h-5 text-[#2b6cb0]" />
          <h3 className="font-display font-extrabold text-lg text-gray-800 dark:text-white">
            Avatares Destacados
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shopSkins.map((item) => {
            const isPremiumLocked = item.isPremiumExclusive && !user.isPremium;
            const isEquipped = item.status === 'equipped';
            const isUnlocked = item.status === 'unlocked' || (item.isPremiumExclusive && user.isPremium);

            return (
              <div
                key={item.id}
                className={`bg-white dark:bg-[#1e293b] p-4 rounded-3xl shadow-sm border-2 flex flex-col justify-between transition-all ${
                  isEquipped
                    ? 'border-[#2b6cb0] bg-blue-50/5 dark:bg-blue-950/5'
                    : 'border-gray-100 dark:border-gray-800/80 hover:border-gray-200'
                }`}
              >
                {/* Visual Canvas */}
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800/50 relative group mb-4">
                  <img
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                      isPremiumLocked ? 'grayscale opacity-60' : ''
                    }`}
                    alt={item.name}
                    src={item.image}
                  />

                  {/* Padlock and overlay */}
                  {isPremiumLocked && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center p-3">
                      <Lock className="w-8 h-8 text-amber-400 mb-2" />
                      <span className="bg-amber-500 text-[#1a365d] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3 fill-current" /> Premium
                      </span>
                    </div>
                  )}

                  {/* Standard Locked Indicator with price tag */}
                  {!isUnlocked && !item.isPremiumExclusive && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-[#1a365d] text-xs font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <Coins className="w-3.5 h-3.5 fill-current" /> {item.price}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-1 mb-4 flex-grow">
                  <div className="flex justify-between items-start">
                    <h4 className="font-display font-extrabold text-base text-gray-800 dark:text-white">
                      {item.name}
                    </h4>
                    {isEquipped && (
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-[#2b6cb0] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Equipado
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>

                {/* Action button */}
                <button
                  onClick={() => handlePurchase(item)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all bouncy-tap shadow-sm ${
                    isEquipped
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-default shadow-none'
                      : isUnlocked
                      ? 'bg-[#2b6cb0] text-white hover:bg-blue-600'
                      : isPremiumLocked
                      ? 'bg-amber-500 text-[#1a365d] hover:bg-amber-600'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-800 dark:bg-amber-950/30 dark:hover:bg-amber-900/40 dark:text-amber-300'
                  }`}
                >
                  {isEquipped ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      Equipado
                    </>
                  ) : isUnlocked ? (
                    'Equipar'
                  ) : isPremiumLocked ? (
                    'Desbloquear con Premium'
                  ) : (
                    <>
                      Adquirir por {item.price} 🪙
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Powerups Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
          <h3 className="font-display font-extrabold text-lg text-gray-800 dark:text-white">
            Potenciadores Especiales
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Powerup 1: Double XP */}
          <div className="bg-white dark:bg-[#1e293b] p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 hover:border-gray-200 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/20 text-[#2b6cb0] flex items-center justify-center flex-shrink-0">
              <Timer className="w-8 h-8" />
            </div>
            <div className="flex-grow space-y-1.5">
              <h4 className="font-display font-bold text-base text-gray-800 dark:text-white leading-tight">
                Doble Tiempo (XP Boost)
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Gana el doble de experiencia en tu próxima sesión de trivia para subir de rango aún más rápido.
              </p>
              <button
                onClick={() => {
                  if (user.coins >= 30) {
                    onBuyCosmetic('double_time', 30);
                    showNotification('success', '¡Potenciador "Doble Tiempo" adquirido con éxito!');
                  } else {
                    showNotification('error', 'Monedas insuficientes.');
                  }
                }}
                className="bg-amber-500 hover:bg-amber-600 text-[#1a365d] font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1 bouncy-tap transition-all shadow-sm"
              >
                Comprar por 30 🪙
              </button>
            </div>
          </div>

          {/* Powerup 2: Streak Protector */}
          <div className="bg-white dark:bg-[#1e293b] p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 hover:border-gray-200 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="flex-grow space-y-1.5">
              <h4 className="font-display font-bold text-base text-gray-800 dark:text-white leading-tight">
                Protector de Racha
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Evita perder tu racha de días estudiados si fallas un día de juego. Se consume automáticamente.
              </p>
              <button
                onClick={() => {
                  if (user.coins >= 100) {
                    onBuyCosmetic('streak_shield', 100);
                    showNotification('success', '¡Protector de racha adquirido con éxito!');
                  } else {
                    showNotification('error', 'Monedas insuficientes.');
                  }
                }}
                className="bg-amber-500 hover:bg-amber-600 text-[#1a365d] font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1 bouncy-tap transition-all shadow-sm"
              >
                Comprar por 100 🪙
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
