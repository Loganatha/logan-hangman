window.onload = function() {
  var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

  var categories; // Array of topics
  var chosenCategory; // Selected catagory
  var getHint; // Word getHint
  var word; // Selected word
  var guess; // Guess
  var guesses = []; // Stored guesses
  var tries; // Lives
  var counter; // Count correct guesses
  var space; // Number of spaces in word
  var apostrophe; // Number of apostrophes in word

  /*
  * fetch elements from document object
  */
  var showLives = document.getElementById("mytries");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");

  /*
  * scaffold alphabet list
  */
  var buttons = function() {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }

  /*
  * select and display category
  */
  var selectCat = function() {
    if (chosenCategory === categories[0]) {
      var catName = "ANIMALS";
    } else if (chosenCategory === categories[1]) {
      var catName = "PLACES";
    } else if (chosenCategory === categories[2]) {
      var catName = "MEMES";
    }
    catagoryName.innerHTML = "The category is " + catName;
  }

  /*
  * scaffold guesses list
  */
  result = function() {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space += 1;
      } else if (word[i] === "'") {
        guess.innerHTML = "'";
        apostrophe += 1;
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  /*
  * display tries
  */
  comments = function() {
    showLives.innerHTML = "You have " + tries + " tries remaining";
    if (tries < 1) {
      showLives.innerHTML = "You Fail";
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space + apostrophe === guesses.length) {
        showLives.innerHTML = "Success!";
      }
    }
  }

  /*
  * draw man
  */
  var animate = function() {
    var drawMe = tries;
    drawArray[drawMe]();
  }

  /*
  * hangman components
  */
  canvas = function() {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
  };

  head = function() {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  }

  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  }

  frame1 = function() {
    draw(0, 150, 150, 150);
  };

  frame2 = function() {
    draw(10, 0, 10, 600);
  };

  frame3 = function() {
    draw(0, 5, 70, 5);
  };

  frame4 = function() {
    draw(60, 5, 60, 15);
  };

  torso = function() {
    draw(60, 36, 60, 70);
  };

  rightArm = function() {
    draw(60, 46, 100, 50);
  };

  leftArm = function() {
    draw(60, 46, 20, 50);
  };

  rightLeg = function() {
    draw(60, 70, 100, 100);
  };

  leftLeg = function() {
    draw(60, 70, 20, 100);
  };

  drawArray = [
    rightLeg,
    leftLeg,
    rightArm,
    leftArm,
    torso,
    head,
    frame4,
    frame3,
    frame2,
    frame1
  ];

  /*
  * OnClick event Function
  */
  check = function() {
    list.onclick = function() {
      var guess = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
        }
      }
      var j = (word.indexOf(guess));
      if (j === -1) {
        tries -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }

  /*
  * play function
  */
  play = function() {
    categories = [
      [
        "blobfish",
        "rifle bird",
        "narwhal"
      ],
      [
        "taj mahal",
        "zimbabwe",
        "your mom's"
      ],
      [
        "wizard keller",
        "pants down for harambe",
        "spongebob"
      ]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    buttons();

    guesses = [];
    tries = 10;
    counter = 0;
    space = 0;
    apostrophe = 0;
    result();
    comments();
    selectCat();
    canvas();
  }

  play();

  /*
  * hint feature onClick function
  */
  hint.onclick = function() {
    hints = [
      [
        "lazy sea creature",
        "avian deadly weapon",
        "unifish"
      ],
      [
        "monumental indian memorial",
        "just south of zambia; you know, by botswana",
        "i just left there"
      ],
      [
        "youre a wizard, joshua",
        "drop em in his memory",
        "tries in a something, under something-something"
      ]
    ];

    revWord = word.replace("-", " ");
    console.log(revWord);
    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(revWord);
    console.log("category: " + catagoryIndex + " | word: " + hintIndex);
    showClue.innerHTML = "Clue: " + hints[catagoryIndex][hintIndex];
  };

  /*
  * reset onClick function
  */
  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  }
}
