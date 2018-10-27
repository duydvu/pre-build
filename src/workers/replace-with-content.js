const fs = require('fs');
const find = require('find');
const path = require('path');
const { JSDOM } = require('jsdom');
const queryTarget = require('../query-target');
const { config } = require('../config');

/**
 * Replace a resource with its content
 * @param {Document} document - The Document object.
 * @param {Object} todo - The todo object.
 * @returns {(string|undefined)} - Message of the error or undefined if no error occurred.
 */
module.exports = (document, todo) => {
    const {
        query,
        findDir,
        regex,
        tag,
    } = Object.assign({}, config.replaceWithContent, todo);

    const { target, error } = queryTarget(document, query);
    if (error) {
        return error;
    }

    const sources = find.fileSync(regex, path.resolve(findDir));
    if (sources.length !== 1) {
        return `There's must be only 1 ${regex} file in the ${findDir} directory. But found ${sources.length}.`;
    }
    let content = fs.readFileSync(sources[0]);
    const location = document.querySelector(todo.parent.query);
    content = JSDOM.fragment(`<${tag}>${content}</${tag}>`);
    location.replaceChild(content, target);

    return undefined;
};
