class Start extends Phaser.Scene {
    constructor(){
        super({
            key: 'Start',
        });
    }
    
    // Carrega os recursos necessários antes da criação da cena
    preload(){
        this.load.image('bg', './assets/start_background.png'); // Carrega a imagem de fundo
        this.load.image('button_start', './assets/button_start.png') // Carrega a imagem do botão de início
    }

    // Configuração inicial da cena
    create(){
        // Adiciona a imagem de fundo na posição central da cena
        this.add.image(640, 360, 'bg');
        
        // Adiciona um botão de início (start) na posição especificada e ajusta a escala
        this.button = this.add.image(640, 620, 'button_start').setScale(0.13);

        // Torna o botão interativo para eventos do mouse/touch
        this.button.setInteractive();

        // Define uma ação quando o botão é pressionado
        this.button.on('pointerdown', function(){
            this.button.disableInteractive(); // Desativa a interatividade do botão para evitar múltiplos cliques
            this.scene.start('Mapa'); // Inicia a cena 'Mapa'
        }, this);
    }
}