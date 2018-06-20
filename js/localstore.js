/**
 * CRUD tasks via HTML5 localStorage API
 */

(function(window) {
    'use strict';

    let App = window.App;

    let LocalStore = function(type) {
        this.type = type || 'localStorage';
    };
    
    // Persist task in local storage
    LocalStore.prototype.persistTask = function(task) {
        const tasks = this.loadTasks();

        tasks.push(task);

        this.saveTasks(tasks);
    };

    // load tasks from local storage
    LocalStore.prototype.loadTasks = function() {
        if (localStorage.getItem('tasks')) {
            return JSON.parse(localStorage.getItem('tasks'));
        }

        return [];
    },

    LocalStore.prototype.saveTasks = function(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },

    // update edited task in UI and persist
    LocalStore.prototype.updateTask = function(newTask, oldTask) {
        if (typeof document.getElementById('edit-task') !== 'undefined') {
            // get tasks
            const tasks = this.loadTasks();
    
            // find index of task to update
            if (tasks.indexOf(oldTask) > -1) {
    
                // replace with new task
                tasks[tasks.indexOf(oldTask)] = newTask;
            }
    
            // persist to storage
            this.saveTasks(tasks);
        }
    },

    // remove single task from local storage
    LocalStore.prototype.deleteTask = function(task) {
        const tasks = this.loadTasks();

        if (tasks.indexOf(task) > -1) {
            tasks.splice(tasks.indexOf(task), 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        return false;
    },

    // Delete all tasks
    LocalStore.prototype.dropTasks = function() {
        localStorage.removeItem('tasks');
    }

    App.Drivers = window.App.Drivers || {};

    App.Drivers.LocalStorage = LocalStore;
    window.App = App;

})(window);