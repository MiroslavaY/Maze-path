'use strict';

function DFSearch(walker) {

	this.walker = walker,
	this.direction = 0,
	this.end = walker.maze.end,

	this.step = function() {

		var startingDirection = this.direction;

		while (!this.walker.move(this.direction)) {

			this.direction++;
			if (this.direction > 3) {
				this.direction = 0;
			}
			if (this.direction === startingDirection) {

				while (!this.walker.move(this.direction, true)) {
					this.direction++;
					if (this.direction > 3) {
						this.direction = 0;
					}
				}
				break;
			}
		}
		this.walker.draw();
	},

	this.isDone = function() {
		return (walker.x == walker.maze.end.x && walker.y == walker.maze.end.y);
	},

	this.solve = function() {

		for (var x = 0; x < this.walker.maze.width; x++) {
			for (var y = 0; y < this.walker.maze.height; y++) {
				if (this.walker.visited[x][y] === 1) {
					this.walker.context.fillStyle = 'green';
					this.walker.context.fillRect(x * 10, y * 10, 10, 10);
				}
			}
		}
	}
};