let boardData = []; // set an empty array to push individual data into

const board = document.getElementById("board");

const fetchData = async () => {
  const data = [];

  await axios
    .get(`https://rithm-jeopardy.herokuapp.com/api/category?id=2`)
    .then((response) => {
      data.push(response?.data);
    })
    .catch((error) => {
      console.log(`Couldn't get baseball data`, error);
    });

  await axios
    .get("https://rithm-jeopardy.herokuapp.com/api/category?id=3")
    .then((response) => {
      data.push(response.data);
      // console.log(boardData);
    })
    .catch((error) => {
      console.log(`Couldn't get odd job data`, error);
    });

  await axios
    .get("https://rithm-jeopardy.herokuapp.com/api/category?id=4")
    .then((response) => {
      data.push(response.data);
      // console.log(boardData);
    })
    .catch((error) => {
      console.log(`Couldn't get odd job data`, error);
    });

  await axios
    .get("https://rithm-jeopardy.herokuapp.com/api/category?id=6")
    .then((response) => {
      data.push(response.data);
      // console.log(boardData);
    })
    .catch((error) => {
      console.log(`Couldn't get odd job data`, error);
    });

  await axios
    .get("https://rithm-jeopardy.herokuapp.com/api/category?id=8")
    .then((response) => {
      data.push(response.data);
      // console.log(boardData);
    })
    .catch((error) => {
      console.log(`Couldn't get odd job data`, error);
    });

  await axios
    .get("https://rithm-jeopardy.herokuapp.com/api/category?id=9")
    .then((response) => {
      data.push(response.data);
    })
    .catch((error) => {
      console.log(`Couldn't get odd job data`, error);
    });

  boardData.push(data);
  return data;
};

const categories = [
  "Category 1",
  "Category 2",
  "Category 3",
  "Category 4",
  "Category 5",
  "Category 6",
];

const values = [200, 400, 600, 800, 1000, 1200];

const questions = {};
categories.forEach((cat, ci) => {
  questions[cat] = values.map((val, vi) => ({
    value: val,
    question: `Sample Q: ${cat} for $${val}. What is an example answer?`,
    answer: `Example answer for ${cat} $${val}`,
  }));
});

const init = () => {
  buildBoard();
};

// Build board
const boardEl = document.getElementById("board");
function buildBoard() {
  boardEl.innerHTML = "";
  categories.forEach((cat) => {
    const el = document.createElement("div");
    el.className = "category";
    el.textContent = cat;
    boardEl.appendChild(el);
  });
  for (let i = 0; i < values.length; i++) {
    for (let c = 0; c < categories.length; c++) {
      const div = document.createElement("div");
      div.className = "cell";
      div.dataset.cat = categories[c];
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
const revealAnswer = document.getElementById("revealAnswer");
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
  modalVal.textContent = "$" + questObj.value;
  modalQuestion.textContent = questObj.question;
  modalAnswer.textContent = questObj.answer;
  modalAnswer.style.display = "none";
  modal.style.display = "flex";
};

revealAnswer.addEventListener("click", () => {
  modalA.style.display = modalA.style.display === "none" ? "block" : "none";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

function markAnswered(cell) {
  cell.classList.add("disabled");
  cell.textContent = "";
}

init();
