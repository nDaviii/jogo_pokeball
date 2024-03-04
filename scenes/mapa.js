class Mapa extends Phaser.Scene {

    constructor(){
        super({
            key:'Mapa',
        });
    }
    
    // Carregamento de recursos
    preload(){
        this.load.image('map', './assets/map.png');
        this.load.spritesheet('player_parado', './assets/gary_parado.png', {frameWidth: 51, frameHeight: 51});
        this.load.spritesheet('player_direita', './assets/gary_direita.png', {frameWidth: 51, frameHeight: 51});
        this.load.spritesheet('player_esquerda', './assets/gary_esquerda.png', {frameWidth: 51, frameHeight: 51});
        this.load.image('plataforma_tijolo', './assets/plataforma.png');
        this.load.image('plataforma', './assets/plataforma2.png');
        this.load.image('plataforma2', './assets/plataforma2.png');
        this.load.image('pokeball', './assets/pokebola.png');
    }

    // Criação de objetos e configurações iniciais
    create(){

        this.player; // Variável para armazenar o personagem
        this.pulando = true; // Flag para verificar se o personagem está pulando
        this.teclado; // Armazém dos cursores do teclado

        // Objetos de obstáculos no mapa
        this.plataforma;
        this.plataforma2;
        this.plataforma3;

        // Variável para armazenar as pokeballs (pontos do jogo)
        this.pokeball;
        
        this.pokeballsColetadas = 0; // Contador de pokeballs coletadas
        this.placar; // Texto do placar
        
        // Adiciona a imagem de fundo
        this.add.image(640, 360, 'map');
           
        // Adiciona o personagem e define suas animações
        this.player = this.physics.add.sprite(150, 530, 'player_parado').setScale(3);
        this.player.setCollideWorldBounds(true);

        // Configuração de animações para o personagem
        this.player.anims.create({
            key: 'player_parado',
            frames: this.player.anims.generateFrameNumbers('player_parado'),
            frameRate: 10,
            repeat: -1
        });
        
        this.player.anims.create({
            key: 'player_direita',
            frames: this.player.anims.generateFrameNumbers('player_direita', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0
        });
        
        this.player.anims.create({
            key: 'player_esquerda',
            frames: this.player.anims.generateFrameNumbers('player_esquerda', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 0
        });

        // Configuração dos cursores do teclado
        this.teclado = this.input.keyboard.createCursorKeys();

        // Adiciona plataformas como barreiras
        this.plataforma = this.physics.add.staticImage(640, 690, 'plataforma_tijolo');
        this.physics.add.collider(this.player, this.plataforma);

        this.plataforma2 = this.physics.add.staticImage(1100, 360, 'plataforma');
        this.physics.add.collider(this.player, this.plataforma2);

        this.plataforma3 = this.physics.add.staticImage(100, 400, 'plataforma2');
        this.physics.add.collider(this.player, this.plataforma3);

        // Adiciona pokeballs com efeitos de salto e colisões com obstáculos
        this.pokeball = this.physics.add.sprite(640, 0, 'pokeball').setScale(0.5);
        this.pokeball.setCollideWorldBounds(true);
        this.pokeball.setBounce(0.7);
        this.physics.add.collider(this.pokeball, this.plataforma, () => {this.pulando = true;});
        this.physics.add.collider(this.pokeball, this.plataforma2, () => {this.pulando = true;});
        this.physics.add.collider(this.pokeball, this.plataforma3, () => {this.pulando = true;});

        // Adiciona o texto do placar
        this.placar = this.add.text(50, 50, 'Pokéballs: ' + this.pokeballsColetadas, {fontSize: '45px', fill: '#ffffff'});

        // Define a aparição e queda de pokeballs
        this.physics.add.overlap(this.player, this.pokeball, () => {
            if (this.pokeballsColetadas <= 5) {
                this.pokeball.setVisible(false);
                this.posicaopokeball_X = Phaser.Math.RND.between(50, 1230);
                this.posicaopokeball_Y = Phaser.Math.RND.between(0, 550);
                this.pokeball.setPosition(this.posicaopokeball_X, this.posicaopokeball_Y);
                this.pokeballsColetadas += 1;
                this.placar.setText('Pokéballs: ' + this.pokeballsColetadas);
                this.pokeball.setVisible(true);
            }
            if (this.pokeballsColetadas >= 5) {
                this.pokeball.setVisible(false);
                setTimeout(() => {
                    this.scene.start('GameOver');
                }, 2000);
            }
        });
    }

    // Atualização lógica do jogo
    update () {

        // Movimentação do personagem
        if (this.teclado.left.isDown) {
            this.player.setVelocityX(-300); // para esquerda
            this.player.anims.play('player_esquerda', true);
        } else if (this.teclado.right.isDown) { // para a direita
            this.player.setVelocityX(300);
            this.player.anims.play('player_direita', true);
        } else {
            this.player.setVelocityX(0); // fica parado
            this.player.anims.play('player_parado', true);
        }

        // Verifica se o personagem está no chão
        if (this.player.body.onFloor()) {
            this.pulando = false;
        }

        // Lógica de pulo
        if (this.teclado.up.isDown && !this.pulando) { // para cima
            this.player.setVelocityY(-800);
            this.pulando = true;
        } else { // para baixo (a gravidade atua como parâmetro físico)
            // Nada a fazer quando não estiver pulando
        }
    }
}