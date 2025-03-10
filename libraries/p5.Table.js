let questions = [];
let currentQuestionIndex = 0;
let question = "";
let options = [];
let correctAnswer = 0;
let message = "";
let table;

function preload() {
  table = loadTable('question.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadQuestions();
  loadCurrentQuestion();
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

function loadQuestions() {
  for (let r = 0; r < table.getRowCount(); r++) {
    let question = table.getString(r, 'question');
    let options = [
      table.getString(r, 'option1'),
      table.getString(r, 'option2'),
      table.getString(r, 'option3'),
      table.getString(r, 'option4')
    ];
    let correctAnswer = table.getString(r, 'correctAnswer'); // 使用 getString 來讀取正確答案
    questions.push({ question, options, correctAnswer });
  }
}

function loadCurrentQuestion() {
  question = questions[currentQuestionIndex].question;
  options = questions[currentQuestionIndex].options;
  correctAnswer = questions[currentQuestionIndex].correctAnswer;
}