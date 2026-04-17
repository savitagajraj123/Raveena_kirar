async function loadLeaderboard() {
  const res = await fetch("http://localhost:3000/leaderboard");
  const data = await res.json();

  let list = "";

  data.forEach((user, index) => {
    list += `<li>${index + 1}. ${user.email} - Score: ${user.score}</li>`;
  });

  document.getElementById("leaderboardList").innerHTML = list;
}

loadLeaderboard();