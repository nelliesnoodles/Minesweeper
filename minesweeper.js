// JavaScript source code

let BombCount = 0


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


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

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
            event.target.style.backgroundColor = '#b2b2a7';
            get_other_cells(x, y)
        }
        else {
            event.target.style.backgroundColor = "#d8f3f2";
            event.target.style.border = "1px solid blue";
            get_other_cells(x, y)
        }
        item.selected = true;
        if (BombCount >= 10) {
            win()
        }
    }
    else {
        //console.log(item)
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

            element.style.backgroundColor = "#d8f3f2";
            element.style.border = "1px solid blue";

        }
        if (cell.type == 'bomb') {
            BombCount += 1
            element.style.backgroundColor = 'red'
            element.innerHTML = '[X]'
        }
        if (cell.touched > 0 && cell.touched < 99) {
            //console.log(cellid)
            element.innerHTML = cell.touched
        }
        else {
            //console.log(`cell is not being changed: ${x}:${y}`)
        }
        cell.selected = true
    }
    
}

function cell_listeners() {
    let allCells = document.querySelectorAll(".cell")
    allCells.forEach(function (item) {
        item.addEventListener('click', get_cell);
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

function place_map() {
    /*[1][2][3],
        [4][x][5],
        [6][7][8]*/
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
function setGAME() {
    place_map()
    place_blank()
    cell_listeners()
    //console.log(Matrix)
}

window.onload = function () {
    setGAME()
}