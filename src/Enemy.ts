class Enemy{
    public size = {} as any;
    public position = { x: 760, y: 360 };
    public velocityY = 0;
    public velocityX = -5;
    public imgSrc = null as any;
    public sides = {
        bottom: this.size.height + this.position.y,
        left: this.position.x - this.size.width
    }
    public randomallyPosition = 0;


    constructor(imgSrc: string, size: object) {
        this.size = size;
        this.imgSrc = imgSrc;
    }

    update() {
        this.position.x += Math.floor(this.velocityX);
        this.position.y += this.velocityY;

        this.sides.bottom = Math.floor(this.size.height + this.position.y);
        this.sides.left = Math.floor(this.position.x - this.size.width);
        



        if(this.sides.left <= -100){
            let space = Math.floor(Math.random() * 1000) + 850;

            this.position.x = space;

            this.randomallyPosition = Math.floor(Math.random() * 4);
            if(this.randomallyPosition < 3){
                this.position.y = 360;
            }else{
                this.position.y = 220;
            }
        }

        this.velocityX -= 0.01;
    }

    draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {

        ctx.fillStyle = '#00f';
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
}