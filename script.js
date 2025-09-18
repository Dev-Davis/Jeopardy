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
      console.log(data);
    })
    .catch((error) => {
      console.log(`Couldn't get odd job data`, error);
    });
};

fetchData();
