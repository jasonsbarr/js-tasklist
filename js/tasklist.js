/**
 * App init params
 */

(function(window) {
    'use strict';

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
        window.addEventListener('DOMContentLoaded', this.showTasks.bind(this));

        // add task event
        this.form.addEventListener('submit', this.addTask.bind(this));

        // remove task event
        this.taskList.addEventListener('click', this.removeTask.bind(this));

        // clear all tasks event
        this.clearBtn.addEventListener('click', this.clearTasks.bind(this));

        // filter tasks event
        this.filter.addEventListener('input', this.filterTasks.bind(this));

        this.taskList.addEventListener('dblclick', this.editTask.bind(this));
    };

    /**
     * Controller methods
     */

    // load and show tasks on page load
    TaskList.prototype.showTasks = function() {
        const tasks = this.Store.loadTasks();
        
        tasks.forEach(function(task) {
            this.UI.appendTask(task);
        }, this);
    };

    // Add task to list element
    TaskList.prototype.addTask = function(e) {
        e.preventDefault();
        if (document.getElementById('edit-task') === null) {
            if (this.taskInput.value === '') {
                alert('You must add a task first');
            } else {
                const task = this.taskInput.value;
                // append task to ul.collection
                this.UI.appendTask(task);
                
                // persist task
                this.Store.persistTask(task);
                
                // clear input
                this.taskInput.value = '';
            }
        }
    
    },
    
    // update task in UI and Store
    TaskList.prototype.editTask = function(e) {
        if (e.target.classList.contains('collection-item')) {
            let target = e.target;
            let oldTask = target.textContent;
            let field = this.UI.showEditField(target);

            field.addEventListener('blur', function(e) {
                target.replaceChild(document.createTextNode(field.value), field.parentElement);
            });

            this.form.addEventListener('submit', function(e) {
                this.Store.updateTask(field.value, oldTask);
                field.blur();

                e.preventDefault();
            }.bind(this));
        }
    };

    // Remove task from list
    TaskList.prototype.removeTask = function(e) {
        if (e.target.parentElement.classList.contains('delete-item')) {
            if (confirm('Are you sure?')) {
                this.Store.deleteTask(e.target.parentElement.parentElement.textContent);
                e.target.parentElement.parentElement.remove();
            }
        }
    
        e.preventDefault();
    };

    // Clear all tasks
    TaskList.prototype.clearTasks = function(e) {
        if (confirm('Are you REALLY sure you want to do that?')) {
            // as long as taskList has a child, remove it
            while (this.taskList.firstChild) {
                this.taskList.removeChild(this.taskList.firstChild);
            }

            this.Store.dropTasks();
        }

        e.preventDefault();
    };

    // filter so only tasks matching search query are visible
    TaskList.prototype.filterTasks = function(e) {
        // get field input
        const filterInput = filter.value;
    
        // search task list for query text
        let items = Array.from(this.taskList.children);
        items.forEach(function(item) {
            // set non-matching items to hidden
            if (item.textContent.toLowerCase().indexOf(filterInput.toLowerCase()) === -1) {
                item.style.display = 'none';
            } else {
                // show matching items
                item.style.display = 'block';
            }
        });
    
        e.preventDefault();
    };
    // initialize App
    let App = new TaskList({
        form: document.getElementById('task-form'),
        taskList: document.querySelector('.collection'),
        clearBtn: document.querySelector('.clear-tasks'),
        filter: document.getElementById('filter'),
        taskInput: document.getElementById('add-task')
    });

    // expose to window
    window.App = App;
    
})(window);
