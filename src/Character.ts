class Character {
    public size = {} as any;
    public position = { x: 0, y: 0 };
    public velocityY = 0;
    public imgSrc = null as any;
    public sides = {
        bottom: this.size.height + this.position.y,
        right: this.position.x + this.size.width
    }
    public point = 0 as number;


    constructor(imgSrc: string, size: object) {
        this.size = size;
        this.imgSrc = imgSrc;
    }

    update() {
        this.position.y += this.velocityY;

        this.sides.bottom = Math.floor(this.size.height + this.position.y);
        this.sides.right = Math.floor(this.position.x + this.size.width);

        if (this.sides.bottom < 400) {
            this.velocityY += 0.8;
        } else {
            this.velocityY = 0;
            this.position.y = 400 - this.size.height;
        }

        this.point += 1;
    }

    draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        ctx.font = '20px sans-serif'
        ctx.fillText(`Point: ${this.point}`, 10, 20);

        ctx.fillStyle = '#f00';
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }

    
}