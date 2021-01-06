
export class PriorityQueue {

    /**
     * Array implementation of binary Heap tree
     */
    #HEAP_TREE = [];

    #IS_PRIMITIVE = null;

    #INIT_OPTIONS = {
        isMin: true,
        priorityKey: 'key',
        valueKey: 'value',
    }

    /**
     * ReArrange Bottom to Top
     * Starting from the last node, reach the root node
     * while swapping nodes where necessary to
     * make the binary heap tree state valid
     * @param {*} idx to be used for recursion
     */
    #reArrangeBtoT(idx) {
        const childIdx = idx || this.#HEAP_TREE.length - 1;
        const parentIdx = childIdx & 1 ? (childIdx - 1) / 2 : (childIdx - 2) / 2;
        const child = this.#IS_PRIMITIVE ? this.#HEAP_TREE[childIdx] : this.#HEAP_TREE[childIdx][this.#INIT_OPTIONS.priorityKey];
        const parent = this.#IS_PRIMITIVE ? this.#HEAP_TREE[parentIdx] : this.#HEAP_TREE[parentIdx][this.#INIT_OPTIONS.priorityKey];
        if (child < parent) {
            this.#swap(parentIdx, childIdx);
            return this.#reArrangeBtoT(parentIdx);
        } else {
            return;
        }
    }

    /**
     * ReArrange Top to Bottom
     * Starting from the root, reach the bottom
     * while swapping nodes where necessary to
     * make the binary heap tree state valid
     * @param {*} idx to be used for recursion
     */
    #reArrangeTtoB(idx) {
        let currentIdx = idx || 0;
        const leftIdx = 2 * currentIdx + 1;
        const rightIdx = 2 * currentIdx + 2;
        const left = this.#IS_PRIMITIVE ? this.#HEAP_TREE[leftIdx] :
            (this.#HEAP_TREE[leftIdx] && this.#HEAP_TREE[leftIdx][this.#INIT_OPTIONS.priorityKey]);
        const right = this.#IS_PRIMITIVE ? this.#HEAP_TREE[rightIdx] :
            (this.#HEAP_TREE[rightIdx] && this.#HEAP_TREE[rightIdx][this.#INIT_OPTIONS.priorityKey]);;
        let childIdx = left < right ? leftIdx : rightIdx;
        if (this.#HEAP_TREE[childIdx]) {
            this.#swap(childIdx, currentIdx);
            this.#reArrangeTtoB(childIdx);
        } else {
            return;
        }
    }

    /** Nothing fancy, a smiple swap */
    #swap(x, y) {
        const b = this.#HEAP_TREE[y];
        this.#HEAP_TREE[y] = this.#HEAP_TREE[x];
        this.#HEAP_TREE[x] = b;
    }

    /**
     * Ford's divide and conquer algorithm to build heap from array
     *
     * @param {*} i
     */
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

    /**
     * construct the heap from input using Ford's heapify Algorithm
     * @param {*} input
     */
    constructor(input, options) {
        this.#HEAP_TREE = input || [];
        this.#INIT_OPTIONS = Object.assign(this.#INIT_OPTIONS, {});

        if (Array.isArray(input) && input.length > 0) {
            /**
             * dividing into half and then backtracking till the start
             * of the array
             */
            const pivot = Math.floor(input.length / 2);
            for (let i = pivot; i >= 0; i--) {
                this.#heapify(i);
            }
        } else if (input && !Array.isArray(input)) {
            throw new Error(
                "TypeError: unable to construct priority queue, input must be an array"
            );
        }
    }

    get length() {
        return this.#HEAP_TREE.length;
    }

    /**
     * Returns the root node of the tree without modifying queue
     * largest priority value in max mode and vice versa
     */
    get top() {
        return this.#HEAP_TREE[0];
    }

    /**
     * Returns the Heap tree in array form
     */
    toArray() {
        return this.#HEAP_TREE;
    }

    /** Adds a new item with a priority */
    add(item) {
        if (this.#IS_PRIMITIVE === null)
            this.#IS_PRIMITIVE = item !== Object(item);
        //simply append at the last of the tree
        this.#HEAP_TREE.push(item);
        if (this.#HEAP_TREE.length === 1) return;
        else {
            // and then reArrange from bottom to top
            this.#reArrangeBtoT();
        }
    }

    /**
     * pops the root of the tree and reArrange
     * itself to stay valid
     */
    pop() {
        if (this.#HEAP_TREE.length > 1) {
            let node = this.#HEAP_TREE[0];

            // move the last element to the top
            this.#HEAP_TREE[0] = this.#HEAP_TREE.pop();
            // Now Re arrange from top to bottom
            this.#reArrangeTtoB();

            return node;
        } else {
            return this.#HEAP_TREE.pop();
        }
    }

    /**
     * Merge two priority ques or an array into a priority queue
     * @param {Array/Priorityqueue} queue - queue/array to merge
     * @param {Object} options - configurations
     * @option {Boolean} mutate - modify the existing queue OR create a new queue
     * @option {Boolean} invert - invert the state of the HEAP after merge i.e min or max - **** TODO ****
     */
    merge(queue, options = { mutate: false, invert: false }) {
        if (
            queue instanceof PriorityQueue ||
            typeof queue.toArray === "function" ||
            Array.isArray(queue)
        ) {
            if (options.mutate) {
                this.#HEAP_TREE.push(...(queue.toArray ? queue.toArray() : queue));
            } else {
                return new PriorityQueue(
                    this.#HEAP_TREE.concat(queue.toArray ? queue.toArray() : queue)
                );
            }
        } else {
            throw new Error(
                "TypeError: Unable to merge priority queue, provide either an array or an instance of priority queue"
            );
        }
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
