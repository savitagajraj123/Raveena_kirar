const topic = localStorage.getItem("topic");
const username = localStorage.getItem("username");

document.getElementById("username").innerText = "Name: " + username;
document.getElementById("topicTitle").innerText = "Topic: " + topic;

const data = {
    "Time and Work": [
        { q: "A completes work in 10 days. 1 day work?", options: ["1/10","1/5","2/10"], answer: "1/10" },
        { q: "A & B together complete work in 5 days?", options: ["1/5","1/10","2/5"], answer: "1/5" },
        { q: "If work doubles, time becomes?", options: ["5","10","20"], answer: "5" }
    ],

    "Percentage": [
        { q: "50% of 200?", options: ["100","150","200"], answer: "100" },
        { q: "20% of 150?", options: ["20","30","40"], answer: "30" },
        { q: "10% of 500?", options: ["50","100","150"], answer: "50" }
    ],

    "Ratio": [
        { q: "2:4 simplifies to?", options: ["1:2","2:1","4:2"], answer: "1:2" },
        { q: "3:6=?", options: ["1:2","2:3","3:1"], answer: "1:2" }
    ],

    "Profit": [
        { q: "CP=100 SP=120 Profit?", options: ["10","20","30"], answer: "20" },
        { q: "CP=200 SP=150 Loss?", options: ["50","30","20"], answer: "50" }
    ],

    "TimeDistance": [
        { q: "Speed formula?", options: ["Distance/Time","Time/Distance","Distance*Time"], answer: "Distance/Time" },
        { q: "Distance = ?", options: ["Speed×Time","Time/Speed","Speed/Time"], answer: "Speed×Time" }
    ],

    "Average": [
        { q: "Average of 2,4,6?", options: ["4","5","6"], answer: "4" },
        { q: "Average of 10,20,30?", options: ["20","15","25"], answer: "20" }
    ]
};

let questions = data[topic];
let currentQ = 0;
let score = 0;
let timeLeft = 10;
let timer;

// SHOW QUESTION
function showQuestion() {
    clearInterval(timer);
    timeLeft = 10;

    document.getElementById("timer").innerText = "Time: " + timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = "Time: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);

    let q = questions[currentQ];
    document.getElementById("question").innerText = q.q;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(opt => {
        let btn = document.createElement("button");
        btn.innerText = opt;

        btn.onclick = () => {
            clearInterval(timer);

            if (opt === q.answer) score++;

            let all = optionsDiv.querySelectorAll("button");
            all.forEach(b => b.disabled = true);
        };

        optionsDiv.appendChild(btn);
    });

    // progress
    document.getElementById("progress").innerText =
        `Question ${currentQ + 1} / ${questions.length}`;
}

// NEXT
function nextQuestion() {
    currentQ++;

    if (currentQ < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// RESULT + LEADERBOARD
function showResult() {
    document.getElementById("quizBox").style.display = "none";

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({
        name: username,
        score: score,
        total: questions.length
    });

    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    let html = `<h2>${username}, Score: ${score}/${questions.length}</h2>`;
    html += `<h3>🏆 Leaderboard</h3>`;

    leaderboard.slice(0,5).forEach((u, i) => {
        let medal = i==0?"🥇":i==1?"🥈":i==2?"🥉":"";
        html += `<p>${medal} ${u.name} - ${u.score}/${u.total}</p>`;
    });

    document.getElementById("result").innerHTML = html;
    document.getElementById("result").style.display = "block";
}

// BACK
function goBack() {
    window.location.href = "aptitude.html";
}

// START
showQuestion();