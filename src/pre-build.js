/*
 * This script is used to inject javascript and
 * css file to the template file when running `npm run build`.
 * It injects bundled files from the 'dist/build' directory
 * into the ejs files located at 'src/client/template'.
 * After that it will move them to 'dist' directory without changing the original files.
 * Sounds complicated, right?
 */
/* eslint no-console: 0 */

const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const UglifyJS = require('uglify-js');
const chalk = require('chalk');
const errorHandler = require('./error-handler');
const executeTodoList = require('./execute-todo-list');
const { config } = require('./config');

const { JSDOM } = jsdom;

// Handle tasks
module.exports = () => {
    const {
        srcDir,
        outDir,
        scripts,
        tasks,
    } = config;

    tasks.forEach((task) => {
        const { file, dir } = task;
        let { files } = task;
        if (file) {
            files = [file];
        }

        files.forEach((f) => {
            // Reading
            const filePath = path.resolve(srcDir, dir || '', f);
            const index = fs.readFileSync(filePath);

            // Get the DOM of the file
            const dom = new JSDOM(index.toString());
            const { document } = dom.window;

            // Insert scripts and minify them
            scripts.forEach((scr, i) => {
                let script = JSDOM.fragment(scr);
                const { textContent } = script;
                document.head.appendChild(script);
                if (textContent !== '') {
                    script = document.querySelector('script:last-child');
                    const minified = UglifyJS.minify(script.innerHTML);
                    if (minified.error) {
                        errorHandler(f, 'Insert scripts', `Failed while minifying the ${i} script`, minified.error);
                    }
                    else {
                        script.innerHTML = minified.code;
                    }
                }
            });

            // Do todo
            task.todos.forEach((todo) => {
                const { query } = todo;

                if (!query) {
                    errorHandler(f, todo.name, `Query must be specified for file ${f}`);
                }

                // Find the target which matches all conditions
                const targets = Array.prototype.slice.call(document.querySelectorAll(query));

                if (targets.length !== 1) {
                    errorHandler(f, todo.name, `Query must match only 1 target, but found ${targets.length}.`);
                }

                // process todo list
                executeTodoList(f, todo, targets[0], document);
            });

            // Then writing to the location
            const outputFile = path.resolve(outDir, f);
            const fileContent = dom.serialize().replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            fs.writeFile(outputFile, fileContent, (err) => {
                if (err) {
                    errorHandler(f, 'Write file', err.message, err.stack);
                }
                else {
                    console.log(f, chalk.bold.green('[Success]'));
                }
            });
        });
    });
};
