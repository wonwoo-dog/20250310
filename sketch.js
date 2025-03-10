let questions = [
  { question: "1 + 1 = ?", options: [1, 2, 3, 4], correctAnswer: 2 },
  { question: "2 + 2 = ?", options: [2, 3, 4, 5], correctAnswer: 4 },
  { question: "3 + 3 = ?", options: [5, 6, 7, 8], correctAnswer: 6 },
  { question: "4 + 4 = ?", options: [7, 8, 9, 10], correctAnswer: 8 },
  { question: "5 + 5 = ?", options: [9, 10, 11, 12], correctAnswer: 10 }
];
let currentQuestionIndex = 0;
let question = questions[currentQuestionIndex].question;
let options = questions[currentQuestionIndex].options;
let correctAnswer = questions[currentQuestionIndex].correctAnswer;
let message = "";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  textSize(24);

  if (message) {
    textSize(32);
    if (message === "答對了!") {
      fill(0, 255, 0); // 綠色
    } else {
      fill(255, 0, 0); // 紅色
    }
    text(message, width / 2, height / 2);
  } else {
    text(question, width / 2, height / 2 - 50);

    for (let i = 0; i < options.length; i++) {
      let x = width / 2;
      let y = height / 2 + i * 40;
      fill(255);
      rect(x - 50, y - 20, 100, 30);
      fill(0);
      text(options[i], x, y);
    }
  }
}

function mousePressed() {
  if (message) return;

  for (let i = 0; i < options.length; i++) {
    let x = width / 2;
    let y = height / 2 + i * 40;
    if (mouseX > x - 50 && mouseX < x + 50 && mouseY > y - 20 && mouseY < y + 10) {
      if (options[i] === correctAnswer) {
        message = "答對了!";
        setTimeout(nextQuestion, 3000);
      } else {
        message = "答錯了再一次!";
        setTimeout(clearMessage, 3000);
      }
    }
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadCurrentQuestion();
    message = "";
  } else {
    message = "所有題目都答對了!";
  }
}

function clearMessage() {
  message = "";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function loadCurrentQuestion() {
  question = questions[currentQuestionIndex].question;
  options = questions[currentQuestionIndex].options;
  correctAnswer = questions[currentQuestionIndex].correctAnswer;
}

