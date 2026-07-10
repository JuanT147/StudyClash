import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, X, ShieldAlert, Award } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPremium: boolean;
  onTogglePremium: (isPremium: boolean) => void;
}

export default function PremiumModal({
  isOpen,
  onClose,
  isPremium,
  onTogglePremium
}: PremiumModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="relative bg-white dark:bg-[#1e293b] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl z-10 border border-amber-500/20"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-20"
            >
              <X size={20} />
            </button>

            {/* Header / Banner */}
            <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 p-8 text-center text-white relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,transparent_100%)]" />
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="inline-flex p-3 bg-white/20 backdrop-blur-md rounded-2xl mb-3"
              >
                <Sparkles className="w-8 h-8 text-amber-100" />
              </motion.div>
              <h3 className="font-display font-extrabold text-2xl tracking-tight">
                StudyClash Premium
              </h3>
              <p className="text-amber-100 text-sm mt-1">Sube de nivel tu manera de estudiar</p>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                Desbloquea todo el potencial de StudyClash y transforma tus PDFs en batallas legendarias de aprendizaje.
              </p>

              {/* Benefit items */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-amber-100 dark:bg-amber-900/30 rounded-lg mt-0.5">
                    <Check className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 dark:text-white">PDFs Ilimitados</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Sube tantos apuntes y capítulos como necesites sin restricciones.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 bg-amber-100 dark:bg-amber-900/30 rounded-lg mt-0.5">
                    <Check className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 dark:text-white">Skins y Avatares Exclusivos</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Acceso a skins premium como 'Starlight Archmage' y 'Street Rebel'.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 bg-amber-100 dark:bg-amber-900/30 rounded-lg mt-0.5">
                    <Check className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 dark:text-white">Multiplicador de XP x2</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Gana el doble de experiencia en cada trivia y escala de nivel más rápido.</p>
                  </div>
                </div>
              </div>

              {/* Demo Mode Notice */}
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4 rounded-2xl flex gap-3 items-start">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-800 dark:text-amber-300">
                  <span className="font-bold block mb-0.5">Modo Demostración</span>
                  Puedes activar o desactivar Premium gratis con este interruptor para probar todas las funciones, skins y vistas premium del proyecto.
                </div>
              </div>

              {/* Action Toggle */}
              <button
                onClick={() => {
                  onTogglePremium(!isPremium);
                }}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all bouncy-tap shadow-lg ${
                  isPremium
                    ? 'bg-red-500 text-white shadow-red-200 dark:shadow-none hover:bg-red-600'
                    : 'bg-amber-500 text-[#1a365d] shadow-amber-200 dark:shadow-none hover:bg-amber-600 hover:text-white'
                }`}
              >
                <Award size={18} />
                {isPremium ? 'Desactivar Modo Premium' : 'Activar Modo Premium (Gratis)'}
              </button>

              <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest leading-none">
                S/.15.00/mes • Cancela en cualquier momento
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
