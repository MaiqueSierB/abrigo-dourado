import { ClassData, CLASSES } from '@/game/types';
import { cn } from '@/lib/utils';

interface ClassSelectionProps {
  onSelectClass: (classData: ClassData) => void;
}

const attributeLabels: Record<string, string> = {
  forca: 'Força',
  inteligencia: 'Inteligência',
  carisma: 'Carisma',
  percepcao: 'Percepção',
  engenharia: 'Engenharia',
  sorte: 'Sorte',
};

const classColors: Record<string, string> = {
  engineer: 'border-engineer bg-engineer/10 hover:bg-engineer/20',
  diplomat: 'border-diplomat bg-diplomat/10 hover:bg-diplomat/20',
  sentinel: 'border-sentinel bg-sentinel/10 hover:bg-sentinel/20',
  botanist: 'border-botanist bg-botanist/10 hover:bg-botanist/20',
};

const classIconColors: Record<string, string> = {
  engineer: 'text-engineer',
  diplomat: 'text-diplomat',
  sentinel: 'text-sentinel',
  botanist: 'text-botanist',
};

const classIcons: Record<string, string> = {
  engineer: '⚙️',
  diplomat: '🤝',
  sentinel: '🛡️',
  botanist: '🌿',
};

export function ClassSelection({ onSelectClass }: ClassSelectionProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Snow effect overlay */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-snow rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10px`,
              animation: `snowfall ${8 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div className="text-center mb-8 z-10">
        <h1 className="font-pixel text-2xl md:text-3xl text-ice mb-2 drop-shadow-lg">
          FROSTKEEP
        </h1>
        <p className="font-pixel text-xs text-frost">
          Sobrevivência Ártica
        </p>
      </div>

      {/* Subtitle */}
      <h2 className="font-pixel text-sm text-foreground mb-6 z-10">
        Escolha sua Classe
      </h2>

      {/* Class cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full z-10">
        {CLASSES.map((classData) => (
          <button
            key={classData.id}
            onClick={() => onSelectClass(classData)}
            className={cn(
              'border-2 rounded p-4 text-left transition-all duration-300',
              'hover:scale-[1.02] hover:shadow-lg hover:shadow-ice/20',
              'focus:outline-none focus:ring-2 focus:ring-ice',
              classColors[classData.id]
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{classIcons[classData.id]}</span>
              <h3 className={cn('font-pixel text-sm', classIconColors[classData.id])}>
                {classData.nome}
              </h3>
            </div>

            {/* Description */}
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              {classData.descricao}
            </p>

            {/* Attributes */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {Object.entries(classData.atributos).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-[10px] text-muted-foreground mb-1">
                    {attributeLabels[key]}
                  </div>
                  <div className="flex justify-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'w-2 h-2 rounded-sm',
                          i < value ? 'bg-ice' : 'bg-muted'
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bonus/Penalty */}
            <div className="space-y-2 text-[10px]">
              <div className="flex items-start gap-2">
                <span className="text-success">+</span>
                <span className="text-success">{classData.bonus}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-danger">−</span>
                <span className="text-danger">{classData.penalidade}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <p className="font-pixel text-[8px] text-muted-foreground mt-8 z-10">
        Use WASD ou setas para mover
      </p>
    </div>
  );
}
