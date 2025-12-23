import Phaser from 'phaser';
import { GameState, INITIAL_GAME_STATE, INITIAL_RESOURCES } from '../types';

export class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key };
  private snowParticles!: Phaser.GameObjects.Particles.ParticleEmitter;
  private speed = 120;
  private gameState: GameState;

  constructor() {
    super({ key: 'GameScene' });
    this.gameState = {
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
    };
  }

  setPlayerClass(classData: any) {
    this.gameState.classe = classData;
    this.gameState.atributos = { ...classData.atributos };
  }

  create() {
    // Create base grid
    this.createBaseGrid();

    // Create player
    this.player = this.add.sprite(400, 300, 'player');
    this.player.setScale(2);
    this.player.setDepth(10);

    // Setup camera
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1.5);

    // Setup controls
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = {
      W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    // Create snow effect
    this.createSnowEffect();

    // Emit game state for React HUD
    this.emitGameState();
  }

  createBaseGrid() {
    const gridSize = 32;
    const mapWidth = 25;
    const mapHeight = 19;

    // Create ground tiles
    for (let x = 0; x < mapWidth; x++) {
      for (let y = 0; y < mapHeight; y++) {
        const tileX = x * gridSize;
        const tileY = y * gridSize;
        
        // Alternate between ground and ice tiles
        const isIce = (x + y) % 7 === 0;
        const tile = this.add.sprite(tileX, tileY, isIce ? 'ice' : 'ground');
        tile.setOrigin(0, 0);
        tile.setDepth(0);
      }
    }

    // Create base center marker
    const centerX = (mapWidth * gridSize) / 2;
    const centerY = (mapHeight * gridSize) / 2;
    
    const baseMarker = this.add.graphics();
    baseMarker.lineStyle(2, 0x4da8da, 0.8);
    baseMarker.strokeCircle(centerX, centerY, 80);
    baseMarker.lineStyle(1, 0x87ceeb, 0.4);
    baseMarker.strokeCircle(centerX, centerY, 100);
    baseMarker.setDepth(1);

    // Add some decorative elements
    this.createDecorations(mapWidth, mapHeight, gridSize);
  }

  createDecorations(mapWidth: number, mapHeight: number, gridSize: number) {
    // Random ice crystals
    for (let i = 0; i < 15; i++) {
      const x = Phaser.Math.Between(2, mapWidth - 2) * gridSize;
      const y = Phaser.Math.Between(2, mapHeight - 2) * gridSize;
      
      const crystal = this.add.graphics();
      crystal.fillStyle(0x87ceeb, 0.6);
      crystal.fillTriangle(x, y - 12, x - 6, y + 6, x + 6, y + 6);
      crystal.fillStyle(0x4da8da, 0.4);
      crystal.fillTriangle(x, y - 8, x - 4, y + 4, x + 4, y + 4);
      crystal.setDepth(2);
    }
  }

  createSnowEffect() {
    // Create snow particles
    const particles = this.add.particles(0, -50, 'snow', {
      x: { min: 0, max: 800 },
      y: -10,
      lifespan: 8000,
      speedY: { min: 20, max: 50 },
      speedX: { min: -10, max: 10 },
      scale: { start: 0.5, end: 0.2 },
      alpha: { start: 0.8, end: 0.2 },
      frequency: 100,
      blendMode: 'ADD',
    });
    particles.setDepth(100);
    
    this.snowParticles = particles;
  }

  update() {
    if (!this.player) return;

    // 8-directional movement
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      velocityX = -1;
    } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
      velocityX = 1;
    }

    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      velocityY = -1;
    } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
      velocityY = 1;
    }

    // Normalize diagonal movement
    if (velocityX !== 0 && velocityY !== 0) {
      velocityX *= 0.707;
      velocityY *= 0.707;
    }

    // Apply movement
    this.player.x += velocityX * this.speed * (this.game.loop.delta / 1000);
    this.player.y += velocityY * this.speed * (this.game.loop.delta / 1000);

    // Clamp to bounds
    this.player.x = Phaser.Math.Clamp(this.player.x, 32, 768);
    this.player.y = Phaser.Math.Clamp(this.player.y, 32, 576);

    // Update game state position
    this.gameState.posicao = { x: this.player.x, y: this.player.y };

    // Simple animation based on movement
    if (velocityX !== 0 || velocityY !== 0) {
      this.player.setTint(0xffffff);
    } else {
      this.player.setTint(0xcccccc);
    }
  }

  emitGameState() {
    // Emit state to React via custom event
    this.game.events.emit('gameStateUpdate', this.gameState);
  }

  // Methods to update game state from React
  updateResources(resources: Partial<typeof INITIAL_RESOURCES>) {
    this.gameState.recursos = { ...this.gameState.recursos, ...resources };
    this.emitGameState();
  }

  updateTemperature(temp: number) {
    this.gameState.temperatura = temp;
    this.emitGameState();
  }
}
