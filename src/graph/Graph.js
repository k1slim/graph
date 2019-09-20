import NodeDoesntExistError from './NodeDoesntExistError';
import { generateUuid } from '../utils/uuid';

export default class Graph {
    nodes = [];
    edges = {};

    get() {
        return {
            nodes: this.nodes,
            edges: this.edges
        };
    }

    addNode(node = null) {
        const key = generateUuid();

        this.nodes.push({ ...node, key });
        this.edges[key] = [];

        return key;
    }

    updateNode(key, data) {
        let isNodeExist = false;

        const nodes = this.nodes.map((node) => {
            if (node.key === key) {
                isNodeExist = true;

                return {
                    ...node,
                    ...data
                };
            }

            return node;
        });

        if (!isNodeExist) {
            throw new NodeDoesntExistError(key);
        }

        this.nodes = nodes;
    }

    deleteNode(key) {
        let isDeleted = false;

        this.nodes = this.nodes.filter((node) => {
            if (node.key === key) {
                isDeleted = true;
            }

            return node.key !== key;
        });

        delete this.edges[key];

        return isDeleted;
    }

    getNode(key) {
        const node = this.nodes.find(item => item.key === key);

        if (!node) {
            throw new NodeDoesntExistError(key);
        }

        return node;
    }

    addEdge(from, to, weight = 0) {
        if (!this.edges[from]) {
            throw new NodeDoesntExistError(from);
        }

        if (!this.edges[to]) {
            throw new NodeDoesntExistError(to);
        }

        this.edges[from].push({ to, weight });
        this.edges[to].push({ to: from, weight });
    }

    deleteEdge(from, to) {
        if (!this.edges[from]) {
            throw new NodeDoesntExistError(from);
        }

        if (!this.edges[to]) {
            throw new NodeDoesntExistError(to);
        }

        this.edges[from] = this.edges[from].filter(edge => edge.to !== to);
        this.edges[to] = this.edges[to].filter(edge => edge.to !== from);
    }
}
