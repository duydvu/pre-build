/**
 * @typedef {Object} QueryTarget
 * @property {HTMLElement} target - The HTML element that match the query
 * @property {(string|undefined)} error - The error message
 */
/**
 * Query an element that matches the query string from the Document object.
 * @param {Document} document - The Document object.
 * @param {string} query - The query to find the desired target.
 * @returns {QueryTarget}
 */
module.exports = (document, query) => {
    let error;

    if (!query) {
        return {
            error: 'Query must be specified.',
        };
    }

    // Find the target which matches all conditions
    const targets = Array.prototype.slice.call(document.querySelectorAll(query));

    if (targets.length !== 1) {
        error = `Query must match only 1 target, but found ${targets.length}.`;
    }

    return {
        target: targets[0],
        error,
    };
};
