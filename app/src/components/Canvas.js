import React, { Component } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import Grid from "./Grid";

const small = 300;
const medium = 375;
const large = 450;

class Canvas extends Component {
    constructor() {
        super();
        this.state = {
            generation: 0,
            sliderValue: 50,
            size: large
        };
    }

    componentDidMount() {
        this.draw();
        this.grid = new Grid();
        this.grid.newBlankGrid(this.state.size);
        this.start = null;
        this.myReq = null;
        this.isClickable = true;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.size !== this.state.size) {
            this.draw();
            this.grid = new Grid();
            this.grid.newBlankGrid(this.state.size);
            this.start = null;
            this.myReq = null;
            this.isClickable = true;
        }
    }

    draw() {
        //Reference Canvas element and creates context for it //
        const context = this.refs.canvas.getContext("2d");
        context.strokeStyle = "#2b2d2f";
        // Creates grid by drawing lines every 15 pixels //
            // Take the number of cells created and multiply 15 to get the correct size the for the loop //
        for (let i = 0; i <= this.state.size; i += 15) {
            for (let j = 0; j <= this.state.size; j += 15) {
                context.moveTo(i, 0);
                context.lineTo(i, j);
                context.moveTo(0, j);
                context.lineTo(i, j);
            }
        }
        context.stroke();
    }

    getPosition = e => {
        if (this.isClickable) {
            // References canvas element //
            const canvas = this.refs.canvas;
            // References the smallest rectangle containing the canvas //
            const grid = canvas.getBoundingClientRect();
            // Get x and y values in relation to mouse position on grid //
            const x = e.clientX - grid.left;
            const y = e.clientY - grid.top;
            // Change state of cell to allive or dead //
            this.toggleState(x, y);
        }
    }

    toggleState(x, y) {
        // Cells are 15 pixels by 15 pixels. To get true values for x and y we divide by 15 //
        const x_index = Math.floor(x / 15);
        const y_index = Math.floor(y / 15);
        // Toggles the cell. if dead set to alive, if not dead then set to dead //
        this.grid.grid[x_index][y_index] === 0
            ? (this.grid.grid[x_index][y_index] = 1)
            : (this.grid.grid[x_index][y_index] = 0)
        this.fillCells()
    }

    fillCells() {
        // References the Canvas and creates context for it //
        const context = this.refs.canvas.getContext("2d");
        context.fillStyle = "#2b2d2f";
        // Loop t hrough each cell //
        for (let i = 0; i < this.grid.grid.length; i++) {
            for (let j = 0; j < this.grid.grid.length; j++) {
                // If cell is alive, fill in the cell //
                if (this.grid.grid[i][j]) {
                    context.fillRect(i * 15, j * 15, 15, 15);
                // if cell is dead, clear the cell //
                } else {
                    context.clearRect(i * 15, j * 15, 15, 15);
                }
            }
        }
        // Redraws Grid //
        this.draw();
    }

    singleStep() {
        // if the animation is not running, you can step through each iteration of cell progression //
        if (!this.myReq && !this.start) {
            this.grid.step(this.grid.grid);
            this.setState({
                ...this.state,
                generation: this.state.generation + 1
            })
            this.isClickable = false;
            this.fillCells();
        }
    }

    animate = (timestamp) => {
        // Creates loop that requests new frame of animation //
        this.myReq = requestAnimationFrame(this.animate);
        if (!this.start) {
            this.start = timestamp;
        }
        const elapsed = timestamp - this.start;
        if (elapsed > (100 - this.state.sliderValue)) {
            this.grid.step(this.grid.grid);
            this.setState({
                ...this.state,
                generation: this.state.generation + 1
            })
            this.start = timestamp;
            this.isClickable = false;
            this.fillCells();
        }
    }

    stopAnimation() {
        // Cancels request for new frames of animation
        cancelAnimationFrame(this.myReq);
        this.myReq = null;
        this.start = null;
    }

    clear() {
        // Stops animation //
        this.stopAnimation();
        // Sets generation state
        this.setState({
            ...this.state,
            generation: 0
        })
        this.isClickable = true;
        this.grid.newBlankGrid(this.state.size);
        this.fillCells();
        document.querySelector("select").value = "none"
    }

    selectHandler = e => {
        // If aniation is not running, allows for usage of preset boards //
        if (!this.start && !this.myReq) {
            switch (e.target.value) {
                case "random":
                    this.grid.randomGrid(this.state.size);
                    break;
                case "glider":
                    this.grid.initGlider(this.state.size);
                    break;
                case "lightWeightSpaceShip":
                    this.grid.initLightWeightSpaceShip(this.state.size);
                    break;
                case "10CellRow":
                    this.grid.init10CellRow(this.state.size);
                    break;
                case "smallExploder":
                    this.grid.initSmallExploder(this.state.size);
                    break;
                case "exploder":
                    this.grid.initExploder(this.state.size);
                    break;
                case "rPentomino":
                    this.grid.initRPentomino(this.state.size);
                    break;
                case "queenBee":
                    this.grid.initQueenBee(this.state.size);
                    break;
                default:
                    this.grid.newBlankGrid(this.state.size);
            }
            this.setState({
                generation: 0
            })
                this.fillCells();
        }
    }

    sizeSelector = e => {
        if(!this.start && !this.myReq) {
            switch (e.target.value) {
                case "small":
                    this.setState({...this.state, size: small});
                    break;
                case "medium":
                    this.setState({...this.state, size: medium});
                    break;
                default:
                    this.setState({...this.state, size: large});
            }
        }
    }

    render() {
        return (
            <div>
                <canvas
                    ref="canvas"
                    width={this.state.size}
                    height={this.state.size}
                    onClick={e => this.getPosition(e)}
                />
                <p className="generationP">
                    Current generation: {this.state.generation}
                </p>
                
                <RangeSlider 
                    id="slider"
                    min={1}
                    max={100}
                    value={this.state.sliderValue}
                    onChange={changeEvent => {this.setState({...this.state, sliderValue: changeEvent.target.value})}}
                />

                <div>
                    <button onClick={() => this.singleStep()}>
                        Step
                    </button>

                    <button
                        onClick={() => {
                            // Only works when animation isn't running //
                            if (!this.myReq && !this.start) {
                                this.myReq = requestAnimationFrame(this.animate);
                            }
                        }}
                    >
                        Start
                    </button>

                    <button onClick={() => this.stopAnimation()}>
                        Stop
                    </button>

                    <button onClick={() => this.clear()}>
                        Clear
                    </button>
                </div>
                <div className="dropdown">
                    <select onChange={this.selectHandler} defaultValue="none" className="select">
                        <option value="none">None</option>
                        <option value="random">Random</option>
                        <option value="glider">Glider</option>
                        <option value="lightWeightSpaceShip">Lightweight Spaceship</option>
                        <option value="10CellRow">10 Cell Row</option>
                        <option value="smallExploder">Small Exploder</option>
                        <option value="exploder">Exploder</option>
                        <option value="rPentomino">R-pentomino</option>
                        <option value="queenBee">Queen Bee</option>
                    </select>
                    <select onChange={this.sizeSelector} defaultValue="large" className="size">
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default Canvas;
