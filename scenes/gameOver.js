class GameOver extends Phaser.Scene {
    constructor(){
        super({
            key: 'GameOver',
        });
    }
    
    // Carrega os recursos necessários antes da criação da cena
    preload(){
        this.load.image('gameover_background', './assets/gameover_background.png'); // Carrega a imagem de fundo da tela de Game Over
        this.load.image('button_restart', './assets/button_restart.png') // Carrega a imagem do botão de reinício
    }

    // Configuração inicial da cena
    create(){
        // Adiciona a imagem de fundo da tela de Game Over na posição central da cena
        this.add.image(640, 360, 'gameover_background');
        
        // Adiciona um botão de reinício na posição especificada e ajusta a escala
        this.button = this.add.image(640, 620, 'button_restart').setScale(0.13);

        // Torna o botão interativo para eventos do mouse/touch
        this.button.setInteractive();

        // Define uma ação quando o botão é pressionado
        this.button.on('pointerdown', function(){
            this.button.disableInteractive(); // Desativa a interatividade do botão para evitar múltiplos cliques
            this.scene.start('Mapa'); // Reinicia o jogo voltando para a cena 'Start'
        }, this);
    }
}
