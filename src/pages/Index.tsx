import { useState, useRef, useCallback } from 'react';
import { ClassSelection } from '@/components/ClassSelection';
import { GameHUD } from '@/components/GameHUD';
import { PhaserGame, PhaserGameRef } from '@/game/PhaserGame';
import { ClassData, GameState, INITIAL_GAME_STATE } from '@/game/types';

type GameScreen = 'class-selection' | 'playing';

const Index = () => {
  const [screen, setScreen] = useState<GameScreen>('class-selection');
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    classe: null,
    atributos: {
      forca: 3,
      inteligencia: 3,
      carisma: 3,
      percepcao: 3,
      engenharia: 3,
      sorte: 3,
    },
    ...INITIAL_GAME_STATE,
  });
  
  const gameRef = useRef<PhaserGameRef>(null);

  const handleSelectClass = useCallback((classData: ClassData) => {
    setSelectedClass(classData);
    setGameState((prev) => ({
      ...prev,
      classe: classData,
      atributos: { ...classData.atributos },
    }));
    setScreen('playing');
  }, []);

  const handleGameStateUpdate = useCallback((state: GameState) => {
    setGameState(state);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden bg-background">
      {screen === 'class-selection' && (
        <ClassSelection onSelectClass={handleSelectClass} />
      )}

      {screen === 'playing' && (
        <div className="relative w-full h-full">
          {/* Phaser Game Canvas */}
          <PhaserGame
            ref={gameRef}
            selectedClass={selectedClass}
            onGameStateUpdate={handleGameStateUpdate}
          />

          {/* React HUD Overlay */}
          <GameHUD
            recursos={gameState.recursos}
            temperatura={gameState.temperatura}
            dia={gameState.dia}
            moral={gameState.moral}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
