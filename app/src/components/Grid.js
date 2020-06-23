class Grid {
    constructor() {
        this.grid = []
    }
    getNeighbors(board, i, j) {
        const len = board.length;
        let count = 0;

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (!x && !y) {
                    continue;
                }
                const xi = x + i;
                const yj = y + j;

                if (xi >= 0 && xi < len && yj >=0 && yj < len) {
                    if (board[xi][yj]) {
                        count += 1;
                    }
                }
            }
        }
        return count;
    }
    step(board) {
        const newBoard = []
        const len = board.length

        for (let i = 0; i < len; i++) {
            newBoard.push([])
            for (let j = 0; j < len; j++) {
                const neighbors = this.getNeighbors(board, i, j);
                if (neighbors === 3 && !board[i][j]) {
                    newBoard[i][j] = 1;
                }else if ((neighbors === 2 || neighbors === 3) && board[i][j]) {
                    newBoard[i][j] = 1;
                }else {
                    newBoard[i][j] = 0;
                }
            }
        }
        this.grid = newBoard;
    }

    newBlankGrid() {
        this.grid = [];
        for (let i = 0; i < 25; i++) {
            this.grid[i] = [];
            for (let j = 0; j < 25; j++) {
                this.grid[i].push(0);
            }
        }
    }
    randomGrid() {
        this.grid = [];
        for (let i = 0; i < 25; i++) {
            this.grid[i] = [];
            for (let j = 0; j < 25; j++) {
                this.grid[i].push(Math.round(Math.random()))
            }
        }
    }
    initRPentomino() {
        this.newBlankGrid();
        this.grid[19][11]=1;
        this.grid[18][11]=1;
        this.grid[18][12]=1;
        this.grid[18][13]=1;
        this.grid[17][12]=1;
    }
    initQueenBee() {
        this.newBlankGrid();
        this.grid[9][10]=1;
        this.grid[9][11]=1;
        this.grid[9][15]=1;
        this.grid[9][16]=1;
        this.grid[10][12]=1;
        this.grid[10][13]=1;
        this.grid[10][14]=1;
        this.grid[11][11]=1;
        this.grid[12][12]=1;
        this.grid[13][13]=1;
        this.grid[12][14]=1;
        this.grid[11][15]=1;
    }

    initGlider() {
        this.newBlankGrid();
        this.grid[1][0]=1;
        this.grid[2][1]=1;
        this.grid[2][2]=1;
        this.grid[1][2]=1;
        this.grid[0][2]=1;
    }
    initSmallExploder() {
        this.newBlankGrid();
        this.grid[11][10]=1;
        this.grid[11][11]=1;
        this.grid[10][11]=1;
        this.grid[12][11]=1;
        this.grid[10][12]=1;
        this.grid[12][12]=1;
        this.grid[11][13]=1;
    }
    initExploder() {
        this.newBlankGrid();
        this.grid[10][9]=1;
        this.grid[10][10]=1;
        this.grid[10][11]=1;
        this.grid[10][12]=1;
        this.grid[10][13]=1;
        this.grid[12][9]=1;
        this.grid[12][13]=1;
        this.grid[14][9]=1;
        this.grid[14][10]=1;
        this.grid[14][11]=1;
        this.grid[14][12]=1;
        this.grid[14][13]=1;
    }
    init10CellRow() {
        this.newBlankGrid();
        for (let i=8; i<18; i++) {
            this.grid[i][12]=1;
        }
    }
    initLightWeightSpaceShip() {
        this.newBlankGrid();
        this.grid[1][15]=1;
        for (let i=2; i<6;i++) {
            this.grid[i][14]=1;
        }
        this.grid[5][15]=1;
        this.grid[5][16]=1;
        this.grid[4][17]=1;
        this.grid[1][17]=1;
    }
}

export default Grid;
