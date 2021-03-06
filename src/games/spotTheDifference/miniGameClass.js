import MiniGame from '../../miniGameBase.js';
import { drawPolygon, shuffle } from '../../utils.js';

export default class SpotTheDifference extends MiniGame {
  constructor() {
    super({
      name: 'Spot the Difference',
      instructions: 'Spot the Difference',
    });

    this.answerKey = [0, 0, 0, 1];
    shuffle(this.answerKey);

    this.nSides = floor(random(5, 8));

    this.radius = min([width, height]) / 6;

    this.angle = 0;
    this.angleStep = 0.005;
  }

  checkAnswer() {
    let answer;

    if (mouseX < width / 2) {
      if (mouseY < height / 2) {
        answer = 0;
      } else {
        answer = 2;
      }
    } else if (mouseY < height / 2) {
      answer = 1;
    } else {
      answer = 3;
    }

    if (this.answerKey[answer]) {
      this.gameWon = true;
    }

    this.gameOver = true;
  }

  resetGame() {
    shuffle(this.answerKey);
    this.nSides = floor(random(5, 8));
  }

  update() {
    this.angle += this.angleStep;

    if (this.events.mousePressed) {
      this.checkAnswer();
    }
  }

  draw() {
    push();
    stroke(255);
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);
    pop();

    this.answerKey.forEach((a, i) => {
      const nSides = this.nSides + a;
      let x;
      let y;

      if (i === 0 || i === 1) {
        y = height * 0.25;
      } else {
        y = height * 0.75;
      }

      if (i === 0 || i === 2) {
        x = width * 0.25;
      } else {
        x = width * 0.75;
      }

      drawPolygon(x, y, this.radius, this.angle + i * QUARTER_PI, nSides);
    });
  }
}
