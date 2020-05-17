let styleArray = [];
let box = document.querySelector(".box");
let divs = box.getElementsByTagName("div");
const addMore = document.querySelector(".button");
const popup = document.getElementById("popup__close");
let addButton = document.querySelector(".ok");
let dataObject = [];
let dt = new Date();
let year = dt.getFullYear();

document.querySelector('.year').textContent = ` ${year}`;

function addDiv(div, i, max, obj) {
  div.children[i+1].insertAdjacentHTML(
    "beforebegin",
    // `<div class="box_style enter" id="b${max}">Inserted Element ${max}</div>`
    `<div class="box__main enter" id="b${max}">
    <div class="box--1">
      <div class="box--event">Name of Event:</div>
      <div class="box__main--heading">${obj.name}</div>
    </div>
    <div class="box--2">
      <div class="part1">
        <div class="box--date">Date</div>
        <div class="box__main--date">${obj.date}</div>
      </div>
      <div class="part2">
        <div class="box--time">Time</div>
        <div class="box__main--time">${obj.time}</div>
      </div>
    </div>
  </div>`
  );
  document
    .getElementById(`b${max}`)
    .addEventListener("click", () => deleteItem(`b${max}`));
}

function findDiv() {
  styleArray = [];
  divs = box.getElementsByTagName("div");
  for (let i = 0; i < divs.length; i++) styleArray.push(divs[i].id.toString());
}

function deleteItem(selectorID) {
  // console.log(selectorID);
  document.getElementById(selectorID).classList.remove("entry");
  document.getElementById(selectorID).classList.add("exit");
  console.log(document.getElementById(selectorID).parentNode);
  const box = document.getElementById("my-box");
  setTimeout(() => {
    box.removeChild(document.getElementById(selectorID));
  }, 500);
  slicedString = parseInt(selectorID.slice(1,selectorID.length));
  slicedIndex = parseInt((slicedString - 1) / 11);
  dataObject.splice(slicedIndex, 1);
  Toastify({
    text: "Task Removed",
    backgroundColor: "linear-gradient(to right, #f77225, #f50a0a)",
  }).showToast();
  console.log(dataObject);
}

// addMore.addEventListener("click", () => {
//   findDiv();
//   addDiv(box, 0, styleArray.length + 1);
// });

function readData() {
  index = dataObject.length;
  let nameData = document.querySelector(".input-text");
  let dateTime = document.querySelector(".form-control");
  dataObject.push({
    name: nameData.value,
    date: dateTime.value.toString().split("|")[0],
    time: dateTime.value.toString().split("|")[1],
  });
  nameData.value = '';
  dateTime.value = '';
  console.log(dataObject);
  // addDiv();
  addDiv(box, 0, styleArray.length + 1, dataObject[index]);
  document.getElementById("popup").classList.remove("open");
  document.getElementById("popup").classList.remove("close");
  document.getElementById("popup").classList.add("close");
  setTimeout(() => {
    document.getElementById("popup").style.display = "none";
  }, 500);
  Toastify({
    text: "Task Added",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  }).showToast();
}

addMore.addEventListener("click", () => {
  findDiv();
  document.getElementById("popup").classList.remove("close");
  document.getElementById("popup").classList.remove("open");
  document.getElementById("popup").classList.add("open");
  setTimeout(() => {
    document.getElementById("popup").style.display = "block";
  }, 500);

  addButton.addEventListener("click", readData);
});

popup.addEventListener("click", () => {
  document.getElementById("popup").classList.remove("open");
  document.getElementById("popup").classList.remove("close");
  document.getElementById("popup").classList.add("close");
  setTimeout(() => {
    document.getElementById("popup").style.display = "none";
  }, 500);
});

$(function () {
  var bindDatePicker = function() {
   $(".date").datetimepicker({
       format:'YYYY-MM-DD | hh:mm A',
     icons: {
       time: "glyphicon glyphicon-time",
       date: "glyphicon glyphicon-calendar",
       up: "glyphicon glyphicon-chevron-up",
       down: "glyphicon glyphicon-chevron-down"
     }
   }).find('input:first').on("blur",function () {
     var date = parseDate($(this).val());

     if (! isValidDate(date)) {
       date = moment().format('YYYY-MM-DD | hh:mm A');
     }

     $(this).val(date);
   });
 }

  var isValidDate = function(value, format) {
   format = format || false;
   if (format) {
     value = parseDate(value);
   }

   var timestamp = Date.parse(value);

   return isNaN(timestamp) == false;
  }

  var parseDate = function(value) {
   var m = value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);
   if (m)
     value = m[5] + '-' + ("00" + m[3]).slice(-2) + '-' + ("00" + m[1]).slice(-2);

   return value;
  }

  bindDatePicker();
});
