const arr = [
  {
    question: "What year was JavaScript Launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    ans: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "HyperText Markup Language",
    b: "HyperText Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    ans: "a",
  },
  {
    question: "Which Language run in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    ans: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Central Simple Sheets",
    d: "Cars SUVs Sailboats",
    ans: "b",
  },
];

const box = document.getElementById("box");
const question = document.getElementById("question");
const options = document.querySelectorAll(".option");
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const optionC = document.getElementById("optionC");
const optionD = document.getElementById("optionD");
const submit = document.getElementById("submit");

let index = 0;
let score = 0;

swap();

// render();

function render() {
  deselect();

  const currentmcq = arr[index];

  question.innerText = currentmcq.question;
  optionA.innerText = currentmcq.a;
  optionB.innerText = currentmcq.b;
  optionC.innerText = currentmcq.c;
  optionD.innerText = currentmcq.d;
}

function deselect() {
  options.forEach((option) => (option.checked = false));
}

function selected() {
  let answer;
  options.forEach((option) => {
    if (option.checked) {
      answer = option.id;
    }
  });
  return answer;
}

submit.addEventListener("click", () => {
  let answer = selected();

  if (answer) {
    if (answer === arr[index].ans) {
      score++;
    }

    index++;

    if (index < arr.length) {
      render();
    } else {
      box.innerHTML = `
            <h2>You answered ${score}/${arr.length} questions correctly</h2>
            <button onclick = "location.reload()" > Reload </button>
            `;
    }
  } else {
    alert("Please select one option");
  }
});

function swap() {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}







const quizApp = document.getElementById('quiz-app')

const inputform = document.getElementById('inputform')

inputform.addEventListener('submit', (e) => {

  e.preventDefault()

  const useremail = document.getElementById('useremail').value
  const username = document.getElementById('username').value
  const usernamepara = document.getElementById('usernamepara')

  setitem(useremail, username)

  usernamepara.innerText = `Hey, ${username}`

  quizApp.style.display = "none";
  box.style.display = "block";
  render();

})


function setitem(useremail, username){
  localStorage.setItem(useremail,username);
}
