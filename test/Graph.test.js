import Graph from '../src/graph/Graph';
import NodeDoesntExistError from '../src/graph/NodeDoesntExistError';

describe('graph', () => {
    let graph = null;

    beforeEach(() => {
        graph = new Graph();
    });

    it('should return graph', () => {
        const { nodes, edges } = graph.get();

        expect(nodes).toEqual([]);
        expect(edges).toEqual({});
    });

    it('should add node', () => {
        const key = graph.addNode();

        const { nodes, edges } = graph.get();

        expect(nodes).toHaveLength(1);
        expect(edges[key]).toHaveLength(0);
    });

    it('should get node', () => {
        const key = graph.addNode();

        const node = graph.getNode(key);

        expect(node).toEqual({ key });
    });

    it('should throw when no node with key', () => {
        const key = 1;

        expect(() => graph.getNode(key)).toThrow(new NodeDoesntExistError(key));
    });

    it('should update node', () => {
        const data = { name: 1 };
        const key = graph.addNode();

        graph.updateNode(key, data);

        expect(graph.getNode(key)).toEqual({ key, ...data });
    });

    it('should throw when update node which doesn\'t exist', () => {
        const key = 1;
        const data = { name: 1 };

        expect(() => graph.updateNode(key, data)).toThrow(
            new NodeDoesntExistError(key)
        );
    });

    it('should delete node', () => {
        const key = graph.addNode();

        const isDeleted = graph.deleteNode(key);

        const { nodes, edges } = graph.get();

        expect(isDeleted).toBe(true);
        expect(nodes).toEqual([]);
        expect(edges).toEqual({});
    });

    it('should throw when adding edge from node which doesn\'t exist', () => {
        const fromKey = 1;

        expect(() => graph.addEdge(fromKey, 2)).toThrow(
            new NodeDoesntExistError(fromKey)
        );
    });

    it('should throw when adding edge to node which doesn\'t exist', () => {
        const fromKey = graph.addNode();
        const toKey = 2;

        expect(() => graph.addEdge(fromKey, toKey)).toThrow(
            new NodeDoesntExistError(toKey)
        );
    });

    it('should add edge', () => {
        const fromKey = graph.addNode();
        const toKey = graph.addNode();

        graph.addEdge(fromKey, toKey);

        const { edges } = graph.get();

        expect(edges[fromKey]).toEqual([
            {
                to: toKey,
                weight: 0
            }
        ]);
        expect(edges[toKey]).toEqual([
            {
                to: fromKey,
                weight: 0
            }
        ]);
    });

    it('should throw when delete edge from node which doesn\'t exist', () => {
        const fromKey = 1;

        expect(() => graph.deleteEdge(fromKey, 2)).toThrow(
            new NodeDoesntExistError(fromKey)
        );
    });

    it('should throw when delete edge to node which doesn\'t exist', () => {
        const fromKey = graph.addNode();
        const toKey = 2;

        expect(() => graph.deleteEdge(fromKey, toKey)).toThrow(
            new NodeDoesntExistError(toKey)
        );
    });

    it('should delete edge', () => {
        const fromKey = graph.addNode();
        const toKey = graph.addNode();
        graph.addEdge(fromKey, toKey);

        graph.deleteEdge(fromKey, toKey);

        const { edges } = graph.get();

        expect(edges[fromKey]).toEqual([]);
        expect(edges[toKey]).toEqual([]);
    });
});
