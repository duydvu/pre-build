// Default config file
module.exports = {
    srcDir: './template',
    outDir: './dist',
    inject: {
        query: 'head',
        scripts: [
            // This is where you place scripts that will be inserted to the head
        ],
    },
    cacheBust: {
        findDir: './build',
        publicPath: '/build',
    },
    tasks: [
        // This is where you place a list of tasks that will be executed
    ],
};
