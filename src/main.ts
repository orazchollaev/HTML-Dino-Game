const canvas = document.querySelector<HTMLCanvasElement>('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

//Global Variables
let oneBlockSize = 20 as number;
let gameOver = false;

//Canvas width
canvas.width = oneBlockSize * 40;
canvas.height = oneBlockSize * 20;

//Create Character
const character = new Character('de', {width: oneBlockSize * 2, height: oneBlockSize * 4});

//Create Enemy
const enemy = new Enemy('23', {width: oneBlockSize * 2, height: oneBlockSize * 2});

//Input Handler
document.addEventListener('keypress', (e: any) => {
  if(e.keyCode === 32){
    if(character.sides.bottom < canvas.height) return;
    character.velocityY = -16;
  }
})


//Update and Draw functions
const update = () => {
  character.update();
  enemy.update();
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  character.draw(canvas, ctx);
  enemy.draw(canvas, ctx)
}


//Check Collision
function collision() {
  return (
    character.position.x + character.size.width >= enemy.position.x && // character right collides with enemy left
    enemy.position.x + enemy.size.width >= character.position.x && // enemy right collides with character left
    character.position.y + character.size.height >= enemy.position.y && // character bottom collides with enemy top
    enemy.position.y + enemy.size.height >= character.position.y // character top collides with enemy bottom
  )
}

//Game Loop
const loop = () => {
  if(!gameOver)
    requestAnimationFrame(loop);

  if(collision()){
    gameOver = true;
    window.location.reload(false);

    if(character.point >= JSON.parse(localStorage.getItem('point'))){
      alert(`Game Over, Old Record: ${localStorage.getItem('point')}, New Record: ${character.point}`);
      localStorage.setItem('point', character.point);
    }

    alert('Game Over')
  }

  update();
  draw();
}

loop(); 