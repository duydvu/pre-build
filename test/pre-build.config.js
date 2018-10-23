// Default config file
module.exports = {
    srcDir: './template',
    outDir: './dist',
    findDir: './dist/build',
    publicPath: '/build',
    tasks: [
        {
            file: 'index.ejs',
            todos: [
                {
                    name: 'Insert hash for main.css',
                    type: 'insert-hash',
                    attribute: 'href',
                    query: 'link[href="/build/main.css"]',
                    regex: /main.\w+.css$/,
                },
                {
                    name: 'Insert hash for main.bundle.js',
                    type: 'insert-hash',
                    attribute: 'src',
                    query: 'script[src="/build/main.bundle.js"]',
                    regex: /main.bundle.\w+.js$/,
                },
            ],
        },
    ],
};
