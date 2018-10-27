// Default config file
module.exports = {
    srcDir: './template',
    outDir: './dist',
    inject: {
        scripts: [
            '<script>alert(1)</script>',
        ],
    },
    cacheBust: {
        findDir: './dist/build',
    },
    tasks: [
        {
            file: 'index.ejs',
            todos: [
                {
                    type: 'inject',
                },
                {
                    type: 'cache-bust',
                    query: 'link[href="/build/main.css"]',
                    attribute: 'href',
                    regex: /main.\w+.css$/,
                },
                {
                    type: 'cache-bust',
                    query: 'script[src="/build/main.bundle.js"]',
                    attribute: 'src',
                    regex: /main.bundle.\w+.js$/,
                },
            ],
        },
    ],
};
