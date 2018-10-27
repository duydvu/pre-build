module.exports = (content) => {
    return content.replace(/<%-/g, '<ejsc>').replace(/%>/g, '</ejsc>');
};
