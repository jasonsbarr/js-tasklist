/**
 * Functions for updating and displaying task list
 */

(function(window) {
    'use strict';

    let App = window.App;

    let UI = {
        // replace task text with edit field
        showEditField: function(target) {
            const fieldWrapper = document.createElement('div');
            const field = document.createElement('input');

            fieldWrapper.style.width = '90%';
            fieldWrapper.classList.add('edit');

            field.type = 'text';
            field.name = 'edit-task';
            field.id = 'edit-task'
            field.setAttribute('form', 'task-form');
            field.style.display = 'block';
            field.style.maxWidth = '75%';
            field.value = target.textContent;

            fieldWrapper.appendChild(field);
            target.replaceChild(fieldWrapper, target.childNodes[0]);

            return field;
        },

        // Append task to list in UI
        appendTask: function(task) {
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
            App.taskList.appendChild(li);
        }
    };

    App.UI = UI;
    window.App = App;
})(window);