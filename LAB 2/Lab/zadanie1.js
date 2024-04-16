var btn = document.getElementById("klik");

function onNazwaZdarzenia() {
  let first = document.forms["formsik"].elements["pole_tekstowe"].value;
  let second = document.forms["formsik"].elements["pole_liczbowe"].value;
  console.log(first + ":" + typeof first);
  console.log(second + ":" + typeof second);
}

btn.onclick = onNazwaZdarzenia;

function powtorz() {
  for (var i = 0; i < 4; i++) {
    let sign = window.prompt("Napisz mi cos");
    console.log(sign + ":" + typeof sign);
  }
}
