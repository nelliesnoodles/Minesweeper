// JavaScript source code

let BombCount = 0;
let Flagged = 0;
let CorrectlyFlagged = 0;
const AllOthers = 0;
let LEVEL = 'easy';
let cleared = 0;
const MIN = 0;
let MAX = 10;
let BOMBS = 0;


/* Notes:
 * For the first version, clicking on a tile with reveal the 8 surrounding tiles.
 * As I found out via Twitter, the original only revealed the tile clicked,
 * Unless it was blank, then all connected blank tiles would be revealed.
 * Bombs were never revealed, as clicking on them ended the game.
 * One could, 'by luck of the draw' recieve a map that required pure guesses,
 * and luck to win.  A section may have 4 equally possible bomb locations,
 * but without clicking on one of the four, there was no way to know.
 */


let Matrix;


/*  GAME mechanisms  */

function getRandomInt(maximum) {
  return Math.floor(Math.random() * Math.floor(maximum));
}

function get_cell2(event) {
  clearNoise.currentTime = 0;
  clicky.currentTime = 0;
  boom.currentTime = 0;
  const coordinate = event.target;
  const coords = coordinate.getAttribute('value');
  const xy = coords.split(':');
  const x = parseInt(xy[0]);
  const y = parseInt(xy[1]);
  const cell = Matrix[x][y];
  const data = cell[0].touched;
  const item = cell[0];
  if (!item.selected) {
    if (data == 999) {
      event.target.style.backgroundImage = 'url(' + 'bomb.png' + ')';
      game_over();
    } else if (data > 0) {
      clicky.play();
      event.target.innerHTML = data;
      event.target.style.background = '#b2b2a7';
      cleared += 1;
    } else {
      clicky.play();
      /*
              element.style.background = "#d8f3f2";
              element.style.border = "2px solid #0c91df";
             */
      event.target.style.background = '#d8f3f2';
      event.target.style.border = '2px solid #0c91df';
      get_other_cells2(x, y);
      cleared += 1;
    }
    item.selected = true;
      update_nav();
      total = MAX * MAX - BOMBS
      if (cleared >= (MAX * MAX) - BOMBS) {
          //console.log("cleared=", cleared)
          //console.log("total=", total)
      win();
    }
  } else {
    message = 'Error in get_cell2() of minesweeper.js';
    console.log(message);
  }
}
function get_cell(event) {
  MAX = window.localStorage.getItem('ROW');
  if (!MAX) {
    MAX = 10;
  }

  clicky.currentTime = 0;
  boom.currentTime = 0;
  const coordinate = event.target;
  const coords = coordinate.getAttribute('value');
  const xy = coords.split(':');
  const x = parseInt(xy[0]);
  const y = parseInt(xy[1]);
  const cell = Matrix[x][y];
  const data = cell[0].touched;
  const item = cell[0];


  if (!item.selected) {
    if (data == 999) {
      event.target.style.backgroundImage = 'url(' + 'bomb.png' + ')';
      game_over();
    } else if (data > 0) {
      event.target.innerHTML = data;
      event.target.style.background = '#b2b2a7';
      cleared += 1;
      clicky.play();
      get_other_cells(x, y);
    } else {
      /*
              element.style.background = "#d8f3f2";
              element.style.border = "2px solid #0c91df";
             */
      event.target.style.background = '#d8f3f2';
      event.target.style.border = '2px solid #0c91df';
      cleared += 1;
      get_other_cells(x, y);
    }
    item.selected = true;
    update_nav();

    if (cleared >= (MAX * MAX) - BOMBS) {
      win();
    }
  } else {
    // console.log('item=', item)
    message = 'Error in get_cell() minesweeper.js';
    console.log(message);
  }
}


function get_other_cells2(x, y) {
  min = 0;
  indexmax = MAX - 1;

  coordx1 = x - 1;
  coordy1 = y - 1;
  clearNoise.currentTime = 0;
  clearNoise.play();
  if (coordx1 >= min && coordy1 >= min) {
    check_other2(coordx1, coordy1);
  }
  coordx2 = x - 1;
  coordy2 = y;
  if (coordx2 >= min) {
    check_other2(coordx2, coordy2);
  }
  coordx3 = x - 1;
  coordy3 = y + 1;
  if (coordx3 >= min && coordy3 <= indexmax) {
    check_other2(coordx3, coordy3);
  }
  // ------------
  coordx4 = x;
  coordy4 = y - 1;
  if (coordy4 >= min) {
    check_other2(coordx4, coordy4);
  }
  coordx5 = x;
  coordy5 = y + 1;
  if (coordy5 <= indexmax) {
    check_other2(coordx5, coordy5);
  }
  // ------------
  coordx6 = x + 1;
  coordy6 = y - 1;
  if (coordx6 <= indexmax && coordy6 >= min) {
    check_other2(coordx6, coordy6);
  }
  coordx7 = x + 1;
  coordy7 = y;
  if (coordx7 <= indexmax) {
    check_other2(coordx7, coordy7);
  }
  coordx8 = x + 1;
  coordy8 = y + 1;
  if (coordx8 <= indexmax && coordy8 <= indexmax) {
    check_other2(coordx8, coordy8);
  }
}

function get_other_cells(x, y) {
  min = 0;

  indexmax = MAX - 1;
  coordx1 = x - 1;
  coordy1 = y - 1;
  if (coordx1 >= min && coordy1 >= min) {
    check_other(coordx1, coordy1);
  }
  coordx2 = x - 1;
  coordy2 = y;
  if (coordx2 >= min) {
    check_other(coordx2, coordy2);
  }
  coordx3 = x - 1;
  coordy3 = y + 1;
  if (coordx3 >= min && coordy3 <= indexmax) {
    check_other(coordx3, coordy3);
  }
  // ------------
  coordx4 = x;
  coordy4 = y - 1;
  if (coordy4 >= min) {
    check_other(coordx4, coordy4);
  }
  coordx5 = x;
  coordy5 = y + 1;
  if (coordy5 <= indexmax) {
    check_other(coordx5, coordy5);
  }
  // ------------
  coordx6 = x + 1;
  coordy6 = y - 1;
  if (coordx6 <= indexmax && coordy6 >= min) {
    check_other(coordx6, coordy6);
  }
  coordx7 = x + 1;
  coordy7 = y;
  if (coordx7 <= indexmax) {
    check_other(coordx7, coordy7);
  }
  coordx8 = x + 1;
  coordy8 = y + 1;
  if (coordx8 <= indexmax && coordy8 <= indexmax) {
    check_other(coordx8, coordy8);
  }
}


function check_other2(x, y) {
  const container = Matrix[x][y];
  const cell = container[0];
  cellid = x.toString() + ':' + y.toString();
  const element = document.getElementById(cellid);
  if (!cell.selected) {
    if (cell.touched == 0) {
      element.style.background = '#d8f3f2';
      element.style.border = '2px solid #0c91df';
      cell.selected = true;
      cleared += 1;
      get_other_cells2(x, y);
    }

    if (cell.touched > 0 && cell.touched < 99) {
      element.innerHTML = cell.touched;
      element.style.background = 'silver';
      cleared += 1;
      cell.selected = true;
    }
  }
}


function check_other(x, y) {
  clicky.currentTime = 0;
  clicky.play();
  const container = Matrix[x][y];
  const cell = container[0];
  cellid = x.toString() + ':' + y.toString();
  const element = document.getElementById(cellid);

  if (!cell.selected) {
    if (cell.touched == 0) {
      element.style.background = '#d8f3f2';
      element.style.border = '2px solid #0c91df';
      cleared += 1;
    }

    else if (cell.type == 'bomb') {
      BombCount += 1;
      element.style.backgroundImage = 'url(' + 'warn.png' + ')';
      if (cell.flagged) {
        CorrectlyFlagged -= 1;
        Flagged -= 1;
      }
    }

    else if (cell.touched > 0 && cell.touched < 99) {
      // console.log(cellid)
      element.innerHTML = cell.touched;
      element.style.background = 'silver';
      cleared += 1;
    }

    cell.selected = true;
  } else {
    // console.log("Cell is marked as selected")
    // console.log(cell)

  }
}
/*  CELL set-up */


// Reference: Right click
// Link: https://stackoverflow.com/questions/4235426/how-can-i-capture-the-right-click-event-in-javascript
function right_click(el) {
  el.addEventListener('contextmenu', function(ev) {
    plunk.currentTime=0;
    const coords = el.id.split(':');
    const x = coords[0];
    const y = coords[1];
    const container = Matrix[x][y];
    const cell = container[0];
    if (cell.flagged == false && cell.selected == false) {
      plunk.play();
      el.style.backgroundImage = 'url(' + 'flag.png' + ')';
      cell.flagged = true;
      Flagged += 1;
      if (cell.type == 'bomb') {
        CorrectlyFlagged += 1;
      }
    } else if (cell.selected == false && cell.flagged == true) {
      el.style.backgroundImage = 'none';
      cell.flagged = false;
      Flagged -= 1;
      if (cell.type == 'bomb') {
        CorrectlyFlagged -= 1;
      }
    }

    ev.preventDefault();
    update_nav();
    return false;
  }, false);
}


function cell_listeners() {
  const allCells = document.querySelectorAll('.cell');
  if (LEVEL == 'easy') {
    allCells.forEach(function(item) {
      item.addEventListener('click', get_cell);
      right_click(item);
    });
  } else {
    allCells.forEach(function(item) {
      item.addEventListener('click', get_cell2);
      right_click(item);
    });
  }
}

function set_cell(x, y) {
  const cell = Matrix[x][y];
  if (cell.length <= 0) {
    const newcell = {
      flagged: false,
      touched: 1,
      type: 'indicator',
      selected: false,
    };
    cell.push(newcell);
  } else {
    const box = cell[0];
    if (box.type != 'bomb') {
      box.touched += 1;
    }
  }
}

/*   MATRIX set-up   */

function place_bombs() {
  const x = 0;
  const y = 0;
  checkMAX();
  const size = MAX - 1;
  let double = false;
  if (size >= 19) {
    double = true;
  }


  for (i = 0; i <= size; i++) {
    const ran = getRandomInt(size);
    const newcell = {
      flagged: false,
      type: 'bomb',
      touched: 999,
      selected: false,
    };
    Matrix[i][ran].push(newcell);
    BOMBS += 1;

    if (double) {
      const ran2 = Math.abs(size - ran);
      cell = Matrix[i][ran2];
      // if the newcell is pushed into a container, all changes
      // including the 'selected are mapped to the newcell, even in different
      // matrix coordinates.
      const secondcell = {
        flagged: false,
        type: 'bomb',
        touched: 999,
        selected: false,
      };
      if (cell.length <= 0) {
        BOMBS += 1;
        cell.push(secondcell);
      }
    }
  };
}

function checkMAX() {
  const max = window.localStorage.getItem('ROW');
  if (max) {
    MAX = max;
  } else {
    MAX = 10;
  }
}


function place_map() {
  /*  [1][2][3],
        [4][x][5],
        [6][7][8]  */
  place_bombs();
  checkMAX();
  indexmax = MAX - 1;
  min = 0;

  for (i = 0; i < MAX; i++) {
    for (j = 0; j < MAX; j++) {
      const current = Matrix[i][j];
      if (current.length == 0) {
        // not a bomb
      } else if (current[0].type == 'bomb') {
        coordx1 = i - 1;
        coordy1 = j - 1;
        if (coordx1 >= min && coordy1 >= min) {
          set_cell(coordx1, coordy1);
        }
        coordx2 = i - 1;
        coordy2 = j;
        if (coordx2 >= min) {
          set_cell(coordx2, coordy2);
        }
        coordx3 = i - 1;
        coordy3 = j + 1;
        if (coordx3 >= min && coordy3 <= indexmax) {
          set_cell(coordx3, coordy3);
        }
        // ------------
        coordx4 = i;
        coordy4 = j - 1;
        if (coordy4 >= min) {
          set_cell(coordx4, coordy4);
        }
        coordx5 = i;
        coordy5 = j + 1;
        if (coordy5 <= indexmax) {
          set_cell(coordx5, coordy5);
        }
        // ------------
        coordx6 = i + 1;
        coordy6 = j - 1;
        if (coordx6 <= indexmax && coordy6 >= min) {
          set_cell(coordx6, coordy6);
        }
        coordx7 = i + 1;
        coordy7 = j;
        if (coordx7 <= indexmax) {
          set_cell(coordx7, coordy7);
        }
        coordx8 = i + 1;
        coordy8 = j + 1;
        if (coordx8 <= indexmax && coordy8 <= indexmax) {
          set_cell(coordx8, coordy8);
        }
      }
    };
  };
}

function place_blank() {
  checkMAX();

  for (i = 0; i < MAX; i++) {
    for (j = 0; j < MAX; j++) {
      const current = Matrix[i][j];
      if (current.length <= 0) {
        const newcell = {
          flagged: false,
          touched: 0,
          type: 'blank',
          selected: false,
        };
        current.push(newcell);
      }
    };
  };
}
/*  GLOBAL GAME Functions  */

function update_nav() {
  const bombcount = document.querySelector('#bombcount');
  const flagcount = document.querySelector('#flagcount');
  bombcount.innerHTML = BombCount;
  flagcount.innerHTML = Flagged;

  if (CorrectlyFlagged + BombCount == MAX) {
    if (cleared >= (MAX * MAX) - MAX) {
      win();
    }
  }
}

function listen_level() {
  level = document.getElementById('LEVEL');
  level.addEventListener('change', function() {
    LEVEL = level.value;
    window.sessionStorage.setItem('level', LEVEL);
  });
}

function listen_size() {
  size = document.getElementById('SIZE');

  size.addEventListener('change', function() {
    SIZE = size.value;
    window.localStorage.setItem('ROW', SIZE);
    window.localStorage.setItem('COLUMN', SIZE);
    MAX = SIZE;
  });
}


function game_over() {
  boom.play();
  const element = document.querySelector('#lose');
  element.style.display = 'flex';
}

function win() {
  winner.play();
  const element = document.querySelector('#win');
  element.style.display = 'flex';
}

function reload() {
  location.reload();
}

function check_storage() {
  const level = window.sessionStorage.getItem('level');
  const max = window.localStorage.getItem('ROW');
  if (level != null && level != undefined) {
    LEVEL = level;
    element = document.querySelector('#current_level');
    element.innerHTML = level;
  }
  if (max != null && max != undefined) {
    MAX = max;
  } else {
    console.log('MAX not found!');
  }
}

function setGAME() {
  listen_size();
  Matrix = populate();
  createHTMLmatrix();
  place_map();
  place_blank();
  listen_level();
  check_storage();
  cell_listeners();
}


function check_sound() {
  MUTEBUTTON = document.getElementById('mute');
  const sound = window.localStorage.getItem('sound');

  if (sound) {
    if (sound == 'OFF') {
      clearNoise.volume = (0);
      clicky.volume = (0);
      plunk.volume = (0);
      boom.volume = (0);
      winner.volume = (0);
      MUTEBUTTON.setAttribute('value', 'OFF');
      MUTEBUTTON.innerHTML = '<i class="fas fa-volume-mute fa-3x"></i>SOUND OFF';
    } else {
      clearNoise.volume = (1);
      clicky.volume = (0.8);
      plunk.volume = (0.5);
      boom.volume = (0.5);
      winner.volume = (0.5);
      MUTEBUTTON.setAttribute('value', 'ON');
      MUTEBUTTON.innerHTML = '<i class="fas fa-volume-up fa-3x"></i>SOUND ON';
    }
  }
}

window.onload = function() {
  get_set_BURG();
  setGAME();
  check_sound();
};
