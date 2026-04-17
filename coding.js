const levelSection = document.getElementById("levelSection");
const questionSection = document.getElementById("questionSection");
const practiceSection = document.getElementById("practiceSection");

const data = {
    Easy: [
        {
            title: "Reverse String",
            q: "Reverse a string",
            example: "hello → olleh",
            tests: [
                {input:"hello",output:"olleh"},
                {input:"abc",output:"cba"}
            ]
        },
        {
            title: "Even Odd",
            q: "Check even or odd",
            example: "4 → Even",
            tests: [
                {input:4,output:"Even"},
                {input:5,output:"Odd"}
            ]
        }
    ],

    Medium: [
        {
            title: "Palindrome",
            q: "Check palindrome",
            example: "madam → true",
            tests: [
                {input:"madam",output:true},
                {input:"hello",output:false}
            ]
        },
        {
            title: "Factorial",
            q: "Find factorial",
            example: "5 → 120",
            tests: [
                {input:5,output:120}
            ]
        }
    ],

    Hard: [
        {
            title: "Max Number",
            q: "Find max from array",
            example: "1,5,3 → 5",
            tests: [
                {input:"1,5,3",output:5}
            ]
        }
    ]
};

let currentLevel;
let currentQuestion;


// ✅ LOAD LEVEL CARDS (MAIN FIX)
function loadLevels(){
    levelSection.innerHTML = "";

    for(let level in data){
        let card = document.createElement("div");
        card.className = "card";
        card.innerText = level;

        card.onclick = () => openLevel(level);

        levelSection.appendChild(card);
    }
}

// 👉 FIRST LOAD
loadLevels();


// OPEN LEVEL
function openLevel(level){
    currentLevel = level;

    levelSection.style.display = "none";
    questionSection.style.display = "flex";

    questionSection.innerHTML = `
        <button class="backBtn" onclick="goBackToLevels()">⬅ Back</button>
    `;

    data[level].forEach((q,i)=>{
        let card = document.createElement("div");
        card.className = "card";
        card.innerText = q.title;

        card.onclick = () => openQuestion(i);

        questionSection.appendChild(card);
    });
}


// OPEN QUESTION
function openQuestion(index){
    currentQuestion = data[currentLevel][index];

    questionSection.style.display = "none";
    practiceSection.style.display = "block";

    document.getElementById("title").innerText = currentQuestion.title;
    document.getElementById("question").innerText = currentQuestion.q;
    document.getElementById("example").innerText = currentQuestion.example;
}


// RUN CODE
function runCode(){
    let code = document.getElementById("code").value;

    let pass = 0;
    let html = "";

    try{
        let fn = new Function("input", code);

        currentQuestion.tests.forEach((t,i)=>{
            let res = fn(t.input);

            if(res == t.output){
                pass++;
                html += `<p class="pass">✔ Test ${i+1} Passed</p>`;
            }else{
                html += `<p class="fail">✖ Test ${i+1} Failed (Expected ${t.output})</p>`;
            }
        });

        let finalText = `Score: ${pass}/${currentQuestion.tests.length}`;

        document.getElementById("result").innerText = finalText;

        if(pass === currentQuestion.tests.length){
            document.getElementById("result").className = "pass";
        } else {
            document.getElementById("result").className = "fail";
        }

        document.getElementById("testResults").innerHTML = html;

    }catch{
        document.getElementById("result").innerText = "Error in code!";
        document.getElementById("result").className = "fail";
    }
}

// function handleBack(){

//     // अगर practice page पर हो
//     if(practiceSection.style.display === "block"){
//         practiceSection.style.display = "none";
//         questionSection.style.display = "flex";
//     }

//     // अगर question page पर हो
//     else if(questionSection.style.display === "flex"){
//         questionSection.style.display = "none";
//         levelSection.style.display = "flex";
//     }

//     // अगर level page पर हो
//     else {
//         alert("You are already on Home Page 🚀");
//     }
// }

// BACK
function goBackToLevels(){
    questionSection.style.display = "none";
    levelSection.style.display = "flex";
}

function goBackToQuestions(){
    practiceSection.style.display = "none";
    questionSection.style.display = "flex";
}