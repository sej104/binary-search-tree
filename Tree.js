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

  deleteItem(value) {
    function findSuccessor(root) {
      root = root.right;
      while (root.left) root = root.left;
      return root;
    }

    function delNode(root, value) {
      if (root === null) return root;

      if (value < root.data) root.left = delNode(root.left, value);
      else if (value > root.data) root.right = delNode(root.right, value);
      else {
        if (root.left === null) return root.right;
        if (root.right === null) return root.left;

        const successor = findSuccessor(root);
        root.data = successor.data;
        root.right = delNode(root.right, successor.data);
      }

      return root;
    }

    delNode(this.root, value);
  }

  find(value) {
    let current = this.root;

    while (current) {
      if (value < current.data) current = current.left;
      else if (value > current.data) current = current.right;
      else return current;
    }
    return null;
  }

  levelOrder(callback) {
    if (!callback) throw new Error("Callback must be provided");
    if (!this.root) return null;

    const queue = [this.root];

    while (queue.length) {
      const current = queue.shift();
      callback(current);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  levelOrderRecursive(callback, queue = [this.root]) {
    if (!callback) throw new Error("Callback must be provided");

    if (!queue.length || !this.root) return;

    const newQueue = [];

    queue.forEach((node) => {
      callback(node);
      if (node.left) newQueue.push(node.left);
      if (node.right) newQueue.push(node.right);
    });

    this.levelOrderRecursive(callback, newQueue);
  }

  inOrder(callback, root = this.root) {
    if (!callback) throw new Error("Callback must be provided");

    if (!root) return;

    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }

  preOrder(callback, root = this.root) {
    if (!callback) throw new Error("Callback must be provided");

    if (!root) return;

    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  postOrder(callback, root = this.root) {
    if (!callback) throw new Error("Callback must be provided");

    if (!root) return;

    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }

  depth(node) {
    if (!this.root || !node.data) return null;

    let current = this.root;
    let depth = 0;

    while (current) {
      if (node.data < current.data) {
        current = current.left;
        depth += 1;
      } else if (node.data > current.data) {
        current = current.right;
        depth += 1;
      } else return depth;
    }
    return null;
  }

  height(node = this.root) {
    function findHeight(root, height = 0) {
      let leftHeight = height;
      let rightHeight = height;

      if (root.left) leftHeight = findHeight(root.left, height + 1);
      if (root.right) rightHeight = findHeight(root.right, height + 1);

      return leftHeight > rightHeight ? leftHeight : rightHeight;
    }

    let current = this.find(node.data);
    if (!current) return null;

    return findHeight(current);
  }

  isBalanced() {
    if (!this.root) return false;

    let leftHeight = 0;
    let rightHeight = 0;

    if (this.root.left) leftHeight = this.height(this.root.left) + 1;
    if (this.root.right) rightHeight = this.height(this.root.right) + 1;

    return Math.abs(leftHeight - rightHeight) <= 1;
  }
}

export default Tree;
