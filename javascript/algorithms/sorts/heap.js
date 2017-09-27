/**
 * Heap Sort
 */

class Heap {

    constructor (arr) {
        this.arr = this.buildHeap(arr)
        this.length = arr.length
    }

    parent (index) {
        return Math.floor((index - 1)/2)
    }

    leftChild (index) {
        return ((2 * index) + 1)
    }

    rightChild (index) {
        return ((2 * index) + 2)
    }

    exchange (i, j) {
        let temp
        let list = this.list

        temp = list[i]
        list[i] = list[j]
        list[j] = temp
    }

    sink (index) {
        let arr = this.arr
        while (this.leftChild(index) <= this.length) {
            let j = this.leftChild(index)
            if (arr[j] < arr[j + 1]) j++
            if (arr[j] < arr[index]) break
            this.exchange(index, j)
            index = j
        }
    }

    buildHeap (arr) {
        for (let i = this.length/2; i > 0; i--) {
            this.sink(i)
        }
    }



}
