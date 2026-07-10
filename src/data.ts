import { CosmeticItem } from './types';
import { TriviaQuestion, RoomPlayer } from '../server/types.js'; // Importar TriviaQuestion y RoomPlayer desde los tipos compartidos

export const INITIAL_COSMETIC_ITEMS: CosmeticItem[] = [
  {
    id: 'cyber_scholar',
    name: 'Cyber Scholar',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcbH6kg9afTsx_w5GorQ9Xz06Ol1UT6_6MQ_1S4sdGc5um5UrGHWQSYciBYxxKePPUcWHzB53OQNz-P82EX-xxP7nDp3Vjeye2V8l1usedF8vH9qn8rBf5uEkJHTRM83WbTbAXB_SPXhDytPqGWSpNuyedgjqF4CdfrK_QLLcw5zCr8Ed3Bc86hMUwZf5D6cHSZejbnIajqQcyVBUf5MZfRuZrGBTHG7StmaH82Qf-7GIuqCGhqDZDFRfZRudJtk4OiUv19EKU65ad',
    type: 'skin',
    status: 'equipped',
    isPremiumExclusive: false,
    description: 'Estilo ciberpunk con gafas de neón y mochila de alta tecnología.'
  },
  {
    id: 'booky_dragon',
    name: 'Booky Dragon',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmbiko6456vsSv37SshYk48HhkcU0BPNE5k8Bwjq1TpJVxCn5qLob1tQnKZRom7NOrxuGcyQpzyMOMGRtsXEIfF-1M-RAOW-MaTW6a5jzoDGm3cths9VXv4VYzQHZsIwBu-U_qkAq5wBQsbD59chCXYeOGbGwtKVSJEw8r6WPK1-8a30tuJ8hot4qVDUB3nPjhKOX0EwqdoRTd8byPPvH_P9SJKpMrxe8t-HOFK3J90jw1S1F3KuuNoYatVI007rnxx57r2YurrQMQ',
    type: 'skin',
    status: 'unlocked',
    isPremiumExclusive: false,
    description: 'Un adorable dragón verde amante de los libros y el conocimiento.'
  },
  {
    id: 'starlight_archmage',
    name: 'Starlight Archmage',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtdaS89jbTTpU0r0gRSd8nAGLkp5yRrmtZPxBU0NlvWTAH5rVofK8lhPjdgL4z8tzW5wZnGJ7GI5PWldpWNEfBX0wEAHcoV_ItfcXLyEOTOWCI4FiYrlpyfxNMD5aAGK5spNZRIaJ1PK6HpaPqrtOZGM3SImQojCfPneN8AFbjQfU0wjI9B9khW3wCyJP4g3T7HeTRzn_jUJ67fm4eo6mT9HdDMTQ-gYPkcZlEIaceG6Xzeow8ttwE8Wfj2Ko3P2RI0V3n622ExyVS',
    type: 'skin',
    status: 'locked',
    isPremiumExclusive: true,
    description: 'Archimago celestial que manipula el polvo de estrellas educativo.'
  },
  {
    id: 'street_rebel',
    name: 'Street Rebel',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtdaS89jbTTpU0r0gRSd8nAGLkp5yRrmtZPxBU0NlvWTAH5rVofK8lhPjdgL4z8tzW5wZnGJ7GI5PWldpWNEfBX0wEAHcoV_ItfcXLyEOTOWCI4FiYrlpyfxNMD5aAGK5spNZRIaJ1PK6HpaPqrtOZGM3SImQojCfPneN8AFbjQfU0wjI9B9khW3wCyJP4g3T7HeTRzn_jUJ67fm4eo6mT9HdDMTQ-gYPkcZlEIaceG6Xzeow8ttwE8Wfj2Ko3P2RI0V3n622ExyVS', // placeholder/real avatar
    type: 'skin',
    status: 'locked',
    isPremiumExclusive: true,
    description: 'Estilo urbano rebelde para romper barreras académicas.'
  },
  {
    id: 'buho_sabio',
    name: 'Búho Sabio',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtdaS89jbTTpU0r0gRSd8nAGLkp5yRrmtZPxBU0NlvWTAH5rVofK8lhPjdgL4z8tzW5wZnGJ7GI5PWldpWNEfBX0wEAHcoV_ItfcXLyEOTOWCI4FiYrlpyfxNMD5aAGK5spNZRIaJ1PK6HpaPqrtOZGM3SImQojCfPneN8AFbjQfU0wjI9B9khW3wCyJP4g3T7HeTRzn_jUJ67fm4eo6mT9HdDMTQ-gYPkcZlEIaceG6Xzeow8ttwE8Wfj2Ko3P2RI0V3n622ExyVS',
    type: 'skin',
    status: 'locked',
    price: 50,
    isPremiumExclusive: false,
    description: 'Perfecto para las sesiones nocturnas de estudio más desafiantes.'
  },
  {
    id: 'zorro_estudioso',
    name: 'Zorro Estudioso',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWAVIHoYqpdjudu_-XALjxst5xfZg8AWz8LA17rjR3HqU0wfrwLEvgr6XIBjO1xYcC96_wpl1CQeq8k8Rj8WzVbg-nx1e-_jjC2oj7LSrtbNFc02CJm6FrWz3T5fFSi_qcVifmm_vlUpz9aaAUzIxtiRpHR6UInse9QgqOlCLLsm_Z34HYG91iDv04HfDJIM4uij76XRRKpU5QZL-GyP9zv5Tglt0yAoUGzc4HIZJT_vWGJ0C5oXdU1cblvU2vbx6uNZkGx3dhOdVf',
    type: 'skin',
    status: 'locked',
    price: 75,
    isPremiumExclusive: false,
    description: 'Astuto y rápido. Ideal para resolver problemas a máxima velocidad.'
  },
  {
    id: 'astronauta',
    name: 'Astronauta',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCJFEWSxJ9EQRNCLz68jUkogh_31ntoHAs2tkGchZWlzPRCsyDlGTjUB0ikDU3tLroB9_hVoDzBtYafCORxFRGWWrxpE1cldwYjTKyMbvnIt6UHfjLxlhTFSawmGds5-dIkNoqItjxYQqOOO_p9bulnkMEnfwqRyT8SustuEN9wOoE4PtWTiV-15PPG32EzJQ7byjQRmSpt0AT71xjl0tkqI5lFNxPn_CDGEfuCpAQHaWQHIJIwsXYdifQfycfmgSig9RzemDkh_Bm',
    type: 'skin',
    status: 'locked',
    isPremiumExclusive: true,
    description: 'Para los que apuntan al espacio exterior. Exclusivo de StudyClash Pro.'
  }
];

export const LOBBY_PLAYERS: RoomPlayer[] = [ // Cambiado a RoomPlayer
  {
    username: 'ProfeGamer_99',
    avatarId: 'cyber_scholar', // Usar avatarId en lugar de avatarUrl
    isHost: true,
    isReady: true
  },
  {
    username: 'Lucia_Science',
    avatarId: 'booky_dragon',
    isHost: false,
    isReady: true
  },
  {
    username: 'MarcoPolo_20',
    avatarId: 'buho_sabio',
    isHost: false,
    isReady: true
  },
  {
    username: 'StudyQueen',
    avatarId: 'zorro_estudioso',
    isHost: false,
    isReady: true
  }
];

export const HISTORY_QUESTIONS: TriviaQuestion[] = [
  {
    id: 1,
    question: '¿En qué año comenzó la Revolución Francesa?',
    options: {
      A: '1789',
      B: '1776',
      C: '1804',
      D: '1792'
    },
    correctOption: 'A'
  },
  {
    id: 2,
    question: '¿Quién fue el primer presidente de los Estados Unidos?',
    options: {
      A: 'Thomas Jefferson',
      B: 'George Washington',
      C: 'John Adams',
      D: 'Benjamin Franklin'
    },
    correctOption: 'B'
  },
  {
    id: 3,
    question: '¿Qué conflicto bélico estalló en 1914 tras el asesinato del archiduque Francisco Fernando?',
    options: {
      A: 'Primera Guerra Mundial',
      B: 'Segunda Guerra Mundial',
      C: 'Guerra Franco-Prusiana',
      D: 'Guerra de Crimea'
    },
    correctOption: 'A'
  },
  {
    id: 4,
    question: '¿En qué año llegó Cristóbal Colón al continente americano por primera vez?',
    options: {
      A: '1492',
      B: '1500',
      C: '1488',
      D: '1512'
    },
    correctOption: 'A'
  },
  {
    id: 5,
    question: '¿Cuál fue la dinastía reinante en Francia inmediatamente antes de la Revolución de 1789?',
    options: {
      A: 'Dinastía Bonaparte',
      B: 'Dinastía de los Borbones',
      C: 'Dinastía Valois',
      D: 'Dinastía de Orleans'
    },
    correctOption: 'B'
  },
  {
    id: 6,
    question: '¿Qué tratado puso fin formalmente a la Primera Guerra Mundial en 1919?',
    options: {
      A: 'Tratado de Utrecht',
      B: 'Tratado de Versalles',
      C: 'Pacto de Varsovia',
      D: 'Tratado de Trianón'
    },
    correctOption: 'B'
  },
  {
    id: 7,
    question: '¿Qué antigua civilización construyó las pirámides de Giza?',
    options: {
      A: 'Civilización Maya',
      B: 'Antiguo Egipto',
      C: 'Imperio Romano',
      D: 'Antigua Grecia'
    },
    correctOption: 'B'
  },
  {
    id: 8,
    question: '¿Quién lideró la campaña de independencia de gran parte de América del Sur, conocido como el Libertador?',
    options: {
      A: 'Miguel Hidalgo',
      B: 'Simón Bolívar',
      C: 'José de San Martín',
      D: 'Bernardo O\'Higgins'
    },
    correctOption: 'B'
  },
  {
    id: 9,
    question: '¿Qué imperio dominó la cuenca del Mediterráneo y colapsó formalmente en el año 476 d.C.?',
    options: {
      A: 'Imperio Mongol',
      B: 'Imperio Romano de Occidente',
      C: 'Imperio Bizantino',
      D: 'Imperio Otomano'
    },
    correctOption: 'B'
  },
  {
    id: 10,
    question: '¿En qué año se proclamó la Declaración de Independencia de los Estados Unidos?',
    options: {
      A: '1789',
      B: '1776',
      C: '1812',
      D: '1763'
    },
    correctOption: 'B'
  }
];

export const MARKETING_QUESTIONS: TriviaQuestion[] = [
  {
    id: 1,
    question: '¿Qué son las "4 Ps" tradicionales del marketing mix?',
    options: {
      A: 'Precio, Producto, Plaza, Promoción',
      B: 'Personas, Procesos, Precio, Publicidad',
      C: 'Planificación, Producción, Presupuesto, Plaza',
      D: 'Producto, Presencia, Postventa, Patrocinio'
    },
    correctOption: 'A'
  },
  {
    id: 2,
    question: '¿Qué tipo de segmentación se basa en variables como edad, género, ingresos y educación?',
    options: {
      A: 'Segmentación Psicográfica',
      B: 'Segmentación Demográfica',
      C: 'Segmentación Geográfica',
      D: 'Segmentación Conductual'
    },
    correctOption: 'B'
  },
  {
    id: 3,
    question: '¿Cuál es el objetivo principal de realizar un Análisis FODA (FADO)?',
    options: {
      A: 'Calcular el retorno de inversión publicitaria',
      B: 'Definir canales de distribución física',
      C: 'Identificar Fortalezas, Oportunidades, Debilidades y Amenazas',
      D: 'Establecer los precios de preventa'
    },
    correctOption: 'C'
  },
  {
    id: 4,
    question: '¿Cómo se define el "Valor de Vida del Cliente" (CLV)?',
    options: {
      A: 'El costo de adquirir un cliente nuevo',
      B: 'La suma de las compras que hace un cliente en un mes',
      C: 'El beneficio neto total estimado que un cliente genera a lo largo de su relación',
      D: 'La cantidad de veces que recomienda el servicio'
    },
    correctOption: 'C'
  },
  {
    id: 5,
    question: '¿Qué canal representa un medio propio (Owned Media) para una empresa?',
    options: {
      A: 'Un anuncio pagado en redes sociales',
      B: 'El sitio web oficial de la marca',
      C: 'Una mención espontánea en un blog de noticias',
      D: 'Un banner patrocinado en Google'
    },
    correctOption: 'B'
  }
];
