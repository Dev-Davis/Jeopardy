const cats = document.getElementById("categories");
const li = document.createElement("li");

let dataCategory = [];

// const getSubjects = async () => {
//   axios
//     .get("https://rithm-jeopardy.herokuapp.com/api/categories?count=6")
//     .then((res) => {
//       data = res?.data;
//       // console.log(data)
//       data?.forEach(el => {
//         // creates a div for each category
//         const ul = document.createElement('ul')
//         ul.textContent = `${el?.title.toUpperCase()}`
//         cats.appendChild(ul)
//         ul.classList.add('subject')
//       })
//     }).catch((err) => {
//       console.log('Could not get categories', err)
//     })
// };

axios
  .get("https://rithm-jeopardy.herokuapp.com/api/categories?count=6")
  .then((response) => {
    dataCategory = response?.data;
    console.log(dataCategory);
    //       // console.log(data)
    dataCategory?.forEach((el) => {
      // creates a div for each category
      const ul = document.createElement("ul");
      ul.textContent = `${el?.title.toUpperCase()}`;
      cats.appendChild(ul);
      ul.classList.add("subject");
    });
  })
  .catch((error) => {
    console.log("Error fetching data:", error);
  });

  console.log(dataCategory)