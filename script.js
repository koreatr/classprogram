// 퀴즈 문제 데이터 (선생님이 원하시는 문제로 자유롭게 수정하세요!)
const quizData = [
    {
        question: "다음 중 올바른 맞춤법은 무엇일까요?",
        options: ["어의없다", "어이없다"],
        answer: "어이없다"
    },
    {
        question: "빈칸에 알맞은 말은? '가는 말이 고와야 ( ) 말이 곱다'",
        options: ["오는", "듣는", "하는"],
        answer: "오는"
    },
    {
        question: "다음 중 띄어쓰기가 바른 것은?",
        options: ["오랜만에", "오랫만에", "오랜 만에"],
        answer: "오랜만에"
    },
    {
        question: "주인공이 겪는 갈등 중 '내적 갈등'에 해당하는 것은?",
        options: ["친구와의 다툼", "자연재해로 인한 위기", "양심과 욕심 사이의 고민"],
        answer: "양심과 욕심 사이의 고민"
    }
];

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreEl = document.getElementById('score');

let currentQuizIndex = 0;
let score = 0;

// 퀴즈 시작 함수
function loadQuiz() {
    resetState();
    const currentQuiz = quizData[currentQuizIndex];
    questionEl.innerText = `Q${currentQuizIndex + 1}. ${currentQuiz.question}`;

    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(button, option, currentQuiz.answer));
        optionsEl.appendChild(button);
    });
}

// 초기화 함수 (다음 문제로 넘어갈 때 기존 버튼들 삭제)
function resetState() {
    nextBtn.classList.add('hide');
    feedbackEl.classList.add('hide');
    feedbackEl.innerText = '';
    while (optionsEl.firstChild) {
        optionsEl.removeChild(optionsEl.firstChild);
    }
}

// 정답 선택 시 실행되는 함수
function selectAnswer(selectedButton, selectedOption, correctAnswer) {
    const isCorrect = selectedOption === correctAnswer;
    
    // 모든 버튼 비활성화
    Array.from(optionsEl.children).forEach(button => {
        button.disabled = true;
        if (button.innerText === correctAnswer) {
            button.classList.add('correct');
        }
    });

    feedbackEl.classList.remove('hide');
    
    if (isCorrect) {
        selectedButton.classList.add('correct');
        feedbackEl.innerText = "🎉 정답입니다!";
        feedbackEl.style.color = "#155724";
        score += 10;
        scoreEl.innerText = score;
    } else {
        selectedButton.classList.add('wrong');
        feedbackEl.innerText = "🥲 아쉽네요, 오답입니다.";
        feedbackEl.style.color = "#721c24";
    }

    if (currentQuizIndex < quizData.length - 1) {
        nextBtn.classList.remove('hide');
    } else {
        showFinalResult();
    }
}

// 최종 결과 화면
function showFinalResult() {
    setTimeout(() => {
        questionEl.innerText = `퀴즈 완료! 총 점수는 ${score}점입니다. 👏`;
        optionsEl.innerHTML = '';
        feedbackEl.classList.add('hide');
        restartBtn.classList.remove('hide');
    }, 1000);
}

// 다음 버튼 클릭 이벤트
nextBtn.addEventListener('click', () => {
    currentQuizIndex++;
    loadQuiz();
});

// 다시 풀기 버튼 클릭 이벤트
restartBtn.addEventListener('click', () => {
    currentQuizIndex = 0;
    score = 0;
    scoreEl.innerText = score;
    restartBtn.classList.add('hide');
    loadQuiz();
});

// 첫 퀴즈 로드
loadQuiz();
