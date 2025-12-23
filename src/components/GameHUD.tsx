import { Resources } from '@/game/types';
import { cn } from '@/lib/utils';

interface GameHUDProps {
  recursos: Resources;
  temperatura: number;
  dia: number;
  moral: number;
  className?: string;
}

const resourceIcons: Record<keyof Resources, string> = {
  comida: '🍖',
  materiais: '🪵',
  combustivel: '🔥',
  agua: '💧',
};

const resourceLabels: Record<keyof Resources, string> = {
  comida: 'Comida',
  materiais: 'Materiais',
  combustivel: 'Combustível',
  agua: 'Água',
};

const resourceColors: Record<keyof Resources, string> = {
  comida: 'bg-food',
  materiais: 'bg-materials',
  combustivel: 'bg-fuel',
  agua: 'bg-water',
};

export function GameHUD({ recursos, temperatura, dia, moral, className }: GameHUDProps) {
  const getTemperatureColor = () => {
    if (temperatura >= 70) return 'text-success';
    if (temperatura >= 40) return 'text-cold-warning';
    return 'text-danger';
  };

  const getTemperatureLabel = () => {
    if (temperatura >= 70) return 'Aquecido';
    if (temperatura >= 40) return 'Frio';
    return 'Congelando';
  };

  const getMoralColor = () => {
    if (moral >= 70) return 'bg-success';
    if (moral >= 40) return 'bg-cold-warning';
    return 'bg-danger';
  };

  return (
    <div className={cn('absolute top-0 left-0 right-0 p-3 pointer-events-none z-50', className)}>
      <div className="flex flex-wrap items-start justify-between gap-4 max-w-4xl mx-auto">
        {/* Left: Resources */}
        <div className="bg-card/90 backdrop-blur border border-border rounded p-3 pointer-events-auto">
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(recursos) as Array<keyof Resources>).map((key) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-lg">{resourceIcons[key]}</span>
                <div className="flex flex-col">
                  <span className="text-[8px] text-muted-foreground font-pixel">
                    {resourceLabels[key]}
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="w-16 h-2 bg-muted rounded overflow-hidden">
                      <div
                        className={cn('h-full transition-all', resourceColors[key])}
                        style={{ width: `${Math.min(100, recursos[key])}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-foreground font-pixel w-6 text-right">
                      {recursos[key]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Day counter */}
        <div className="bg-card/90 backdrop-blur border border-border rounded px-4 py-2 pointer-events-auto">
          <div className="text-center">
            <span className="text-[8px] text-muted-foreground font-pixel block">DIA</span>
            <span className="text-xl text-ice font-pixel">{dia}</span>
          </div>
        </div>

        {/* Right: Temperature & Moral */}
        <div className="bg-card/90 backdrop-blur border border-border rounded p-3 pointer-events-auto">
          {/* Temperature */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🌡️</span>
            <div className="flex flex-col">
              <span className="text-[8px] text-muted-foreground font-pixel">
                Temperatura
              </span>
              <div className="flex items-center gap-2">
                <span className={cn('text-sm font-pixel', getTemperatureColor())}>
                  {temperatura}°
                </span>
                <span className={cn('text-[8px] font-pixel', getTemperatureColor())}>
                  {getTemperatureLabel()}
                </span>
              </div>
            </div>
          </div>

          {/* Moral */}
          <div className="flex items-center gap-2">
            <span className="text-lg">😊</span>
            <div className="flex flex-col">
              <span className="text-[8px] text-muted-foreground font-pixel">
                Moral
              </span>
              <div className="flex items-center gap-1">
                <div className="w-20 h-2 bg-muted rounded overflow-hidden">
                  <div
                    className={cn('h-full transition-all', getMoralColor())}
                    style={{ width: `${moral}%` }}
                  />
                </div>
                <span className="text-[10px] text-foreground font-pixel w-6 text-right">
                  {moral}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Controls hint */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur border border-border rounded px-3 py-1.5 pointer-events-auto">
        <span className="text-[8px] text-muted-foreground font-pixel">
          WASD ou ↑←↓→ para mover
        </span>
      </div>
    </div>
  );
}
