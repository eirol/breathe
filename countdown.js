(function () {
  function pluralize(element, value, singular, plural) {
    element.innerText = (value == 1) ? singular : plural;
  }

  function easeInOut(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
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

    function breatheAnimation(x, x0, x1, x2, x3) {
      // Sorry, no comments. I'm in a hurry.

      let y = 0;

      if (x < x0) {
        y = 0;
      } else if (x < x1) {
        // Ease in
        y = easeInOut((x - x0)/(x1 - x0));
      } else if (x < x2) {
        // Sustain
        y = 1;
      } else if (x < x3) {
        // Ease out
        y = 1 - easeInOut((x - x2)/(x3 - x2));
      }

      return y;
    }

    let speedFactor = 1;
    let speedUpDistance = 2*3600*1000;
    if (distance < 0) {
      speedFactor = 0;
    } else if (distance < speedUpDistance) {
      speedFactor = 15 - 14*Math.max(distance, 0)/speedUpDistance;
    }

    let breathPeriod = 14.0;
    theta += (now - lastT)/1000 * speedFactor;
    if (theta > breathPeriod) {
      theta -= breathPeriod;
    }
    lastT = now;

    document.getElementById("in").style.opacity = breatheAnimation(theta, 0, 2, 6.5, 7.5);
    document.getElementById("countdown-container").style.opacity = breatheAnimation(theta, 1, 2.5, 6, 7);
    document.getElementById("out").style.opacity = breatheAnimation(theta, 7.4, 9.0, 12.0, 14.0);

    if (distance < 0) {
      document.getElementById("countdown-container").style.opacity = 1;
    }

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

