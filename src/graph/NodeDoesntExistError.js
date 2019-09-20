export default class NodeDoesntExistError extends Error {
    constructor(key) {
        super();

        this.name = 'Node doesn\'t exist';
        this.message = `Node with key ${key} doesn't exist`;
    }
}
