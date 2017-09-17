/**
 * Quick Find & Quick Union 
 */

// Basic implementation.

class QuickFUBasic {
    constructor(size) {
        this.ids = []
        for (let i = 0; i < size; i++) {
            this.ids[i] = i
        }
    }

    isConnected(p, q) {
        return this.ids[p] === this.ids[q]
    }

    isPresent(id) {
        return id !== undefined ? true : false
    }

    union(p, q) {
        let ids = this.ids
        let idsLen = ids.length

        let pId = ids[p]
        let qId = ids[q]

        if (!this.isPresent(pId) || !this.isPresent(qId)) {
            return new Error(`
                pId or qId is undefined.
                Either not present in array or explicitly set as undefined.
                Cannot perform 'union' operation.`)
        }

        for (let i = 0; i < idsLen; i++) {
            if (ids[i] === pId) {
                ids[i] = qId
            }
        }
    }
}

var quf = new QuickFUBasic(6)
quf.isConnected(2, 4) // false
quf.union(2, 4)
quf.isConnected(2, 4) // true
quf.union(1, 4)
quf.isConnected(1, 2) // true => 2 & 4 are connected and 1 & 4 are connected. so, 1 & 2 are connected.

// Slightly Better implementation.

class QuickFUBetter {}
