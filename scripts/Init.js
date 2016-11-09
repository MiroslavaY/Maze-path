'use strict';


var controller = new MazeController();

(function () {

    window.addEventListener('load', function () {

        controller.init(maze);

        var buttonGo = getNode('#btnGo');

        buttonGo.addEventListener('click', function () {

            if (!buttonGo.classList.contains('disabled')) {
                buttonGo.classList.add('disabled');
                buttonGo.innerHTML = 'Finding...';
                controller.init(maze);
                controller.run();
            }
        });

        document.querySelectorAll('.loadMaze').forEach(function (item) {

            item.addEventListener('click', function () {

                CommonManager.loadCustomMaze(this.getAttribute('data-file'));

                window.setTimeout(function () {

                    controller.init(maze);
                }, 15);
            })

        });

    });
}());


