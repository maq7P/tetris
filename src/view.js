export default class View {
    constructor(element, width, height, rows, columns) {
        this.element = element;
        this.width = width;
        this.height = height;
        
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.blockWidth = this.width / columns;
        this.blockHeight = this.height / rows;

        this.element.appendChild(this.canvas);
    }

    render({ copyPlayfiled }){
        this.clearScreen()

        for (let y = 0; y < copyPlayfiled.length; y++) {
            const line = copyPlayfiled[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];

                if(block) {
                    this.context.fillStyle = 'red';
                    this.context.strokeStyle = 'black';
                    this.context.lineWidth = 2;

                    this.context.fillRect(x * this.blockWidth, y * this.blockHeight, this.blockWidth, this.blockHeight);
                }
                
            }
            
        }
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height)
    }

}