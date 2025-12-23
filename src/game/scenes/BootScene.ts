import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Create loading bar
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x1a2a3a, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Carregando...', {
      fontFamily: '"Press Start 2P"',
      fontSize: '16px',
      color: '#a8d8ea',
    });
    loadingText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x4da8da, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    // Generate placeholder sprites
    this.generatePlaceholderSprites();
  }

  generatePlaceholderSprites() {
    // Player sprite (16x16 pixel art style)
    const playerGraphics = this.make.graphics({ x: 0, y: 0 });
    
    // Simple pixel character
    playerGraphics.fillStyle(0x4da8da);
    playerGraphics.fillRect(4, 0, 8, 4);   // Head
    playerGraphics.fillStyle(0x2980b9);
    playerGraphics.fillRect(2, 4, 12, 8);  // Body
    playerGraphics.fillStyle(0x1a5276);
    playerGraphics.fillRect(2, 12, 4, 4);  // Left leg
    playerGraphics.fillRect(10, 12, 4, 4); // Right leg
    
    playerGraphics.generateTexture('player', 16, 16);
    playerGraphics.destroy();

    // Snow particle
    const snowGraphics = this.make.graphics({ x: 0, y: 0 });
    snowGraphics.fillStyle(0xffffff);
    snowGraphics.fillCircle(2, 2, 2);
    snowGraphics.generateTexture('snow', 4, 4);
    snowGraphics.destroy();

    // Ground tile (ice/snow)
    const groundGraphics = this.make.graphics({ x: 0, y: 0 });
    groundGraphics.fillStyle(0x1a2a3a);
    groundGraphics.fillRect(0, 0, 32, 32);
    groundGraphics.fillStyle(0x2a3a4a);
    groundGraphics.fillRect(0, 0, 16, 16);
    groundGraphics.fillRect(16, 16, 16, 16);
    groundGraphics.generateTexture('ground', 32, 32);
    groundGraphics.destroy();

    // Ice tile
    const iceGraphics = this.make.graphics({ x: 0, y: 0 });
    iceGraphics.fillStyle(0x4da8da, 0.3);
    iceGraphics.fillRect(0, 0, 32, 32);
    iceGraphics.lineStyle(1, 0x87ceeb, 0.5);
    iceGraphics.lineBetween(0, 8, 32, 8);
    iceGraphics.lineBetween(8, 0, 8, 32);
    iceGraphics.generateTexture('ice', 32, 32);
    iceGraphics.destroy();
  }

  create() {
    this.scene.start('GameScene');
  }
}
