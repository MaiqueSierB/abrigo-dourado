// Game Types for Frostkeep

export type ClassType = 'engineer' | 'diplomat' | 'sentinel' | 'botanist';

export interface Attributes {
  forca: number;        // Força - Strength
  inteligencia: number; // Inteligência - Intelligence
  carisma: number;      // Carisma - Charisma
  percepcao: number;    // Percepção - Perception
  engenharia: number;   // Engenharia - Engineering
  sorte: number;        // Sorte - Luck
}

export interface ClassData {
  id: ClassType;
  nome: string;
  descricao: string;
  atributos: Attributes;
  bonus: string;
  penalidade: string;
  cor: string;
}

export interface Resources {
  comida: number;       // Food
  materiais: number;    // Materials
  combustivel: number;  // Fuel
  agua: number;         // Water
}

export interface GameState {
  classe: ClassData | null;
  atributos: Attributes;
  recursos: Resources;
  temperatura: number;  // Base temperature (0-100)
  dia: number;          // Current day
  moral: number;        // Morale (0-100)
  posicao: { x: number; y: number };
}

export const CLASSES: ClassData[] = [
  {
    id: 'engineer',
    nome: 'Engenheiro',
    descricao: 'Especialista em construção e reparos. Mantém a base funcionando mesmo nas piores condições.',
    atributos: {
      forca: 3,
      inteligencia: 4,
      carisma: 2,
      percepcao: 3,
      engenharia: 5,
      sorte: 3,
    },
    bonus: '+50% velocidade de construção, -25% custo de reparos',
    penalidade: '-20% eficiência em negociações',
    cor: 'engineer',
  },
  {
    id: 'diplomat',
    nome: 'Diplomata',
    descricao: 'Mestre em negociações e gestão de pessoas. Mantém a moral alta e resolve conflitos.',
    atributos: {
      forca: 2,
      inteligencia: 4,
      carisma: 5,
      percepcao: 4,
      engenharia: 2,
      sorte: 3,
    },
    bonus: '+30% moral da base, melhores trocas comerciais',
    penalidade: '-30% em combate direto',
    cor: 'diplomat',
  },
  {
    id: 'sentinel',
    nome: 'Sentinela',
    descricao: 'Guerreiro experiente em defesa. Protege a base contra invasores e predadores.',
    atributos: {
      forca: 5,
      inteligencia: 2,
      carisma: 2,
      percepcao: 5,
      engenharia: 3,
      sorte: 3,
    },
    bonus: '+40% dano em defesa, detecção antecipada de raids',
    penalidade: '-25% eficiência em tarefas científicas',
    cor: 'sentinel',
  },
  {
    id: 'botanist',
    nome: 'Botânico',
    descricao: 'Especialista em cultivo e sobrevivência. Maximiza a produção de alimentos.',
    atributos: {
      forca: 2,
      inteligencia: 5,
      carisma: 3,
      percepcao: 4,
      engenharia: 3,
      sorte: 3,
    },
    bonus: '+40% produção de comida, plantas medicinais',
    penalidade: '-20% velocidade de construção',
    cor: 'botanist',
  },
];

export const INITIAL_RESOURCES: Resources = {
  comida: 50,
  materiais: 30,
  combustivel: 40,
  agua: 60,
};

export const INITIAL_GAME_STATE: Omit<GameState, 'classe' | 'atributos'> = {
  recursos: INITIAL_RESOURCES,
  temperatura: 65,
  dia: 1,
  moral: 70,
  posicao: { x: 400, y: 300 },
};
