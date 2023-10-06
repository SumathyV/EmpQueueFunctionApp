module.exports = async function (context, myQueueItem) {
    context.log('Trying JavaScript queue trigger function processed work item', myQueueItem);
};