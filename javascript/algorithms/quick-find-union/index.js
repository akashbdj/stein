/**
 * Quick Find & Quick Union
 */


/**
 * Basic implementation.
 *
 * [ids array of integers]
 * @type {Array}
 * This is a QUICK FIND because 'find' operation is simple, whereas
 * the 'union' operation is expensive.
 *
 * Why is UNION operation expensive? Because it involves changing ids of every node which
 * is connected to 'p'.
 *
 * Why is FIND operation quick? Because you just have to find the id of the p. O(1) complexity
 *
 * Problem:
 *  1. Trees are flat, but too expensive to keep them flat.
 *  2. Union is too expensive. N array access.
 */

class QuickFUBasic {

    constructor (size) {
        this.ids = []
        for (let i = 0; i < size; i++) {
            this.ids[i] = i
        }
    }

    isConnected (p, q) {
        return this.ids[p] === this.ids[q]
    }

    isPresent (id) {
        return id !== undefined ? true : false
    }

    union (p, q) {
        let ids = this.ids
        let idsLen = ids.length

        let pId = ids[p]
        let qId = ids[q]

        if (!this.isPresent(pId) || !this.isPresent(qId)) {
            return new Error(`
                pId or qId is undefined.
                Either not present in array or explicitly set as undefined.
                Cannot perform 'union' operation.`
            )
        }

        for (let i = 0; i < idsLen; i++) {
            if (ids[i] === pId) {
                ids[i] = qId
            }
        }
    }
}

const quf = new QuickFUBasic(6)
quf.isConnected(2, 4) // false
quf.union(2, 4)
quf.isConnected(2, 4) // true
quf.union(1, 4)
quf.isConnected(1, 2) // true => 2 & 4 are connected and 1 & 4 are connected. so, 1 & 2 are connected.





/**
 * Better implementation.
 *
 * [ids array of integers]
 * @type {Array}
 *
 * This is QUICK UNION because 'union' operation is simple, whereas
 * the 'find' operation is slightly expensive.
 *
 * This is a lazy approach.
 *
 * Interpretation : ids[i] is the parent of i.
 * Root of 'i' is : ids[ids[ids[ids[....ids[i]...]]]], and so on.
 *
 * How to know that we have reached at the ROOT of i?
 *      Recursively find parent of i till you reach at a point where
 *      ids[i] === i
 *      Example:
 *        0   1   2   3   4   5   6   7   8   9
 *      [ 0,  1,  2,  8,  3,  5,  5,  7,  8,  9 ]
 *
 *      Task: root of 4.
 *      Solution: parent of 4 is 3, parent of 3 is 8, parent of 8 is 8.
 *      Wait! Parent of 8 is 8? Yes! And, that's the root of 4.
 *      Condition to find root i.e ids[i] = i satisfies here. ids[8] === 8
 *
 *      Now, root of 2? You're right - it's 2.
 *
 * FIND : Check if 'p' & 'q' have same ROOT.
 *
 * UNION: To merge component containing 'p' & 'q', set the id of p's root to
 * the id of q's root.
 *
 * Why is UNION operation quick? Because it involves only changing one entry in
 * the array of ids.
 *
 * Why is FIND operation slightly expensive? Because you've to recursively go up
 * in the tree to find the root of 'i'.
 *
 * In simple words,
 * To connect 'p' and 'q', find root of both 'p' and 'q', and change one of the
 * root to others.
 *
 * Complexities:
 *  Initialize : N
 *  Union: N (why N? Because involves finding the root. Check implementation!)
 *  Find: N
 *
 * Problem here:
 *  1. Trees can get tall.
 *  2. Finding can be very expensive (N array access)
 */

class QuickFUBetter {

    constructor (size) {
        this.ids = []
        for (let i = 0; i < size; i++) {
            this.ids[i] = i
        }
    }

    isConnected (p, q) {
        return this.getRootOf(p) === this.getRootOf(q)
    }

    /**
     * This is basically the 'FIND' operation.
     * [getRootOf finds the root of the given item in an array]
     * @param  {[type]} i [item whose root we are finding]
     * @return {[type]}   [root of the given index i]
     */
    getRootOf (i) {
        let ids = this.ids
        while (ids[i] !== i) {
            i = ids[i]
        }
        return i
    }

    /**
     * [union Change root of 'p' to point to root of 'q']
     * @param  {[type]} p [item to connect to q]
     * @param  {[type]} q [item to connect to p]
     */
    union (p, q) {
        let rootP = this.getRootOf(p)
        let rootQ = this.getRootOf(q)
        this.ids[rootP] = rootQ
    }
}

const quf = new QuickFUBetter(10)
quf.isConnected(2, 4)
quf.union(2, 4)
quf.isConnected(2, 4)
quf.union(1, 2)
quf.isConnected(1, 4)
