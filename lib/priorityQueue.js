export class PriorityQueue {
    #HEAP_TREE = [];

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

    get tree(){
        return this.#HEAP_TREE;
    }

    get length() {
        return this.#HEAP_TREE.length;
    }

    peek(){
        return this.#HEAP_TREE[0];
    }

    #swap(x, y) {
        const b = this.#HEAP_TREE[y];
        this.#HEAP_TREE[y] = this.#HEAP_TREE[x];
        this.#HEAP_TREE[x] = b;
    }
    #reArrangeBtoT(idx) {
        let childIdx = idx || this.#HEAP_TREE.length - 1;
        let parentIdx = childIdx & 1 ? (childIdx - 1) / 2 : (childIdx - 2) / 2;
        if (this.#HEAP_TREE[childIdx] < this.#HEAP_TREE[parentIdx]) {
            this.#swap(parentIdx, childIdx);
            return this.#reArrangeBtoT(parentIdx)
        } else {
            return;
        }
    }
    #reArrangeTtoB(idx) {
        let currentIdx = idx || 0;
        let child = this.#HEAP_TREE[(2 * currentIdx) + 1] < this.#HEAP_TREE[(2 * currentIdx) + 2] ? (2 * currentIdx) + 1 : (2 * currentIdx) + 2;
        if (this.#HEAP_TREE[child]) {
            this.#swap(child, currentIdx);
            this.#reArrangeTtoB(child);
        } else {
            return;
        }
    }
}