// JavaScript source code


let ROWS = 10
let COLUMNS = 10



function setSize(row, column) {
    try {
        window.localStorage.setItem('ROW', row)
        window.localStorage.setItem('COLUMN', column)
    }
    catch {
        message = "Error occured in file: matrix.js, try block of function: setSize(row, column)."
        console.log(message)
    }

}

/*  visual of a 10 by 10 matrix 
 *  [
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
 */
  
   


function populate(rows = ROWS, columns = COLUMNS) {
    let localROW = window.localStorage.getItem('ROW')
    let localCOLUMN = window.localStorage.getItem('COLUMN')
   
    if (localROW) {
        rows = localROW
    }
    if (localCOLUMN) {
        columns = localCOLUMN
    }

   //console.log(rows, columns)
    matrix = []
    for (i = 0; i < rows; i++) {
        let row = []
        for (j = 0; j < columns; j++) {
            column = []
            row.push(column)
        }
        matrix.push(row)
    }
    return matrix

}

function createHTMLmatrix(rows = ROWS, columns = COLUMNS) {
    let localROW = window.localStorage.getItem('ROW')
    let localCOLUMN = window.localStorage.getItem('COLUMN')
    let FIELD = document.querySelector('#FIELD')

    if (localROW) {
        rows = localROW
    }
    if (localCOLUMN) {
        columns = localCOLUMN
    }
   

    for (i = 0; i < rows; i++) {
        let row = document.createElement('div')
        row.classList.add('row')
        

        for (j = 0; j < columns; j++) {
            let cell = document.createElement('div')
            cell.classList.add('cell')
            // this id will help us locate the cell or data in the matrix
            let cell_id = i + ":" + j
            cell.id = cell_id
            cell.setAttribute('value', cell_id)
            row.appendChild(cell)  

        }
        FIELD.appendChild(row)
    }
}


