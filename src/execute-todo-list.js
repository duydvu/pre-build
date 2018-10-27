const cacheBust = require('./workers/cache-bust');
const inject = require('./workers/inject');
const replaceWithContent = require('./workers/replace-with-content');

/**
 * Processing the todo list of every task.
 * The todo.type is fed to determine which kind of job will be executed.
 * @param {Document} document - The Document object.
 * @param {Object} todo - The todo object.
 * @returns {(string|undefined)} - Message of the error or undefined if no error occurred.
 */
module.exports = (document, todo) => {
    switch (todo.type) {
        case 'replace-with-content': {
            return replaceWithContent(document, todo);
        }

        case 'cache-bust': {
            return cacheBust(document, todo);
        }

        case 'inject': {
            return inject(document, todo);
        }

        // case 'alter-prop':
        //     target.setAttribute(attribute, value);
        //     break;
        default:
            return 'Unknown todo type.';
    }
};
