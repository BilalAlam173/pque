import { PriorityQueue } from "../dist/priorityQueue";

test("should instantiate", () => {
    const pque = new PriorityQueue();
    expect(pque).toBeTruthy();
});

test("should add values with integer and float keys", () => {
    const pque = new PriorityQueue();
    const inputs = ranArrInsert(100, pque);

    expect(pque.top).toEqual(min(inputs));
    expect(pque.length).toEqual(100);
    expect(validate(pque)).toBeTruthy();
});

test("should add values with objects", () => {
    const pque = new PriorityQueue();
    pque.add({ key: 3, value: 'test' });
    pque.add({ key: 1, value: 'correct' });
    pque.add({ key: 2, value: 'test' });
    pque.add({ key: 5, value: 'test' });
    pque.add({ key: 10, value: 'test' });

    expect(pque.top['value']).toEqual('correct');
});

test("should pop and rearrange correctly everytime", () => {
    const pque = new PriorityQueue(ranArray(100));
    expect(validate(pque)).toBeTruthy();
    pque.pop();
    expect(validate(pque)).toBeTruthy();
    pque.pop();
    expect(validate(pque)).toBeTruthy();
    pque.pop();
    pque.pop();
    pque.pop();
    expect(validate(pque)).toBeTruthy();
});

test("should pop when only one element too", () => {
    const pque = new PriorityQueue();
    pque.add(1);
    expect(pque.pop()).toEqual(1);
    expect(pque.pop()).toBeFalsy();
});

test("should add very large amount of keys in 1 second", () => {
    const pque = new PriorityQueue();
    const t1 = Date.now();
    const inputs = ranArrInsert(100000, pque);
    const t2 = Date.now();
    expect(pque.top).toEqual(min(inputs));
    expect(pque.length).toEqual(100000);
    expect(validate(pque)).toBeTruthy();
    expect((t2 - t1) / 1000).toBeLessThanOrEqual(1);
});

test("should build a heap from an existing array", () => {
    const arr = [
        ...new Set([...Array(20)].map((x) => Math.round(Math.random() * 10))),
    ];
    const pque = new PriorityQueue(arr);
    const pque2 = new PriorityQueue();

    for (let i = 0; i < arr.length; i++) {
        pque2.add(arr[i]);
    }
    expect(pque.toArray()).toEqual(pque2.toArray());
});

test("should merge two priority queues", () => {
    const pque1 = new PriorityQueue(ranArray(10));
    const pque2 = new PriorityQueue(ranArray(20));
    pque1.merge(pque2, { mutate: true });
    const pque3 = pque2.merge(pque1);
    expect(validate(pque1)).toBeTruthy();
    expect(validate(pque3)).toBeTruthy();
    expect(pque1.length).toEqual(30);
    expect(pque3.length).toEqual(50);

});

/**
 *
 * --- UTILITY FUNCTIONS-----
 *
 */

function ranArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * size));
}

function ranArrInsert(size, pque) {
    const inputs = [];
    for (let i = 0; i < size; i++) {
        const val = Math.random() * 100;
        if (i & 1) {
            inputs.push(Math.round(val));
        } else {
            inputs.push(val);
        }
        pque.add(inputs[inputs.length - 1]);
    }
    return inputs;
}

function min(arr) {
    return Math.min.apply(null, arr);
}

function validate(pque, isMax = false) {
    let isValid = true;
    const arr = pque.toArray();
    for (let i = 0; i < arr.length; i++) {
        const left =
            arr[2 * i + 1] ||
            (isMax ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY);
        const right =
            arr[2 * i + 2] ||
            (isMax ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY);
        isValid = isMax
            ? arr[i] >= left && arr[i] >= right
            : arr[i] <= left && arr[i] <= right;
    }
    return isValid;
}
