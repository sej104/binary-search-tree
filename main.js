import Tree from "./Tree.js";
import Node from "./Node.js";

const generateArray = (length) => {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const array = generateArray(7);
const tree = new Tree(array);

prettyPrint(tree.root);
console.log(tree.isBalanced());

// tree.levelOrder((node) => console.log(node.data));
// tree.preOrder((node) => console.log(node.data));
// tree.inOrder((node) => console.log(node.data));
// tree.postOrder((node) => console.log(node.data));

tree.insert(150);
tree.insert(100);
tree.insert(500);
prettyPrint(tree.root);
console.log(tree.isBalanced());

tree.rebalance();
prettyPrint(tree.root);
console.log(tree.isBalanced());

// tree.levelOrder((node) => console.log(node.data));
// tree.preOrder((node) => console.log(node.data));
// tree.inOrder((node) => console.log(node.data));
// tree.postOrder((node) => console.log(node.data));
