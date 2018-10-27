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
            const ext = f.match(/\w+.(\w+)$/)[1];
            const filePath = path.resolve(srcDir, dir || '', f);
            const index = fs.readFileSync(filePath);

            // Get the DOM of the file
            const dom = new JSDOM(index.toString());
            const { document } = dom.window;

            // Do todo
            task.todos.forEach((todo) => {
                // process todo list
                const err = executeTodoList(document, todo);
                if (err) {
                    errorHandler(f, err);
                }
            });

            // Then writing to the location
            const outputFile = path.resolve(outDir, f);
            let fileContent = dom.serialize();

            if (ext === 'ejs') {
                fileContent = fileContent.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            }

            fs.writeFile(outputFile, fileContent, (err) => {
                if (err) {
                    errorHandler(f, err.message, err.stack);
                }
                else {
                    console.log(f, chalk.bold.green('[Success]'));
                }
            });
        });
    });
};
