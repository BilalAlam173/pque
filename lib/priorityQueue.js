class QueueItem {
  priority;
  value;
}
export class PriorityQueue {
  #HEAP_TREE = [];

  #reArrangeBtoT(idx) {
    let childIdx = idx || this.#HEAP_TREE.length - 1;
    let parentIdx = childIdx & 1 ? (childIdx - 1) / 2 : (childIdx - 2) / 2;
    if (this.#HEAP_TREE[childIdx] < this.#HEAP_TREE[parentIdx]) {
      this.#swap(parentIdx, childIdx);
      return this.#reArrangeBtoT(parentIdx);
    } else {
      return;
    }
  }
  #reArrangeTtoB(idx) {
    let currentIdx = idx || 0;
    let child =
      this.#HEAP_TREE[2 * currentIdx + 1] < this.#HEAP_TREE[2 * currentIdx + 2]
        ? 2 * currentIdx + 1
        : 2 * currentIdx + 2;
    if (this.#HEAP_TREE[child]) {
      this.#swap(child, currentIdx);
      this.#reArrangeTtoB(child);
    } else {
      return;
    }
  }
  #swap(x, y) {
    const b = this.#HEAP_TREE[y];
    this.#HEAP_TREE[y] = this.#HEAP_TREE[x];
    this.#HEAP_TREE[x] = b;
  }

  #heapify(i) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let min = i;
    if (
      left <= this.#HEAP_TREE.length &&
      this.#HEAP_TREE[left] < this.#HEAP_TREE[i]
    ) {
      min = left;
    }
    if (
      right <= this.#HEAP_TREE.length &&
      this.#HEAP_TREE[right] < this.#HEAP_TREE[min]
    ) {
      min = right;
    }
    if (min != i) {
      this.#swap(i, min);
      this.#heapify(min);
    }
  }

  constructor(input) {
    this.#HEAP_TREE = input || [];
    if (input && input.length > 0) {
      const pivot = Math.floor(input.length / 2);
      for (let i = pivot; i >= 0; i--) {
        this.#heapify(i);
      }
    }
  }

  get length() {
    return this.#HEAP_TREE.length;
  }

  get top() {
    return this.#HEAP_TREE[0];
  }

  toArray() {
    return this.#HEAP_TREE;
  }

  add(key) {
    this.#HEAP_TREE.push(key);
    if (this.#HEAP_TREE.length === 1) return;
    else {
      this.#reArrangeBtoT();
    }
  }

  pop() {
    if (this.#HEAP_TREE.length > 1) {
      let node = this.#HEAP_TREE[0];
      this.#HEAP_TREE[0] = this.#HEAP_TREE.pop();
      this.#reArrangeTtoB();
      return node;
    } else {
      return this.#HEAP_TREE.pop();
    }
  }

  merge(tree) {
    //...
  }

  set(idx, val) {
    //use idx if array of object
  }

  precede() {
    // increase priority
  }

  debase() {
    // decrease priority
  }
}
