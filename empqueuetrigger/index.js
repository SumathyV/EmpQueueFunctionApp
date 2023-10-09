module.exports = async function (context, myQueueItem) {
    context.log('Trying again JavaScript queue trigger function processed work item', myQueueItem);
};