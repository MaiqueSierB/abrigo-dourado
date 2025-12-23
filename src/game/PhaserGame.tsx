import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';
import { ClassData, GameState } from './types';

interface PhaserGameProps {
  selectedClass: ClassData | null;
  onGameStateUpdate?: (state: GameState) => void;
}

export interface PhaserGameRef {
  game: Phaser.Game | null;
  getScene: () => GameScene | null;
}

export const PhaserGame = forwardRef<PhaserGameRef, PhaserGameProps>(
  ({ selectedClass, onGameStateUpdate }, ref) => {
    const gameRef = useRef<Phaser.Game | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      game: gameRef.current,
      getScene: () => {
        if (gameRef.current) {
          return gameRef.current.scene.getScene('GameScene') as GameScene;
        }
        return null;
      },
    }));

    useEffect(() => {
      if (!containerRef.current || gameRef.current) return;

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: containerRef.current,
        backgroundColor: '#0a1420',
        pixelArt: true,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        scene: [BootScene, GameScene],
      };

      gameRef.current = new Phaser.Game(config);

      // Listen for game state updates
      gameRef.current.events.on('gameStateUpdate', (state: GameState) => {
        onGameStateUpdate?.(state);
      });

      return () => {
        if (gameRef.current) {
          gameRef.current.destroy(true);
          gameRef.current = null;
        }
      };
    }, []);

    // Update player class when selected
    useEffect(() => {
      if (selectedClass && gameRef.current) {
        const scene = gameRef.current.scene.getScene('GameScene') as GameScene;
        if (scene && scene.scene.isActive()) {
          scene.setPlayerClass(selectedClass);
        }
      }
    }, [selectedClass]);

    return (
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center"
        style={{ imageRendering: 'pixelated' }}
      />
    );
  }
);

PhaserGame.displayName = 'PhaserGame';
