module.exports = Queue

function Queue()
{
    let collection = [];

    this.enqueue = function(element)
    { collection.push(element); }

    this.dequeue = function()
    { return collection.shift(); }

    this.clear = function()
    { collection = []; }

    this.count = function()
    { return collection.length; }

    this.isEmpty = function()
    {
        if (collection.length > 0)
        {
            return false;
        }
        else
        {
            return true;
        }
            
    }
}