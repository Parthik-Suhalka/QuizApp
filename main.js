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
const backBtn = document.getElementById('backBtn');
const quizApp = document.getElementById('quiz-app');
const inputform = document.getElementById('inputform');
const userEmail = document.getElementById('useremail');
const userName = document.getElementById('username');
const usernamepara = document.getElementById('usernamepara');

let index = 0;
let score = 0;
let prevIndex = 0;
let obj = {};


swap();

let array = [...arr]


function render() {
  deselect();

  const currentmcq = arr[index];

  question.innerText = currentmcq.question;
  optionA.innerText = currentmcq.a;
  optionB.innerText = currentmcq.b;
  optionC.innerText = currentmcq.c;
  optionD.innerText = currentmcq.d;

  if (index != 0) {
    backBtn.style.display = "block";
  }
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

  const useremail = userEmail.value

  let answer = selected();

  if (answer) {

    if (!obj.selectedOpt) {
      obj.selectedOpt = {
        [index]: answer
      }
    }
    else {
      obj.selectedOpt[index] = answer
    }


    prevIndex = index

    index++;

    obj.prevIndex = prevIndex;
    obj.index = index;
    localStorage.setItem(useremail, JSON.stringify(obj));


    if (index < arr.length) {
      render();
    } else {

      let data = localStorage.getItem(useremail)
      data = JSON.parse(data)
      selectedOpt = data.selectedOpt

      for(let i=0; i<array.length; i++){
        if (selectedOpt[i] === array[i].ans) {
          score++;
        }
      }

      obj.score = score
      localStorage.setItem(useremail, JSON.stringify(obj));


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









inputform.addEventListener('submit', (e) => {

  e.preventDefault()

  const useremail = userEmail.value
  const username = userName.value

  let validation = useremail.toLowerCase().match(
    /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
  );

  if (!validation) {
    alert("Please Enter valid email address")
    location.reload()
  }
  else {
    if (localStorage.length >= 10) {
      alert("You have reached max limit of attending the quiz")
      window.close()
    }
    else {

      let check = false;
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == useremail) {
          check = true;
          break;
        }
      }


      if (check == false) {

        obj = { username, useremail }
        localStorage.setItem(useremail, JSON.stringify(obj));

        quizApp.style.display = "none";
        box.style.display = "block";
        render();

        usernamepara.innerText = `Hey, ${username}`
      }
      else {

        box.innerHTML = ``

        let table = document.createElement('table')
        let tr = document.createElement('tr')
        let th1 = document.createElement('th')
        let th2 = document.createElement('th')
        let th3 = document.createElement('th')


        box.insertAdjacentElement("afterbegin", table)
        table.insertAdjacentElement("afterbegin", tr)
        tr.insertAdjacentElement("afterbegin", th1)
        th1.innerText = "Username"
        tr.insertAdjacentElement("beforeend", th2)
        th2.innerText = "Email"
        tr.insertAdjacentElement("beforeend", th3)
        th3.innerText = "Score"


        for (let i = 0; i < localStorage.length; i++) {
          let x = localStorage.key(i)
          let user = localStorage.getItem(x)
          user = JSON.parse(user)

          let tr = document.createElement('tr')
          let td1 = document.createElement('td')
          let td2 = document.createElement('td')
          let td3 = document.createElement('td')

          table.insertAdjacentElement("beforeend", tr)
          tr.insertAdjacentElement("afterbegin", td1)
          td1.innerHTML = `${user.username}`
          tr.insertAdjacentElement("beforeend", td2)
          td2.innerHTML = `${user.useremail}`
          tr.insertAdjacentElement("beforeend", td3)
          td3.innerHTML = `${user.score}`

        }

        box.innerHTML += `<button onclick = "location.reload()" > Reload </button>`


        quizApp.style.display = "none";
        box.style.display = "block";


      }

    }

  }


})


backBtn.addEventListener("click", () => {

  const useremail = userEmail.value

  let data = localStorage.getItem(useremail)
  data = JSON.parse(data)
  prevIndex = data.prevIndex;
  selectedOpt = data.selectedOpt[prevIndex]


  options.forEach((option) => {
    if(option.id == selectedOpt){
      option.checked = true;
    }
  })


  const currentmcq = arr[prevIndex];

  question.innerText = currentmcq.question;
  optionA.innerText = currentmcq.a;
  optionB.innerText = currentmcq.b;
  optionC.innerText = currentmcq.c;
  optionD.innerText = currentmcq.d;

  if (prevIndex != 0) {
    backBtn.style.display = "block";
  }
  else {
    backBtn.style.display = "none";
  }


  index = prevIndex;
  prevIndex--;


  obj.prevIndex = prevIndex;
  obj.index = index;
  localStorage.setItem(useremail, JSON.stringify(obj));

})
