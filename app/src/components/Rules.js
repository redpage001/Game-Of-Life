import React, { Component } from "react";

class Rules extends Component {
    render() {
        return (
            <div className="rulesDivider">
                <h3>Rules of the Game:</h3>
                <p>The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:</p>
                <ul>
                    <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                    <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                    <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                    <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                </ul>
                <p>Existing in the simulator are a set of preset cell configurations to play around with. You can also create your own patterns and configurations and watch what happens over the progression of each generation.</p>
            </div>
        )
    }
}

export default Rules;