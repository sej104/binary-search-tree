import Node from "./Node.js";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (!array.length) return null;

    array = [...new Set(array)].sort((x, y) => x - y);

    function createBST(start, end) {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);
      const root = new Node(array[mid]);

      root.left = createBST(start, mid - 1);
      root.right = createBST(mid + 1, end);

      return root;
    }
    return createBST(0, array.length - 1);
  }

  insert(value) {
    if (!this.root) this.root = new Node(value);

    let parent = null;
    let current = this.root;

    while (current) {
      if (value < current.data) {
        parent = current;
        current = current.left;
      } else if (value > current.data) {
        parent = current;
        current = current.right;
      } else {
        return;
      }
    }

    if (value < parent.data) parent.left = new Node(value);
    else parent.right = new Node(value);
  }
}

export default Tree;
