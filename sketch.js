let questions = [];
let currentQuestionIndex = 0;
let selectedOption = -1;
let submitButton;
let resultText = '';
let resultColor = 0;
let isAnswerCorrect = false;
let correctCount = 0;
let incorrectCount = 0;
let table;

function preload() {
  table = loadTable('question.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(32);
  textAlign(CENTER, CENTER);
  submitButton = createButton('送出');
  submitButton.position(width / 2 - 50, height - 100);
  submitButton.mousePressed(checkAnswer);

  // Load questions from CSV
  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    let question = row.getString('question');
    let options = [
      row.getString('option1'),
      row.getString('option2'),
      row.getString('option3'),
      row.getString('option4')
    ];
    let correct = parseInt(row.getString('correct')); // 使用 parseInt 將字符串轉換為整數
    questions.push({ question, options, correct });
  }
}

function draw() {
  background('#FFC1E0'); // 背景顏色
  fill(0); // 題目顏色
  if (questions.length > 0) {
    text(questions[currentQuestionIndex].question, width / 2, height / 4);

    for (let i = 0; i < questions[currentQuestionIndex].options.length; i++) {
      let x = width / 2 - 100;
      let y = height / 2 + i * 50;
      fill(0); // 圈圈顏色
      ellipse(x, y, 20, 20);
      if (selectedOption === i) {
        fill(0);
        ellipse(x, y, 10, 10);
        fill(255);
      } else {
        fill(255);
        ellipse(x, y, 10, 10);
      }
      fill(0); // 選項文字顏色
      textAlign(LEFT, CENTER);
      text(questions[currentQuestionIndex].options[i], x + 30, y);
    }

    fill(resultColor); // 答對或答錯的文字顏色
    textAlign(CENTER, CENTER);
    text(resultText, width / 2, height - 50);

    // 顯示左上角的文字
    textAlign(LEFT, TOP);
    textSize(24);
    fill(0);
    text('413730143胡妍妮', 10, 10);
    text(`答對題數: ${correctCount}`, 10, 40);
    text(`答錯題數: ${incorrectCount}`, 10, 70);
  } else {
    text('無法加載問題，請檢查CSV文件。', width / 2, height / 2);
  }
}

function mousePressed() {
  if (questions.length > 0) {
    for (let i = 0; i < questions[currentQuestionIndex].options.length; i++) {
      let x = width / 2 - 100;
      let y = height / 2 + i * 50;
      if (dist(mouseX, mouseY, x, y) < 10) {
        selectedOption = i;
      }
    }
  }
}

function checkAnswer() {
  if (questions.length > 0 && selectedOption !== -1) {
    if (selectedOption === questions[currentQuestionIndex].correct) {
      resultText = '答對了!';
      resultColor = color(0, 255, 0); // 綠色
      isAnswerCorrect = true;
      correctCount++;
      submitButton.html('下一題');
      submitButton.mousePressed(nextQuestion);
    } else {
      resultText = '答錯了!';
      resultColor = color(255, 0, 0); // 紅色
      incorrectCount++;
    }
  }
}

function nextQuestion() {
  if (isAnswerCorrect) {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
      currentQuestionIndex = 0; // 從頭開始
    }
    selectedOption = -1; // 重置選擇
    resultText = '';
    resultColor = 0;
    isAnswerCorrect = false;
    submitButton.html('送出');
    submitButton.mousePressed(checkAnswer);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  submitButton.position(width / 2 - 50, height - 100);
}