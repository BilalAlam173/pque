const HEAP_TREE = [];

/**
 * Possible inputs can be
 * an array of integers where the value itself are the keys(priorities)
 * an array of objects with a property key
 * a 2d Array with first element of each sub-element is the key
 */
const enqueue = function (key) {
    HEAP_TREE.push(key);
    if (HEAP_TREE.length === 1) return;
    else {
        reArrangeBtoT()
    }
}

const reArrangeBtoT = function (idx) {
    let childIdx = idx || HEAP_TREE.length - 1;
    let parentIdx = childIdx & 1 ? (childIdx - 1) / 2 : (childIdx - 2) / 2;
    if (HEAP_TREE[childIdx] < HEAP_TREE[parentIdx]) {
        swap(parentIdx, childIdx);
        return reArrangeBtoT(parentIdx)
    } else {
        return;
    }
}
const reArrangeTtoB = function (idx) {
    let currentIdx = idx || 0;
    let child = HEAP_TREE[(2 * currentIdx) + 1] < HEAP_TREE[(2 * currentIdx) + 2] ? (2 * currentIdx) + 1 : (2 * currentIdx) + 2;
    if (HEAP_TREE[child]) {
        swap(child, currentIdx);
        reArrangeTtoB(child);
    } else {
        return;
    }
}

const swap = function (x, y) {
    var b = HEAP_TREE[y];
    HEAP_TREE[y] = HEAP_TREE[x];
    HEAP_TREE[x] = b;
}

const dequeue = function () {
    if (HEAP_TREE.length > 1) {
        let node = HEAP_TREE[0];
        HEAP_TREE[0] = HEAP_TREE.pop();
        reArrangeTtoB();
        return node;
    } else {
        return HEAP_TREE.pop();

    }
}

const peek = function () {
    return HEAP_TREE[0];
}

enqueue(5);
enqueue(1);
enqueue(2);
enqueue(8);
enqueue(11);
enqueue(23);
enqueue(4);
enqueue(8);
enqueue(33);
enqueue(-3);
enqueue(-3);
enqueue(-11);
dequeue();
dequeue();
console.log(HEAP_TREE);
console.log(peek());