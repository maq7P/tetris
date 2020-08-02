export default class View {
    static colors = {
        '1': 'cyan',
        '2': 'blue',
        '3': 'orange',
        '4': 'yellow',
        '5': 'white',
        '6': 'purple',
        '7': 'red',
    };

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
                   this.renderBlock(x * this.blockWidth, y * this.blockHeight, this.blockWidth, this.blockHeight, View.colors[block]);
                }
                
            }
            
        }
    }

    renderBlock(x, y, width, height, color) {
         this.context.fillStyle = color;
         this.context.strokeStyle = 'black';
         this.context.lineWidth = 2;

         this.context.fillRect(x, y, width, height);
         this.context.strokeRect(x, y, width, height);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height)
    }

}