(function () {
  function pluralize(element, value, singular, plural) {
    element.innerText = (value == 1) ? singular : plural;
  }

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let target = "Jan 9, 2021 19:00:00";
  let countDown = new Date(target).getTime();

  let offset = 0;

  let t0 = new Date().getTime();
  let lastT = t0
  let theta = 0;

  function update() {
    let now = new Date().getTime();
    let distance = countDown - now;

    theta += 2*Math.PI * (now - lastT)/1000 * 1/7;
    if (theta > 2*Math.PI) {
      theta -= 2*Math.PI;
    }
    lastT = now;

    let opacity = 3 * Math.sin(theta);
    document.getElementById("in").style.opacity = opacity;
    document.getElementById("out").style.opacity = -opacity;
    document.getElementById("countdown-container").style.opacity = opacity/3;

    if (distance < 0) distance = 0;

    let daysLeft = Math.floor(distance / (day));
    let hoursLeft = Math.floor((distance % (day)) / (hour));
    let minutesLeft = Math.floor((distance % (hour)) / (minute));
    let secondsLeft = Math.floor((distance % (minute)) / second);

    document.getElementById("days").innerText = daysLeft;
    document.getElementById("hours").innerText = hoursLeft;
    document.getElementById("minutes").innerText = minutesLeft;
    document.getElementById("seconds").innerText = secondsLeft;

    pluralize(document.getElementById("left"), daysLeft, "Falta", "Faltan");
    pluralize(document.getElementById("daylabel"), daysLeft, "Día", "Días");
    pluralize(document.getElementById("hourlabel"), hoursLeft, "Hora", "Horas");
    pluralize(document.getElementById("minutelabel"), minutesLeft, "Minuto", "Minutos");
    pluralize(document.getElementById("secondlabel"), secondsLeft, "Segundo", "Segundos");
  }

  document.addEventListener("DOMContentLoaded", update);
  setInterval(update, 30);

  var music = document.getElementById('audioplayer');
  function playAudio() {
    if (music.paused) {
      music.play();
      pButton.className = "";
      pButton.className = "pause";
    } else {
      music.pause();
      pButton.className = "";
      pButton.className = "play";
    }
  }

  function setVolume(volume){music.volume = volume;}
}());

