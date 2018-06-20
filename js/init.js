/**
 * App init params
 */

(function(window) {
    'use strict';

    // let App = window.App || {};
    let TaskList = function(params) {
        this.form = params.form;
        this.taskList = params.taskList;
        this.clearBtn = params.clearBtn;
        this.filter = params.filter;
        this.taskInput = params.taskInput;

        this.setEventListeners();
    };

    TaskList.prototype.setEventListeners = function() {
        // content loaded event
        window.addEventListener('DOMContentLoaded', App.showTasks);

        // add task event
        this.form.addEventListener('submit', App.addTask);

        // remove task event
        this.taskList.addEventListener('click', App.removeTask);

        // clear all tasks event
        this.clearBtn.addEventListener('click', App.clearTasks);

        // filter tasks event
        this.filter.addEventListener('input', App.filterTasks);

        this.taskList.addEventListener('dblclick', App.editTask);
    };

    window.TaskList = TaskList;
    
})(window);
