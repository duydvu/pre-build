const { JSDOM } = require('jsdom');
const UglifyJS = require('uglify-js');
const queryTarget = require('../query-target');
const { config } = require('../config');

/**
 * Insert scripts and minify them
 * @param {Document} document - The Document object.
 * @param {Object} todo - The todo object.
 * @returns {(string|undefined)} - Message of the error or undefined if no error occurred.
 */
module.exports = (document, todo) => {
    const {
        query,
        scripts,
    } = Object.assign({}, config.inject, todo);

    const { target, error } = queryTarget(document, query);
    if (error) {
        return error;
    }

    for (let i = 0; i < scripts.length; i += 1) {
        let script = JSDOM.fragment(scripts[i]);
        const { textContent } = script;

        target.appendChild(script);

        if (textContent !== '') {
            script = target.querySelector('script:last-child');
            const minified = UglifyJS.minify(script.innerHTML);
            if (minified.error) {
                return minified.error;
            }
            script.innerHTML = minified.code;
        }
    }

    return undefined;
};
