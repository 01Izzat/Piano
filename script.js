const keys = document.querySelector("#keys"),
      volPlus = document.querySelector(".fa-plus"),
      volMinus = document.querySelector(".fa-minus"),
      volume = document.querySelector("#volume");

volPlus.addEventListener("click", () => {
  if (volume.textContent != 2) {
    volume.textContent = parseInt(volume.textContent) + 1;
  }
});
volMinus.addEventListener("click", () => {
  if (volume.textContent != 0) {
    volume.textContent = parseInt(volume.textContent) - 1;
  }
});
const notBlack = [4, 7, 11, 14];
var pitch = 1;

for (let i = 0; i < 14; i++) {
  let whitekey = document.createElement("div");
  whitekey.classList.add("whiteKeys", "key");
  whitekey.classList.add(`key${pitch}`);
  if (
    whitekey.classList.value == "whiteKeys key key1" ||
    whitekey.classList.value == "whiteKeys key key13"
  ) {
    whitekey.classList.add("fa");
  }
  if (
    whitekey.classList.value == "whiteKeys key key3" ||
    whitekey.classList.value == "whiteKeys key key15"
  ) {
    whitekey.classList.add("sol");
  }
  if (
    whitekey.classList.value == "whiteKeys key key5" ||
    whitekey.classList.value == "whiteKeys key key17"
  ) {
    whitekey.classList.add("la");
  }
  if (
    whitekey.classList.value == "whiteKeys key key7" ||
    whitekey.classList.value == "whiteKeys key key19"
  ) {
    whitekey.classList.add("si");
  }
  if (
    whitekey.classList.value == "whiteKeys key key8" ||
    whitekey.classList.value == "whiteKeys key key20"
  ) {
    whitekey.classList.add("do");
  }
  if (
    whitekey.classList.value == "whiteKeys key key10" ||
    whitekey.classList.value == "whiteKeys key key22"
  ) {
    whitekey.classList.add("re");
  }
  if (
    whitekey.classList.value == "whiteKeys key key12" ||
    whitekey.classList.value == "whiteKeys key key24"
  ) {
    whitekey.classList.add("mi");
  }
  whitekey.style.left = i * 7 + "%";
  keys.appendChild(whitekey);
  if (!notBlack.includes(i + 1)) {
    pitch += 2;
  } else {
    pitch += 1;
  }
}

pitch = 2;

for (let i = 1; i < 14; i++) {
  if (!notBlack.includes(i)) {
    let blackKey = document.createElement("div");
    blackKey.classList.add("blackKeys", "key");
    blackKey.classList.add(`key${pitch}`);
    blackKey.style.left = i * 7 - 1.75 + "%";
    keys.appendChild(blackKey);
    pitch += 2;
  } else {
    pitch += 1;
  }
}

var key = Array.from(document.querySelectorAll(".key"));

key.forEach((k) => {
  k.addEventListener("click", () => {
    let keySound = new sound(
      `sounds/${k.classList[2]}.mp3`,
      parseInt(volume.textContent)
    );
    keySound.play();
  });
});
var keyPressed = {};
const keyPress = (event) => {
  let keyCode = event.keyCode;
  let keyDown = event.type == "keydown";

  keyPressed[keyCode] = keyDown;

  const eventVal = {
      65: "key1",
      83: "key2",
      68: "key3",
      70: "key4",
      71: "key5",
      72: "key6",
      74: "key7",
      75: "key8",
      76: "key9",
      90: "key10",
      88: "key11",
      67: "key12",
      86: "key13",
      66: "key14",
      81: "key15",
      87: "key16",
      69: "key17",
      82: "key18",
      84: "key19",
      89: "key20",
      85: "key21",
      73: "key22",
      79: "key23",
      80: "key24",
  };
  Object.keys(eventVal).forEach((key) => {
    if (keyPressed[key]) {
      document.querySelector(`.${eventVal[key]}`).style.background = "black";
      setTimeout(() => {
        document.querySelector(`.${eventVal[key]}`).style.background =
          "rgb(71, 71, 71)";
      }, 250);
      let keySound = new sound(
        `sounds/${eventVal[key]}.mp3`,
        parseInt(volume.textContent)
      );
      keySound.play();
    }
  });
};
window.addEventListener("keydown", keyPress);

window.addEventListener("keyup", (event) => {
  keyPressed[event.keyCode] = false;
});

function sound(src, vol) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.volume = vol * 0.5;
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
}