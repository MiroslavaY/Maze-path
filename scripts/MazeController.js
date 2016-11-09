'use strict';


function getNode(attr) {

	return document.querySelector(attr);
}

function MazeController() {

	this.canvas = null,
	this.context = null,
	this.maze = null,
	this.walker = null,
	this.algorithm = null,
	this.speed = null,

	this.init = function(maze) {

		this.canvas = getNode('#imageView');
		this.context = this.canvas.getContext('2d');
		this.canvas.width  = maze.width * 10;
		this.canvas.height = maze.height * 10;
		this.speed = maze.speed === null ? 50 : maze.speed;

		this.maze = new MazeDrawer(this.context, maze);
		this.maze.draw();

		this.walker = new WalkerManager(this.context, this.maze);
		this.walker.init();
		this.algorithm = new DFSearch(this.walker);
	},

	this.run = function() {

		if (!this.algorithm.isDone()) {
			this.algorithm.step();

			window.setTimeout(function() {
				controller.run();
			}, this.speed);
		}
		else {
			getNode('#btnGo').classList.remove('disabled');
			getNode('#btnGo').innerHTML = 'Find path!';
			this.walker.maze.draw(true);
			this.algorithm.solve();
		}
	}
};