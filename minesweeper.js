// JavaScript source code

let BombCount = 0
let Flagged = 0
let CorrectlyFlagged = 0 
let AllOthers = 0


/* Notes:
 * For the first version, clicking on a tile with reveal the 8 surrounding tiles.
 * As I found out via Twitter, the original only revealed the tile clicked, 
 * Unless it was blank, then all connected blank tiles would be revealed. 
 * Bombs were never revealed, as clicking on them ended the game.
 * One could, 'by luck of the draw' recieve a map that required pure guesses, 
 * and luck to win.  A section may have 4 equally possible bomb locations,
 * but without clicking on one of the four, there was no way to know.
 */


let Matrix = [
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], []],
]



/*  GAME mechanisms  */

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function get_cell(event) {
    let coordinate = event.target
    let coords = coordinate.getAttribute('value')
    let xy = coords.split(':')
    let x = parseInt(xy[0])
    let y = parseInt(xy[1])
    let cell = Matrix[x][y]
    let data = cell[0].touched
    let item = cell[0]
    if (!item.selected) {
        if (data == 999) {
            event.target.style.backgroundImage = "url(" + "bomb.png" + ")";
            game_over();
        }
        else if (data > 0) {
            event.target.innerHTML = data;
            event.target.style.background = '#b2b2a7';
            get_other_cells(x, y)
        }
        else {
            /*
              element.style.background = "#d8f3f2";
              element.style.border = "2px solid #0c91df";
             */
            event.target.style.background = "#d8f3f2";
            event.target.style.border = "2px solid #0c91df";
            get_other_cells(x, y)
        }
        item.selected = true;
        update_nav()
        if (BombCount >= 10) {
            win()
        }
    }
    else {
        //console.log(item)
    }
    
}

function get_other_cells(x, y) {
    min = 0
    max = 9
    coordx1 = x - 1
    coordy1 = y - 1
    if (coordx1 >= min && coordy1 >= min) {
        //console.log('x1:y1')
        check_other(coordx1, coordy1)
    }
    coordx2 = x - 1
    coordy2 = y
    if (coordx2 >= min) {
        //console.log('x2: y2')
        check_other(coordx2, coordy2)
    }
    coordx3 = x - 1
    coordy3 = y + 1
    if (coordx3 >= min && coordy3 <= max) {
        //console.log('x3:y3')
        check_other(coordx3, coordy3)
    }
    //------------
    coordx4 = x
    coordy4 = y - 1
    if (coordy4 >= min) {
        //console.log('x4:y4')
        check_other(coordx4, coordy4)
    }
    coordx5 = x
    coordy5 = y + 1
    if (coordy5 <= max) {
        check_other(coordx5, coordy5)
    }
    //------------
    coordx6 = x + 1
    coordy6 = y - 1
    if (coordx6 <= max && coordy6 >= min) {
        //console.log('x6:y6')
        check_other(coordx6, coordy6)
    }
    coordx7 = x + 1
    coordy7 = y
    if (coordx7 <= max) {
        check_other(coordx7, coordy7)
    }
    coordx8 = x + 1
    coordy8 = y + 1
    if (coordx8 <= max && coordy8 <= max) {
        check_other(coordx8, coordy8)
    }


}

function check_other(x, y) {
    let container = Matrix[x][y]
    let cell = container[0]
    cellid = x.toString() + ":" + y.toString()
    var element = document.getElementById(cellid)
    if (!cell.selected) {
        if (cell.touched == 0) {

            element.style.background = "#d8f3f2";
            element.style.border = "2px solid #0c91df";

        }
        if (cell.type == 'bomb') {
            BombCount += 1
            element.style.backgroundImage = 'none'
            element.style.backgroundColor = 'red'
            element.innerHTML = '[X]'
            if (cell.flagged) {
                CorrectlyFlagged -= 1
                Flagged -= 1
            }
        }
        if (cell.touched > 0 && cell.touched < 99) {
            //console.log(cellid)
            element.innerHTML = cell.touched;
            element.style.background = "silver";
        }
        else {
            //console.log(`cell is not being changed: ${x}:${y}`)
        }
        cell.selected = true
    }
    
}

/*  CELL set-up */


// Reference: Right click
// Link: https://stackoverflow.com/questions/4235426/how-can-i-capture-the-right-click-event-in-javascript
function right_click(el) {
    el.addEventListener('contextmenu', function (ev) {
        let coords = el.id.split(':')
        let x = coords[0]
        let y = coords[1]
        let container = Matrix[x][y]
        let cell = container[0]
        if (cell.flagged == false && cell.selected == false) {
            el.style.backgroundImage = 'url(' + 'flag.png' + ')';
            cell.flagged = true;
            Flagged += 1
            if (cell.type == 'bomb') {
                CorrectlyFlagged += 1
            }
        }
        else if (cell.selected == false && cell.flagged == true) {
            el.style.backgroundImage = 'none';
            cell.flagged = false
            Flagged -= 1
            if (cell.type == 'bomb') {
                CorrectlyFlagged -= 1
            }

        }

        ev.preventDefault();
        update_nav()
        return false;
    }, false);
}


function cell_listeners() {
    let allCells = document.querySelectorAll(".cell")
    allCells.forEach(function (item) {
        item.addEventListener('click', get_cell);
        right_click(item)
    });
}

function set_cell(x, y) {
    //console.log(x, y)
    var cell = Matrix[x][y]
    if (cell.length <= 0) {
        var newcell = {
            flagged: false,
            touched: 1,
            type: 'indicator',
            selected: false,
        }
        cell.push(newcell)
    }
    else {
        let box = cell[0]
        if (box.type != 'bomb') {
            box.touched += 1
        }
    }
}

/*   MATRIX set-up   */

function place_bombs() {
    let x = 0
    let y = 0
    for (i = 0; i < 10; i++) {
        let ran = getRandomInt(10)
        let newcell = {
            flagged: false,
            type: 'bomb',
            touched: 999,
            selected: false
        }
        Matrix[i][ran].push(newcell);
    };
}


function place_map() {
    /*  [1][2][3],
        [4][x][5],
        [6][7][8]  */
    place_bombs()
    max = 9
    min = 0
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
            let current = Matrix[i][j]
            if (current.length == 0) {
                //not a bomb
            }
            else if (current[0].type == 'bomb') {

                coordx1 = i - 1
                coordy1 = j - 1
                if (coordx1 >= min && coordy1 >= min) {
                    //console.log('x1:y1')
                    set_cell(coordx1, coordy1)
                }
                coordx2 = i - 1
                coordy2 = j
                if (coordx2 >= min) {
                    //console.log('x2: y2')
                    set_cell(coordx2, coordy2)
                }
                coordx3 = i - 1
                coordy3 = j + 1
                if (coordx3 >= min && coordy3 <= max) {
                    //console.log('x3:y3')
                    set_cell(coordx3, coordy3)
                }
                //------------
                coordx4 = i
                coordy4 = j - 1
                if (coordy4 >= min) {
                    //console.log('x4:y4')
                    set_cell(coordx4, coordy4)
                }
                coordx5 = i
                coordy5 = j + 1
                if (coordy5 <= max) {
                    set_cell(coordx5, coordy5)
                }
                //------------
                coordx6 = i + 1
                coordy6 = j - 1
                if (coordx6 <= max && coordy6 >= min) {
                    //console.log('x6:y6')
                    set_cell(coordx6, coordy6)
                }
                coordx7 = i + 1
                coordy7 = j
                if (coordx7 <= max) {
                    set_cell(coordx7, coordy7)
                }
                coordx8 = i + 1
                coordy8 = j + 1
                if (coordx8 <= max && coordy8 <= max) {
                    set_cell(coordx8, coordy8)
                }
            }
        };
    };
}

function place_blank() {
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
            let current = Matrix[i][j]
            if (current.length <= 0) {
                var newcell = {
                    flagged: false,
                    touched: 0,
                    type: 'blank',
                    selected: false,
                }
                current.push(newcell)
            }
        };
    };
}
/*  GLOBAL GAME Functions  */

function update_nav() {
    let bombcount = document.querySelector('#bombcount')
    let flagcount = document.querySelector('#flagcount')
    bombcount.innerHTML = BombCount
    flagcount.innerHTML = Flagged
    if (CorrectlyFlagged + BombCount == 10) {
        win()
    }
}


function game_over() {
    let element = document.querySelector('#lose')
    element.style.display = 'flex'
}

function win() {
    let element = document.querySelector('#win')
    element.style.display = 'flex'

}

function reload() {
    location.reload();
}

function start() {
    //TODO: map size
    //*map size: would need to dynamically create Matrix 
    //*and populate HTML with rows/cells in the field
    //*cells can still use the same convention with value and ID 
    //*and be able to retrieve location in the matrix of cell data.
    //TODO: start timer 
    //set level 
    //disable select option 
    //assign listener action of cells based on level
}

function setGAME() {
    place_map()
    place_blank()
    cell_listeners()
    //console.log(Matrix)
}

window.onload = function () {
    setGAME()
}