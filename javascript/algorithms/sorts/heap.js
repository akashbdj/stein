/**
 * Heap Sort
 */

class Heap {
    constructor(arr) {
        this.arr = arr
        this.length = arr.length
        this.buildHeap()
    }

    parent(index) {
        return Math.floor((index - 1) / 2)
    }

    leftChild(index) {
        return 2 * index + 1
    }

    rightChild(index) {
        return 2 * index + 2
    }

    exchange(i, j) {
        let temp
        let arr = this.arr

        temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }

    sink(index, len) {
        let arr = this.arr
        while (this.leftChild(index) <= len) {
            let j = this.leftChild(index)
            if (j < len && arr[j] < arr[j + 1]) j++
            if (arr[j] < arr[index]) break
            this.exchange(index, j)
            index = j
        }
    }

    sort() {
        let arr = this.arr
        let len = this.length - 1

        while (len > 0) {
            this.exchange(0, len)
            len--
            this.sink(0, len)
        }

        return arr
    }

    buildHeap() {
        let len = this.length
        for (let i = Math.floor(this.length / 2) - 1; i >= 0; i--) {
            this.sink(i, len)
        }
    }
}

const arr = [66, 12, 18, 223, 127, 141, 958, 1765, 53]
const heap = new Heap(arr)
heap.sort()
heap.arr
