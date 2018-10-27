# PRE-BUILD
Template processing tool for deployment.
Tested on HTML and EJS.
## Motivation
It costs a lot of time to bring a project from development to production. In the case of web application, we had faced the problem on how not to manually edit all of our template files (e.g. html, ejs) on production. For example, the file index.html has a script with the `src` attribute is `/js/react.development.js` and we want to change it to `/js/react.production.js` on production. Or, we may want to add some scripts like Google Analytics code or Facebook Pixel code to all templates only on production. Therefore, we created Pre-build.js - a command-line script tool that help to automate all the tasks on the template files.
## Features
* Cache busting by changing file name.
* Change resources from development to production version.
* Inject production only scripts such as Google Analytic.
* Replace resources by injecting their content directly (inline).

That's not the end, new features will be added in the future. We would be very pleased to receive your PRs.
## Installation
```bash
npm install @rezolabs/pre-build -g
```
## Usage
You must supply a config file named `pre-build.config.js` to let Pre-build know what and how to execute your templates. Then run the command:
```bash
pre-build
```
You can name the file with a prefered name but you have to specify your prefered name in the command-line script:
```bash
pre-build your-prefered-file-name.js
```
## Example
For example, you have the following working tree:
```
.
+-- index.html
+-- pre-build.config.js
+-- build/
    +-- main.js
    +-- main.4ced4b9d199a27657a5d.js
```
And in `index.html`:
```html
<!DOCTYPE html>
<html>
    <head>
      <meta charset="utf-8">
      <title>Testing</title>
    </head>
    <body>
      <div id="root"></div>
      <script src="/build/main.js"></script>
    </body>
</html>
```
You want the script tag to automatically change to `src="/build/main.4ced4b9d199a27657a5d.js"` on production. The `4ced4b9d199a27657a5d` string in the name of the file is used for **cache busting** on browsers and is generated in a way that cannot be predicted. Only after the file is generated, then you can look up for it in its directory and change the `index.html` file. Instead of doing it manually, you can now use Pre-build.js to handle all of your costly tasks for you. Let's edit the `pre-build.config.js` file by copying the following code:
```javascript
module.exports = {
    srcDir: './',
    outDir: './',
    findDir: './build',
    publicPath: '/build',
    tasks: [
        {
            file: 'index.html',
            todos: [
                {
                    name: 'Insert hash for main.js',    // This is for debug purpose
                    type: 'insert-hash',
                    attribute: 'src',
                    query: 'script[src="/build/main.js"]',
                    regex: /main.\w+.js$/,
                },
            ],
        }
    ],
};
```
Then in the terminal run:
```bash
pre-build
```
When finished, your `index.html` will be changed to:
```html
<!DOCTYPE html>
<html>
    <head>
      <meta charset="utf-8">
      <title>Testing</title>
    </head>
    <body>
      <div id="root"></div>
      <script src="/build/main.4ced4b9d199a27657a5d.js"></script>
    </body>
</html>
```
If you want to keep your original `index.html`, simply change the `ourDir` in the config file to a different directory.
## Configuration
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|`srcDir`|`{String}`|`'./template'`|The directory where you place your original template files.|
|`outDir`|`{String}`|`'./dist'`|The directory where the output files are generated, all of the original template files remain unchanged.|
|`findDir`|`{String}`|`'./build'`|This is used for some specific tasks such as changing href of a link to a file that contains hash in the name. For example: said that we want to change a link's href attribute from "/styles/main.css" to "/styles/main.<hash>.css", <hash> is a "random" string that we cannot predict. That file "main.<hash>.css" must be inside findDir.|
|`scripts`|`{Array.<string>}`|`[]`|Scripts that will be insert to the head of all template.|
|`tasks`|`{Array}`|`[]`|Specify a list of task objects to execute|
### Task Object


### More documentation needed