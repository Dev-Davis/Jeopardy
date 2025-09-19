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

console.log(fetchData());

// const categories = boardData;
// const values = boardData;

const categories = [
  "Category 1",
  "Category 2",
  "Category 3",
  "Category 4",
  "Category 5",
  "Category 6",
];

const values = [200, 400, 600, 800, 1000, 1200];

function test() {
  return boardData.push([1, 2, 3, "test"]);
}

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
const questions = {};

categories?.forEach((cat, col) => {
  questions[cat] = values.map((val, v) => ({
    value: val,
    question: `Test quesstion: ${cat} and ${val} has a test answer?`,
    answer: `Test answer for ${cat} and ${val}`
  }))
})

const modal = document.getElementById("qModal");
const modalCategory = document.getElementById("modalCat");
const modalValue = document.getElementById("modalVal");
const modalQuestion = document.getElementById("modalQ");
const modalAnswer = document.getElementById("modalA");
const revealAnswer = document.getElementById("revealAnswer");
const correctBtn = document.getElementById("correctBtn");
const incorrectBtn = document.getElementById("incorrectBtn");
const closeModal = document.getElementById("closeModal");

let currentCell = null;

const onCellClick = (e) => {
  const cell = e.currentTarget;
  if (cell.classList.contains("disabled")) {
    return;
  }
  currentCell = cell;
  const cat = cell.dataset.cat;
  const row = Number(cell.dataset.row);
  const quest = questions[cat][row];
  modalCategory.textContent = cat;
  modalValue.textContent = `$${quest.value}`;
  modalQuestion.textContent = quest?.question;
  modalAnswer.textContent = quest?.answer;
  modalAnswer.style.display = "none";
  // modal.style.display = "flex";
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
