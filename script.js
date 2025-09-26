let boardData = []; // set an empty array to push individual data into

const board = document.getElementById("board");

// const fetchData = async () => {
//   const data = [];

//   await axios
//     .get(`https://rithm-jeopardy.herokuapp.com/api/category?id=2`)
//     .then((response) => {
//       data.push(response?.data);
//     })
//     .catch((error) => {
//       console.log(`Couldn't get baseball data`, error);
//     });

//   await axios
//     .get("https://rithm-jeopardy.herokuapp.com/api/category?id=3")
//     .then((response) => {
//       data.push(response.data);
//       // console.log(boardData);
//     })
//     .catch((error) => {
//       console.log(`Couldn't get odd job data`, error);
//     });

//   await axios
//     .get("https://rithm-jeopardy.herokuapp.com/api/category?id=4")
//     .then((response) => {
//       data.push(response.data);
//       // console.log(boardData);
//     })
//     .catch((error) => {
//       console.log(`Couldn't get odd job data`, error);
//     });

//   await axios
//     .get("https://rithm-jeopardy.herokuapp.com/api/category?id=6")
//     .then((response) => {
//       data.push(response.data);
//       // console.log(boardData);
//     })
//     .catch((error) => {
//       console.log(`Couldn't get odd job data`, error);
//     });

//   await axios
//     .get("https://rithm-jeopardy.herokuapp.com/api/category?id=8")
//     .then((response) => {
//       data.push(response.data);
//       // console.log(boardData);
//     })
//     .catch((error) => {
//       console.log(`Couldn't get odd job data`, error);
//     });

//   await axios
//     .get("https://rithm-jeopardy.herokuapp.com/api/category?id=9")
//     .then((response) => {
//       data.push(response.data);
//     })
//     .catch((error) => {
//       console.log(`Couldn't get odd job data`, error);
//     });

//   boardData.push(data);
//   return data;
// };

// const categories = [
//   "Category 1",
//   "Category 2",
//   "Category 3",
//   "Category 4",
//   "Category 5",
//   "Category 6",
// ];

// const values = [200, 400, 600, 800, 1000, 1200];

// const questions = {};

async function loadCategories() {
  let res = await fetch(
    "https://rithm-jeopardy.herokuapp.com/api/categories?count=" +
      Math.floor(Math.random() * 100)
  );
  
  let categories = await res.json();

//   categories.forEach((cat) => {
//   // forEach through the categories
//   questions[cat] = values.map((val) => ({
//     // map through the values for each category
//     value: val,
//     question: `Question for ${cat}. What is the answer?`,
//     answer: `Answer for $${val}`,
//   }));
// });

  // for (let category of categories) {
  //   let qRes = await fetch(
  //     `https://rithm-jeopardy.herokuapp.com/api/category?id=${category.id}`
  //   );
  //   let clues = await qRes.json();

  //   // Shuffle & pick 5 clues
  //   //clues = clues.sort(() => 0.5 - Math.random()).slice(0, 5);

  //   questions.push({
  //     title: category.title.toUpperCase(),
  //     clues: clues,
  //   });
  // }
  buildBoard(categories.sort(() => 0.5 - Math.random()).slice(0, 6));
}

// categories.forEach((cat) => {
//   // forEach through the categories
//   questions[cat] = values.map((val) => ({
//     // map through the values for each category
//     value: val,
//     question: `Question for ${cat}. What is the answer?`,
//     answer: `Answer for $${val}`,
//   }));
// });

const init = () => {
  loadCategories();
};

// Build game board
const boardEl = document.getElementById("board");
function buildBoard(choices) {
  boardEl.innerHTML = "";
  choices.forEach((cat) => {
    for (let i = 0; i < 1; i++) {
      const el = document.createElement("div");
      el.className = "category";
      el.textContent = cat.title.toUpperCase();
      boardEl.appendChild(el);
    }
  });

  for (let i = 0; i < values.length; i++) {
    for (let c = 0; c < choices.length; c++) {
      const div = document.createElement("div");
      div.className = "cell";
      div.dataset.cat = choices[c];
      div.dataset.row = i;
      div.dataset.val = values[i];
      div.textContent = `$${values[i]}`;
      div.addEventListener("click", onCellClick);
      boardEl.appendChild(div);
    }
  }
}

// ***** Modal ***** //
const modal = document.getElementById("questionModal");
const modalCategory = document.getElementById("modalCat");
const modalValue = document.getElementById("modalVal");
const modalQuestion = document.getElementById("modalQuestion");
const modalAnswer = document.getElementById("modalAnswer");
const showAnswer = document.getElementById("showAnswer");
const correctBtn = document.getElementById("correctBtn");
const incorrectBtn = document.getElementById("incorrectBtn");
const closeModal = document.getElementById("closeModal");

let currentCell = null;

const onCellClick = (e) => {
  const cell = e.currentTarget;
  if (cell.classList.contains("disabled")) return;
  currentCell = cell;
  const cat = cell.dataset.cat;
  console.log(cat);
  const row = Number(cell.dataset.row);
  console.log(row);
  const questObj = questions[cat][row];
  modalCat.textContent = cat;
  modalVal.textContent = "Winnings - $" + questObj.value;
  modalQuestion.textContent = questObj.question;
  modalAnswer.textContent = questObj.answer;
  modalAnswer.style.display = "none";
  modal.style.display = "flex";
};

showAnswer.addEventListener("click", () => {
  modalAnswer.style.display =
    modalAnswer.style.display === "none" ? "block" : "none";
});

correctBtn.addEventListener("click", () => {
  if (!currentCell) return;
  const val = Number(currentCell.dataset.val);
  const active = activeTeamSelect.value;
  scores[active] += val;
  updateScoreDisplay();
  markAnswered(currentCell);
  modal.style.display = "none";
});

incorrectBtn.addEventListener("click", () => {
  alert("WRONG! WRONG!");
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

function markAnswered(cell) {
  cell.classList.add("disabled");
  cell.textContent = "";
}

init();
