const fs = require('fs');
const find = require('find');
const path = require('path');
const jsdom = require('jsdom');
const errorHandler = require('./error-handler');
const { config } = require('./config');

const { JSDOM } = jsdom;

/**
 * execute-todo-list.js
 * Processing the todo list of every task.
 * The todo.type is fed to determine which kind of job will be executed.
 * @param {string} file - The name of the file to be processed.
 * @param {Object} todo - The todo object.
 * @param {Object} target - The DOM element on which will be processed.
 * @param {Object} document - The document object of the file.
 * @returns {undefined}
 */
module.exports = function executeTodoList(file, todo, target, document) {
    const {
        publicPath,
    } = config;
    const findDir = path.resolve(config.findDir);
    const {
        name,
        type,
        attribute,
        regex,
        tag,
        value,
    } = todo;

    switch (type) {
        case 'replace-with-content': {
            const sources = find.fileSync(regex, findDir);
            if (sources.length !== 1) {
                errorHandler(file, name, `There's must be only 1 ${regex} file in the ${findDir} directory. But found ${sources.length}.`);
            }
            let content = fs.readFileSync(sources[0]);
            const location = document.querySelector(todo.parent.query);
            content = JSDOM.fragment(`<${tag}>${content}</${tag}>`);
            location.replaceChild(content, target);
            break;
        }

        case 'insert-hash': {
            const sources = find.fileSync(regex, findDir);
            if (sources.length !== 1) {
                errorHandler(file, name, `There's must be only 1 ${regex} file in the ${findDir} directory. But found ${sources.length}.`);
            }
            const hashFile = sources[0].match(/^\/(.+\/)*(.+)\.(.+)$/).slice(2, 4).join('.');
            const attrValue = path.join(publicPath, hashFile);
            target.setAttribute(attribute, attrValue);
            break;
        }

        case 'alter-prop':
            target.setAttribute(attribute, value);
            break;
        default:
            errorHandler(file, name, 'Unknown todo type.');
    }
};
