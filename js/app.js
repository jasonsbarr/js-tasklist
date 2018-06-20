/**
 * Core app code
 */

(function(window) {
    'use strict';

    let App = new TaskList({
        form: document.getElementById('task-form'),
        taskList: document.querySelector('.collection'),
        clearBtn: document.querySelector('.clear-tasks'),
        filter: document.getElementById('filter'),
        taskInput: document.getElementById('add-task')
    });

    // Set storage protocol
    App.Store = App.LocalStorage;

    window.App = App;
})(window);

const addTask = function(e) {
    if (document.getElementById('edit-task') === null) {
        if (taskInput.value === '') {
            alert('You must add a task first');
        } else {

            const task = taskInput.value;
            
            // append task to ul.collection
            appendTask(task);
            
            // persist task
            persistTask(task);
            
            // clear input
            taskInput.value = '';
        }
    }

    e.preventDefault();
};

const editTask = function(e) {
    if (e.target.classList.contains('collection-item')) {
        // replace li text with edit field
        const editFields = document.createElement('div');
        const field = document.createElement('input');
        const target = e.target;
        const oldTask = target.textContent;
        console.log(oldTask);

        editFields.style.width = '90%';

        field.type = 'text';
        field.name = 'edit-task';
        field.id = 'edit-task'
        field.setAttribute('form', 'task-form');
        field.style.display = 'block';
        field.style.maxWidth = '75%';
        field.value = oldTask;

        editFields.appendChild(field);
        target.replaceChild(editFields, target.childNodes[0]);

        field.addEventListener('blur', function(e) {
            target.replaceChild(document.createTextNode(field.value), editFields);
        });
        form.addEventListener('submit', function(e) {
            updateTask(field.value, oldTask);
            field.blur();

            e.preventDefault();
        });
    }
}

// Remove task from list
const removeTask = function(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            deleteTask(e.target.parentElement.parentElement.textContent);
            e.target.parentElement.parentElement.remove();
        }
    }

    e.preventDefault();
};

// Clear all tasks
const clearTasks = function(e) {
    if (confirm('Are you REALLY sure you want to do that?')) {
        // taskList.innerHTML = '';

        // this is actually faster, though it doesn't make a
        // real difference in 99% of applications
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        dropTasks();
    }

    e.preventDefault();
}

const filterTasks = function(e) {
    // get field input
    const filterInput = filter.value;

    // search task list for query text
    let items = Array.from(taskList.children);
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

const updateTask = function(newTask, oldTask) {
    if (typeof document.getElementById('edit-task') !== 'undefined') {
        // get tasks
        const tasks = loadTasks();

        // find index of task to update
        if (tasks.indexOf(oldTask) > -1) {

            // replace with new task
            tasks[tasks.indexOf(oldTask)] = newTask;
        }

        // persist to storage
        saveTasks(tasks);
    }
}

// load and show tasks on page load
const showTasks = function() {
    const tasks = loadTasks();
    
    tasks.forEach(function(task) {
        appendTask(task);
    });
};

// Append task to list in UI
const appendTask = function(task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    
    // create text node and append
    li.appendChild(document.createTextNode(task));
    
    // create link to delete
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    
    // add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    
    // append link to li
    li.appendChild(link);
    
    // append li to ul.collection
    taskList.appendChild(li);
}
