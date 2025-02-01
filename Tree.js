import Node from "./Node.js";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (!array.length) return null;

    array = [...new Set(array)].sort((x, y) => x - y);

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    const queue = [{ node: root, range: [0, array.length - 1] }];

    while (queue.length) {
      const front = queue.shift();
      const parent = front.node;
      const [start, end] = front.range;
      const index = start + Math.floor((end - start) / 2);

      if (start < index) {
        const midLeft = start + Math.floor((index - 1 - start) / 2);
        const leftChild = new Node(array[midLeft]);
        parent.left = leftChild;
        queue.push({ node: leftChild, range: [start, index - 1] });
      }

      if (end > index) {
        const midRight = index + 1 + Math.floor((end - index - 1) / 2);
        const rightChid = new Node(array[midRight]);
        parent.right = rightChid;
        queue.push({ node: rightChid, range: [index + 1, end] });
      }
    }
    return root;
  }
}

export default Tree;
