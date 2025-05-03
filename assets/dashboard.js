console.log("Loaded dashboard.js!");
const vrcBaseURL = "https://api.vrchat.cloud/api/1";

const worldIDs = {
  /* Black Cat for testing */
  //   blackCat: "wrld_606aba82-47d2-4632-8b50-4afa7913ef55",
  superK: "wrld_4cf554b4-430c-4f8f-b53e-1f294eed230b",
  mainStore: "wrld_7258f840-9159-498c-af9c-66465f4d6134",
  express: "wrld_67af6643-b632-4387-ba82-2f5eb42effd8",
};

var superK;

async function fetchData() {
  superK = await fetch(`${vrcBaseURL}/worlds/${worldIDs.superK}`);
  mainS = await fetch(`${vrcBaseURL}/worlds/${worldIDs.mainStore}`);
  KME = await fetch(`${vrcBaseURL}/worlds/${worldIDs.express}`);

  superK = await superK.json();
  mainS = await mainS.json();
  KME = await KME.json();

  document.getElementById("totVisitSuperK").innerText = superK.visits;
  document.getElementById("totVisitMain").innerText = mainS.visits;
  document.getElementById("totVisitExpress").innerText = KME.visits;

  await animateDialFill("superK-players-color", superK.popularity, 2500);
  await animateValue("superK-players-text", 0, superK.popularity, 2500, 1);
}

// fetchData();

function animateValue(id, start, end, duration, pad) {
  var obj = getElement(id);
  if (start == end) {
    obj.innerHTML = end;
    return;
  }
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var timer = setInterval(function () {
    current += increment;
    obj.innerHTML = current.pad(pad);
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}
Number.prototype.pad = function (size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};

function animateDialFill(id, value, duration) {
  var start = 0;
  var end = value;
  var obj = getElement(id);
  if (start == end) {
    obj.style.fill = getIntColor(value);
    return;
  }
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var timer = setInterval(function () {
    current += increment;
    obj.style.fill = getIntColor(current);
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

function getIntColor(value) {
  if (value <= 3) {
    return "rgb(0, 0, 255)";
  } else if (value > 100) {
    return "rgb(201, 42, 42)";
  }

  var calculatedColor = [0, 0, 0];
  if (value < 40) {
    var percent = (value + 20) / 60;
    calculatedColor = interpolateColor([24, 100, 171], [77, 171, 247], percent);
  } else if (value < 60) {
    var percent = (value - 40) / 20;
    calculatedColor = interpolateColor([77, 171, 247], [255, 212, 59], percent);
  } else if (value < 80) {
    var percent = (value - 60) / 20;
    calculatedColor = interpolateColor([255, 212, 59], [247, 103, 7], percent);
  } else {
    var percent = (value - 80) / 20;
    calculatedColor = interpolateColor([247, 103, 7], [201, 42, 42], percent);
  }
  return (
    "rgb(" +
    calculatedColor[0] +
    ", " +
    calculatedColor[1] +
    ", " +
    calculatedColor[2] +
    ")"
  );
}

var interpolateColor = function (color1, color2, factor) {
  if (arguments.length < 3) {
    factor = 0.5;
  }
  var result = color1.slice();
  for (var i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
};

function getElement(id) {
  return document.getElementById(id);
}
