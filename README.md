# PRE-BUILD
Template processing tool for deployment
## Motivation
It costs a lot of time to bring a project from development to production. In the case of web application, we had faced the problem on how not to manually edit all of our template files (e.g. html, ejs) on production. For example, the file index.ejs has a script with the src attribute is "/js/react.development.js" and we want to change it to "/js/react.production.js" on production. But that is not the end, we may want to add some scripts like Google Analytics' code or Facebook's Pixel and more other tasks. Therefore, we created Pre-build.js - a command-line script tool that help to automate all the tasks on the template files.
## Installation
```npm install @rezolabs/pre-build -g```
## Usage
You must supply a config file named `pre-build.config.js` to let Pre-build know what and how to execute your templates. Then run the command:
```pre-build```
You can name the file with a prefered name but you have to specify your prefered name in the command-line script:
```pre-build your-prefered-file-name.js```
## Configuration
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|`srcDir`|`{String}`|`'./template'`|The directory where you place your original template files.|
|`outDir`|`{String}`|`'./dist'`|The directory where the output files are generated, all of the original template files remain unchanged.|
|`findDir`|`{String}`|`'./build'`|This is used for some specific tasks such as changing href of a link to a file that contains hash in the name. For example: said that we want to change a link's href attribute from "/styles/main.css" to "/styles/main.<hash>.css", <hash> is a "random" string that we cannot predict. That file "main.<hash>.css" must be inside findDir.|
|`scripts`|`{Array.<string>}`|`[]`|Scripts that will be insert to the head of all template.|
|`tasks`|`{Array}`|`[]`|Specify a list of tasks to execute|
### More documentation needed