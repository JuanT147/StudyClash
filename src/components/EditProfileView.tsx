import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { UserProfile, CosmeticItem, AppScreen } from '../types';
import { ArrowLeft, User, School, FileText, Check, X, Camera } from 'lucide-react';

interface EditProfileViewProps {
  user: UserProfile;
  cosmetics: CosmeticItem[];
  onSave: (updatedUser: Partial<UserProfile>) => void;
  onNavigate: (screen: AppScreen) => void;
}

export default function EditProfileView({
  user,
  cosmetics,
  onSave,
  onNavigate
}: EditProfileViewProps) {
  const [username, setUsername] = useState(user.username);
  const [institution, setInstitution] = useState(user.institution);
  const [bio, setBio] = useState(user.bio);
  const [previewAvatarId, setPreviewAvatarId] = useState(user.avatarId);

  // Filter cosmetics to show only unlocked skins as quick avatar choices
  const unlockedSkins = cosmetics.filter(
    (item) => item.type === 'skin' && (item.status !== 'locked' || (item.isPremiumExclusive && user.isPremium))
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim().length > 0) {
      onSave({
        username,
        institution,
        bio,
        avatarId: previewAvatarId
      });
      onNavigate(AppScreen.PROFILE);
    }
  };

  const selectedAvatarImage = cosmetics.find((c) => c.id === previewAvatarId)?.image || cosmetics[0].image;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 max-w-md mx-auto pb-10"
    >
      {/* Header contextual spacing already done in App, we render the header details */}
      <div className="flex items-center gap-3 bg-white dark:bg-[#1e293b] p-4 rounded-2xl border border-gray-100 dark:border-gray-800/80 mb-4 shadow-sm">
        <button
          onClick={() => onNavigate(AppScreen.PROFILE)}
          className="text-[#2b6cb0] hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors flex items-center justify-center active:scale-95"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="font-display font-extrabold text-lg text-gray-800 dark:text-white">
          Editar tu Perfil
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar customizer */}
        <section className="flex flex-col items-center justify-center py-4 bg-white dark:bg-[#1e293b] rounded-3xl border border-gray-100 dark:border-gray-800 p-4">
          <div className="relative group cursor-pointer active:scale-95 transition-transform">
            {/* Selected preview avatar circular frame */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800 shadow-md bg-gray-50">
              <img
                className="w-full h-full object-cover"
                alt="Selected Avatar Preview"
                src={selectedAvatarImage}
              />
            </div>
            
            {/* Edit Icon Overlay */}
            <div className="absolute bottom-0 right-0 bg-[#2b6cb0] text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-gray-800 flex items-center justify-center">
              <Camera size={16} />
            </div>
          </div>

          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-4 block">
            Selección de Avatar Desbloqueado
          </span>

          {/* Quick select avatars gallery */}
          <div className="mt-2 flex gap-3 overflow-x-auto py-2 px-1 max-w-sm hide-scrollbar items-center justify-center">
            {unlockedSkins.map((skin) => (
              <div
                key={skin.id}
                onClick={() => setPreviewAvatarId(skin.id)}
                className={`relative w-12 h-12 rounded-full overflow-hidden border-2 cursor-pointer transition-all bouncy-tap flex-shrink-0 bg-gray-50 ${
                  previewAvatarId === skin.id
                    ? 'border-[#2b6cb0] scale-110 shadow-md'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img className="w-full h-full object-cover" src={skin.image} alt={skin.name} />
                {previewAvatarId === skin.id && (
                  <div className="absolute inset-0 bg-[#2b6cb0]/15 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white drop-shadow-md stroke-[3]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Inputs panel */}
        <section className="bg-white dark:bg-[#1e293b] rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
          {/* Username */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-1">
              Nombre de Usuario
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={18} />
              </span>
              <input
                type="text"
                required
                maxLength={20}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#0f172a]/50 border border-gray-200 dark:border-gray-800 rounded-xl pl-11 pr-4 py-2.5 font-sans text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2b6cb0]/25 focus:border-[#2b6cb0] transition-shadow"
              />
            </div>
          </div>

          {/* Institution */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-1">
              Institución
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <School size={18} />
              </span>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#0f172a]/50 border border-gray-200 dark:border-gray-800 rounded-xl pl-11 pr-4 py-2.5 font-sans text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2b6cb0]/25 focus:border-[#2b6cb0] transition-shadow"
              />
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-1">
              Biografía
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-4 text-gray-400">
                <FileText size={18} />
              </span>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Cuéntanos un poco sobre ti y tus metas de estudio..."
                rows={4}
                className="w-full bg-gray-50 dark:bg-[#0f172a]/50 border border-gray-200 dark:border-gray-800 rounded-xl pl-11 pr-4 py-2.5 font-sans text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2b6cb0]/25 focus:border-[#2b6cb0] transition-shadow resize-none"
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex gap-4">
          <button
            type="button"
            onClick={() => onNavigate(AppScreen.PROFILE)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 rounded-xl py-3 px-4 font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-95"
          >
            <X size={14} /> Cancelar
          </button>
          
          <button
            type="submit"
            className="flex-1 bg-[#2b6cb0] hover:bg-blue-600 text-white rounded-xl py-3 px-4 font-bold text-xs flex items-center justify-center gap-1 shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Check size={14} /> Guardar Cambios
          </button>
        </section>
      </form>
    </motion.div>
  );
}
