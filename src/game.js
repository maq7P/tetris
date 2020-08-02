export default class Game {
    score = 0
    lines = 0
    level = 0

    playfiled = this.createPlayfiled()
   
    activePiece = this.createPiece()

    nextPiece = this.createPiece()



    // Создаёт игровое поле из нулей
    createPlayfiled() {
        const playfiled = [];

        for (let y = 0; y < 20; y++) {
            playfiled[y] = [];
            for (let x = 0; x < 10; x++) {
                playfiled[y][x] = 0;
            }
        }

        return playfiled;
    }

    createPiece() {
        const index = Math.floor(Math.random() * 7);
        const type = 'IJLOSTZ'[index];
        const piece = {};

        switch (type){
            case 'I':
                piece.blocks = [
                    [0,0,0,0],
                    [1,1,1,1],
                    [0,0,0,0],
                    [0,0,0,0],
                ];
                break;
            case 'J':
                piece.blocks = [
                    [0,0,0],
                    [2,2,2],
                    [0,0,2],
                ];
                break;
            case 'L':
                piece.blocks = [
                    [0, 0, 0],
                    [3, 3, 3],
                    [3, 0, 0],
                ];
                break;
            case 'O':
                piece.blocks = [
                    [0, 0, 0, 0],
                    [0, 4, 4, 0],
                    [0, 4, 4, 0],
                    [0, 0, 0, 0],
                ];
                break;
            case 'S':
                piece.blocks = [
                    [0, 0, 0],
                    [0, 5, 5],
                    [5, 5, 0],
                ];
                break;
            case 'T':
                piece.blocks = [
                    [0, 0, 0],
                    [6, 6, 6],
                    [0, 6, 0],
                ];
                break;
            case 'Z':
                piece.blocks = [
                    [0, 0, 0],
                    [7, 7, 0],
                    [0, 7, 7],
                ];
                break;
            default:
                throw new Error('Неизвестный тип фигуры')
        }
        piece.x = Math.floor((10 - piece.blocks[0].length) / 2);
        piece.y = -1;

        return piece
    }

    // Копирует фигуру с настоящего поля  и выводит уже новый масив с активно фигурой
    getState() {
        const copyPlayfiled = this.createPlayfiled();

        for (let y = 0; y < this.playfiled.length; y++) {
            copyPlayfiled[y] = [];
            for (let x = 0; x < this.playfiled[y].length; x++) {
                copyPlayfiled[y][x] = this.playfiled[y][x];
            }
        }

        for (let y = 0; y < this.activePiece.blocks.length; y++) {
            for (let x = 0; x < this.activePiece.blocks[y].length; x++) {
                if (this.activePiece.blocks[y][x]) {
                    copyPlayfiled[this.activePiece.y + y][this.activePiece.x + x] = this.activePiece.blocks[y][x];
                }
            }
        }

        return {
            copyPlayfiled
        }
    }


      



    movePieceLeft() {
        this.activePiece.x -= 1;

        if (this.hasCollision()){
            this.activePiece.x += 1;
        }
    }
    movePieceRight() {
        this.activePiece.x += 1;

        if (this.hasCollision()) {
            this.activePiece.x -= 1;
        }
    }
    movePieceDown() {
        this.activePiece.y += 1;

        if (this.hasCollision()) {
            this.activePiece.y -= 1;
            this.lockPiece();
            this.updatePiece();
        }
    }

    rotatePiece() {
        const blocks = this.activePiece.blocks;
        const length = blocks.length;

        const temp = [];
        for (let i = 0; i < length; i++) {
            temp[i] = new Array(length).fill(0);
        }

        for (let y = 0; y < length; y++) {
            for (let x = 0; x < length; x++) {
                temp[x][y] = blocks[length - 1 - y][x];    
            }
            
        }

        this.activePiece.blocks = temp;

        if (this.hasCollision()){
            this.activePiece.blocks = blocks;
        }
    }

    // Проверка на столкновение и на наличие стенок
    hasCollision() {
       const { y: pieceY, x: pieceX, blocks} = this.activePiece;

        for (let y = 0; y < blocks.length; y++){
            for(let x = 0; x < blocks[y].length; x++){
                if (blocks[y][x] && 
                    ((this.playfiled[pieceY + y] === undefined || this.playfiled[pieceY + y][pieceX + x] === undefined) ||
                    this.playfiled[pieceY + y][pieceX + x] )) {
                    return true;
                }
            }
        }
        return false;
    }

    // Фиксирует игровеое поле с активной фигурой
    lockPiece(){
        const { y: pieceY, x: pieceX, blocks} = this.activePiece;

        for (let y = 0; y < blocks.length; y++){
            for(let x = 0;x < blocks[y].length; x++){
                if(blocks[y][x]){
                    this.playfiled[pieceY + y][pieceX + x] = blocks[y][x];
                }
            }
        }
    }

    updatePiece() {
        this.nextPiece = this.createPiece();
        this.activePiece = this.nextPiece;
    }

    
}