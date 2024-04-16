function My_set() {
  document.getElementsByTagName("header")[0].classList.add("azure");
  document.getElementsByTagName("header")[0].classList.add("header");
  document.getElementsByTagName("nav")[0].classList.add("azure");
  document.getElementsByTagName("nav")[0].classList.add("nav");
  document.getElementsByTagName("aside")[0].classList.add("azure");
  document.getElementsByTagName("aside")[0].classList.add("aside");
  document.getElementsByTagName("main")[0].classList.add("azure");
  document.getElementsByTagName("main")[0].classList.add("main");
  document.getElementsByTagName("footer")[0].classList.add("azure");
  document.getElementsByTagName("footer")[0].classList.add("footer");
}

var text =
  "Natenczas Wojski chwycił na taśmie przypięty\nSwój róg bawoli, długi, cętkowany, kręty\nJak wąż boa, oburącz do ust go przycisnął,\nWzdął policzki jak banię, w oczach krwią zabłysnął,\nZasunął wpół powieki, wciągnął w głąb pół brzucha\nI do płuc wysłał z niego cały zapas ducha,\nI zagrał: róg jak wicher, wirowatym dechem\nNiesie w puszczę muzykę i podwaja echem.\n\nUmilkli strzelcy, stali szczwacze zadziwieni\nMocą, czystością, dziwną harmoniją pieni.\nStarzec cały kunszt, którym niegdyś w lasach słynął,\nJeszcze raz przed uszami myśliwców rozwinął;\nNapełnił wnet, ożywił knieje i dąbrowy,\nJakby psiarnię w nie wpuścił i rozpoczął łowy.\n\nBo w graniu była łowów historyja krótka:\nZrazu odzew dźwięczący, rześki: to pobudka;\nPotem jęki po jękach skomlą: to psów granie;\nA gdzieniegdzie ton twardszy jak grzmot: to strzelanie.";

var akapit = text.split("\n");
var i = 0;

function My_delete() {
  var all = document.getElementsByTagName("*");
  for (var i = 0, max = all.length; i < max; i++) {
    all[i].classList = [];
  }
}

const Wojski = document.getElementById("wojski");

function My_add() {
  const newP = document.createElement("p");
  const newContent = document.createTextNode(akapit[i]);
  newP.appendChild(newContent);
  Wojski.parentNode.insertBefore(newP, Wojski);
  i++;
  if (i == akapit.length) {
    document.querySelector("#add").disabled = true;
  }
}

document.querySelector("#set").addEventListener("click", (event) => {
  My_set();
});
document.querySelector("#delete").addEventListener("click", (event) => {
  My_delete();
});
document.querySelector("#add").addEventListener("click", (event) => {
  My_add();
});
