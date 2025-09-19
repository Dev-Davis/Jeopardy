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

console.log(boardData);

const init = () => {
  buildBoard();
};

function blockClick(e) {
  const cell = e.currentTarget;
  if (cell.classList.contains("disabled")) return;
  currentCell = cell;
  const cat = cell.dataset.cat;
  const row = Number(cell.dataset.row);
  const qObj = questions[cat][row];
  modalCat.textContent = cat;
  modalVal.textContent = "$" + qObj.value;
  modalQ.textContent = qObj.question;
  modalA.textContent = qObj.answer;
  modalA.style.display = "none";
  modal.style.display = "flex";
}

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
  for (let r = 0; r < values.length; r++) {
    for (let c = 0; c < categories.length; c++) {
      const div = document.createElement("div");
      div.className = "cell";
      div.dataset.cat = categories[c];
      div.dataset.row = r;
      div.dataset.val = values[r];
      div.textContent = `$${values[r]}`;
      div.addEventListener("click", blockClick);
      boardEl.appendChild(div);
    }
  }
}

init();
