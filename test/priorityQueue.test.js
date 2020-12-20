import { PriorityQueue } from '../dist/priorityQueue';

test('should instantiate', () => {
    const pque = new PriorityQueue();
    expect(pque).toBeTruthy();
});

test('should add values with integer and float keys', () => {
    const pque = new PriorityQueue();
    const inputs = ranArray(100, pque);

    expect(pque.peek()).toEqual(min(inputs));
    expect(pque.length).toEqual(100);
});


test('should pop and rearrange correctly everytime', () => {
    const pque = new PriorityQueue();
    const inputs = ranArray(100, pque);
    inputs.sort((a, b) => a - b);
    expect(pque.peek()).toEqual(inputs[0]);
    pque.pop();
    inputs.shift();
    inputs.sort((a, b) => a - b);
    expect(pque.peek()).toEqual(inputs[0]);
    pque.pop();
    inputs.shift();
    inputs.sort((a, b) => a - b);
    expect(pque.peek()).toEqual(inputs[0]);
});

test('should pop when only one element too', () => {
    const pque = new PriorityQueue();
    pque.add(1);
    expect(pque.pop()).toEqual(1);
    expect(pque.pop()).toBeFalsy();
})

test('should add very large amount of keys in 1 second', () => {
    const pque = new PriorityQueue();
    const t1 = Date.now();
    const inputs = ranArray(100000, pque);
    const t2 = Date.now();
    expect(pque.peek()).toEqual(min(inputs));
    expect(pque.length).toEqual(100000);
    expect((t2 - t1) / 1000).toBeLessThanOrEqual(1);


});

function ranArray(size, pque) {
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