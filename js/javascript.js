window.onload = function() {
  /*
  * adds replaceAll functionality to javacript string primitive
  *
  * normal replace stops after the first instance it finds, handing in a RegExp
  * with the search parameter will search over the entire string
  *
  * See javascript regular expressions for more information:
  * https://regex101.com
  */
  String.prototype.replaceAll = function(search, replacement) {
    var target = this; // create a copy of the string that invoked the function
    // run a regex search and replace over the entire string
    return target.replace(new RegExp(search, 'g'), replacement);
  };

  // array of alphabet letters
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
    // get button container by id from the page (index.html@L14)
    myButtons = document.getElementById('buttons');
    // create an html unordered list element to contain the alphabet buttons
    letters = document.createElement('ul');
    // set the html id property of the letters container
    letters.id = 'alphabet';
    // append the newly created letters container inside the myButtons container
    myButtons.appendChild(letters);

    // begin with an index of 0 (first array member), and iterate to the limit
    // of alphabet.length, incrementing the index by one for each pass in the
    // loop
    for (var i = 0; i < alphabet.length; i++) {
      // create an html list item (li) to add to the letters list
      list = document.createElement('li');
      // set the html class property of the new list item
      list.className = 'letter';
      // set the innerHTML (text content) of the list item to the item at
      // the current alphabet array index position
      list.innerHTML = alphabet[i];
      // call the function which attaches the onclick event handler to the
      // list item
      check();
      // append the list item to the letters container
      letters.appendChild(list);
    }
  }

  /*
  * select and display category
  */
  var selectCat = function() {
    // set the category names according to their index position in the
    // categories list
    if (chosenCategory === categories[0]) {
      var catName = "ANIMALS"; // e.g. if index 0, set the catName to ANIMALS
    } else if (chosenCategory === categories[1]) {
      var catName = "PLACES";
    } else if (chosenCategory === categories[2]) {
      var catName = "MEMES";
    }
    // now concatenate a string including the category name set above and push
    // that string to the categoryName element
    catagoryName.innerHTML = "The category is " + catName;
  }

  /*
  * scaffold guesses list
  */
  result = function() {
    // get the hold element from the page
    wordHolder = document.getElementById('hold');
    // create the element for displaying correct guesses
    correct = document.createElement('ul');
    // another method of setting the elements html id parameter
    correct.setAttribute('id', 'my-word');
    // add the guess-holder element to the wordHolder container
    wordHolder.appendChild(correct);

    // loop over the word
    for (var i = 0; i < word.length; i++) {
      // create a list item for the guess blank
      guess = document.createElement('li');
      // set the classname of the guess blank
      guess.setAttribute('class', 'guess');
      // if the current letter is a dash, treat it as a space
      if (word[i] === "-") {
        guess.innerHTML = "-"; // set the text content of the guess blank
        space += 1;
      } else if (word[i] === "'") { // else if apostrophe, treat as such
        guess.innerHTML = "'";
        apostrophe += 1;
      } else { // otherwise, render an underscore (letter blank)
        guess.innerHTML = "_";
      }
      // add the guess blank to the guesses array
      guesses.push(guess);
      // also, append our guess to the guess-holder element
      correct.appendChild(guess);
    }
  }

  /*
  * display tries
  */
  comments = function() {
    // by default, show the number of tries remaining
    showLives.innerHTML = "You have " + tries + " tries remaining";
    // if the tries counter reaches 0, you fail
    if (tries < 1) {
      document.getElementsByTagName('body')[0].className = 'fail';
      showLives.innerHTML = "You Fail";
    }
    // if the number of correctly guessed letters, plus spaces, plus apostrophes
    // equals the length of the word, the answer is correct
    if (counter + space + apostrophe === guesses.length) {
      document.getElementsByTagName('body')[0].className = 'success';
      showLives.innerHTML = "Success!";
    }
  }

  /*
  * draw man
  */
  var animate = function() {
    // cast tries to a new variable for this function
    var drawMe = tries;
    // call the drawArray func at the index position represented by the current
    // number of tries
    drawArray[drawMe]();
  }

  /*
  * hangman components
  */

  // draw the canvas
  canvas = function() {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 4;
  };

  // draw the head
  head = function() {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    // sweep an arc through 360 degrees to make a circle
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  }

  // generic function from drawing a line
  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    // move drawing pointer to x and y position
    context.moveTo($pathFromx, $pathFromy);
    // set ending coordinate position of line
    context.lineTo($pathTox, $pathToy);
    // draw the line!
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

  // we have 10 tries and 10 hangman parts
  // the array is in reverse order because we call it with the number of
  // remaining tries at line 152, above
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
  * OnClick event Function for alphabet list items
  */
  check = function() {
    // when this list item is clicked...
    list.onclick = function() {
      // get the letter from the inner html of the element
      var guess = (this.innerHTML);
      // set the html class to change the styling with css
      this.setAttribute("class", "active");
      // remove this click handler to prevent further interaction
      this.onclick = null;
      // loop to the length of the word
      for (var i = 0; i < word.length; i++) {
        // if this guessed letter exists in the word
        if (word[i] === guess) {
          // set the content of the guess blank on the page to this letter
          guesses[i].innerHTML = guess;
          // increment the correct guesses counter
          counter += 1;
        }
      }
      // get the position of this letter in the word
      var j = (word.indexOf(guess));
      if (j === -1) { // a position of -1 means the letter wasn't found
        // decrement the tries counter
        tries -= 1;
        // call comments to update the comments on the page, showing status
        comments();
        // call animate to draw the hangman part corresponding to the number of
        // tries remaining
        animate();
      } else { // if the letter WAS found in the word
        comments(); // just fire the comments function
      }
    }
  }

  /*
  * play function
  */
  play = function() {
    // categories array, of answer arrays, numbered starting at 0
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

    // pseudo-randomly choose a category index position
    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    // within the chosen category, select an answer
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    // replace all the spaces with dashes for display purposes
    word = word.replaceAll(/\s/g, "-");
    // render the alphabet buttons w/ the function at line 42, above
    buttons();

    // re-initialize the game variables, initially declared starting at line 20
    guesses = [];
    tries = 10;
    counter = 0;
    space = 0;
    apostrophe = 0;

    // call the functions that render the rest of the page components
    result();
    comments();
    selectCat();
    canvas();
  }

  // placing our call the play() at the outer-most level insite the
  // window.onload function will fire play() at line 281 when the page loads
  play();

  /*
  * hint feature onClick function
  */
  hint.onclick = function() {
    // an array of hints corresponding to the answers in the categories at line
    // 203, above
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
        "you're a wizard, joshua",
        "drop 'em in his memory",
        "lives in a something, under something-something"
      ]
    ];
    // reverse the replacement of blank spaces with hyphens
    revWord = word.replaceAll("-", " ");
    // get the arrax index position of the chosen category and answer word
    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(revWord);
    // render the clue corresponding to the answer in play
    showClue.innerHTML = "Clue: " + hints[catagoryIndex][hintIndex];
  };

  /*
  * reset onClick function
  */
  // when the button with the id parameter value of 'reset' throws a click
  document.getElementById('reset').onclick = function() {
    // remove the success and failure classes from the body element
    document.getElementsByTagName('body')[0].classList.remove("success");
    document.getElementsByTagName('body')[0].classList.remove("fail");
    // remove the answer word and letter choices
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    // blow away the clue content
    showClue.innerHTML = "";
    // clear the hangman canvas
    context.clearRect(0, 0, 400, 400);
    // fire it all back up!
    play();
  }
}

$( function() {
  $( "#inst-modal" ).dialog({
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 1000
    },
    hide: {
      effect: "blind",
      duration: 1000
    }
  });
  $( "#instructions" ).on( "click", function() {
    $( "#inst-modal" ).dialog( "open" );
  });

  $( "#about-modal" ).dialog({
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 1000
    },
    hide: {
      effect: "blind",
      duration: 1000
    }
  });

  $( "#about" ).on( "click", function() {
    $( "#about-modal" ).dialog( "open" );
  });
} );
