function openQuiz(topic) {
    // store selected topic
    localStorage.setItem("topic", topic);

    // ask user name
    let name = prompt("Enter your name:");
    localStorage.setItem("username", name);

    // open new page
    window.location.href = "quiz.html";
}