/**
 * CRUD tasks via HTML5 localStorage API
 */

(function(window) {
    'use strict';

    let App = window.App || {};

    let LocalStore = {
        // Persist task in local storage
        persistTask: function(task) {
            const tasks = this.loadTasks();

            tasks.push(task);

            this.saveTasks(tasks);
        },

        // load tasks from local storage
        loadTasks: function() {
            if (localStorage.getItem('tasks')) {
                return JSON.parse(localStorage.getItem('tasks'));
            }

            return [];
        },

        saveTasks: function(tasks) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        },

        // remove single task from local storage
        deleteTask: function(task) {
            const tasks = this.loadTasks();

            if (tasks.indexOf(task) > -1) {
                tasks.splice(tasks.indexOf(task), 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }

            return false;
        },

        // Delete all tasks
        dropTasks: function() {
            localStorage.removeItem('tasks');
        }
    };

    App.LocalStore = LocalStore;
    window.App = App;
})(window);