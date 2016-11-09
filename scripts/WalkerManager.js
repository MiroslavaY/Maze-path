'use strict';

function WalkerManager(context, maze) {

	this.context = context,
	this.maze = maze,
	this.x = maze.start.x,
	this.y = maze.start.y,
	this.lastX = -1,
	this.lastY = -1,
	this.visited = createArray(this.maze.width, this.maze.height),

	this.init = function() {

		for (var x = 0; x < this.maze.width; x++) {
			for (var y = 0; y < this.maze.height; y++) {
				this.visited[x][y] = 0;
			}
		}

		this.visited[this.x][this.y] = 1;
		this.draw();
	},
	
	this.draw = function() {
		this.context.fillStyle = 'green';
		this.context.fillRect(this.x * 10, this.y * 10, 10, 10);
	},
	
	this.move = function(direction, backtrack) {

		var changed = false;
		var oldX = this.x;
		var oldY = this.y;
		
		if (backtrack || !this.hasVisited(direction)) {

			var point = this.getXYForDirection(direction);

			if (this.canMove(point.x, point.y)) {
				this.x = point.x;
				this.y = point.y;
				changed = true;
			}
		}
		
		if (changed) {
			if(backtrack){
				this.context.fillStyle = 'gray';
				this.context.fillRect(oldX * 10, oldY * 10, 10, 10);
				this.visited[this.lastX][this.lastY] = 2;
			}
			else{
				this.context.fillStyle = 'lightgray';
				this.context.fillRect(oldX * 10, oldY * 10, 10, 10);
			}

			this.lastX = oldX;
			this.lastY = oldY;

			this.visited[this.x][this.y]++;
			if (this.visited[oldX][oldY] === 2 && this.visited[this.x][this.y] === 1) {
				this.visited[oldX][oldY] = 1;
				this.context.fillStyle = 'gray';
				this.context.fillRect(oldX * 10, oldY * 10, 10, 10);
			}
		}
		return changed;
	},
	
	this.canMove = function(x, y) {
		return (maze.isOpen(x, y) && this.visited[x][y] < 2);
	},
	
	this.hasVisited = function(direction) {
		var point = this.getXYForDirection(direction);
		return (this.visited[point.x][point.y] > 0);
	},
	
	this.getXYForDirection = function(direction) {

		var point = {};
		switch (direction) {
			case 0: point.x = this.x; point.y = this.y - 1; break;
			case 1: point.x = this.x + 1; point.y = this.y; break;
			case 2: point.x = this.x; point.y = this.y + 1; break;
			case 3: point.x = this.x - 1; point.y = this.y; break;
		};
		return point;
	}
};

function createArray(length) {

    var arr = new Array(length || 0),
       i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
    return arr;
} ;
