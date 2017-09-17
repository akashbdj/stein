/**
 * Quick Find & Quick Union
 */


/**
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

class QuickFind {

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

const quf = new QuickFind(6)
quf.isConnected(2, 4) // false
quf.union(2, 4)
quf.isConnected(2, 4) // true
quf.union(1, 4)
quf.isConnected(1, 2) // true => 2 & 4 are connected and 1 & 4 are connected. so, 1 & 2 are connected.





/**
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

class QuickUnion {

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

        if (rootP === rootQ) return
        this.ids[rootP] = rootQ
    }
}

const quf = new QuickUnion(10)
quf.isConnected(2, 4)
quf.union(2, 4)
quf.isConnected(2, 4)
quf.union(1, 2)
quf.isConnected(1, 4)





/**
 * Quick Union Weighted - Better than Quick Union.
 * Why better?
 *  => Avoids tall trees. How? Keep track of the size of each tree.
 *  => Balances by linking root of the small tree to root of larger tree.
 *
 *  0  1  2  3  4  5  6  7  8  9
 *  Do. union(3, 4)
 *
 *  0   1   2   3   5   6   7   8   9
 *             /
 *            4
 *
 *  Now, do union(4, 8)
 *
 *  0   1   2   3   5   6   7   9
 *             /\
 *            4  8
 *
 * Notice, we merged 8 to (3,4) instead of (3,4) to 8. Why? Because 8 is a smaller tree
 * and (3,4) is larger tree. So, ALWAYS MERGE SMALLER TREE TO A LARGER TREE.
 *
 * Overhead:
 *  Extra array to maintain the size of each tree that tells number of objects in the
 *  tree rooted at 'i'.
 *
 * FIND: Same as Quick Union
 *
 * Complexities:
 *  Find: proportional to the depth of p and q -> log N
 *  Union: Constant time, given roots. Otherwise - log N because it
 *  involves find roots which is log N.
 *
 * Depth of any node is log N
 *
 * Entire code is same as Quick Union except for the implementation of
 * 'union' method where we check the size of both trees before appending
 * one tree to another.
 *
 * In simple words, find the roots of both p and q. Append either p to q or q to p
 * depending on the size of p and q.
 * If size of p is small -> add it to q, vice-versa.
 *
 * Why fast? Since the size of the tree is now very small (log N), find operation runs fast.
 */

class QuickUnionWeighted {

    constructor (size) {
        this.ids = []
        this.treeSize = []
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

        if (rootP === rootQ) return

        if (this.treeSize[p] < this.treeSize[q]) {
            this.ids[rootP] = rootQ
            this.treeSize[rootQ] += this.treeSize[rootP] // add size of tree p to q
            return
        }

        this.ids[rootQ] = rootP
        this.treeSize[rootP] += this.treeSize[rootQ] // add size of tree q to p
    }

}





/**
 * Quick Union Weighted with PATH COMPRESSION
 *
 * Quick Union (Weighted/Unweighted) can further be improved. How?
 * Let's examine the problem first.
 *      While finding the root of p, we touch each and every node in the PATH
 *      till we reach the root. Is it necessary? Absolutely NOT!
 *
 *      Then what?
 *          =>  Just after finding the root of 'p', set id of each examined node
 *              to point to that root. In otherwords, make every other node in
 *              the path to point to it's grandparent (thereby halving path length).
 *
 *      Example:
 *        0   1   2   3   4   5   6   7   8   9
 *      [ 0,  1,  8,  2,  3,  5,  5,  7,  8,  9 ]
 *
 *      Without Path Compression:
 *          Consider this code from 'getRootOf' method:
 *              while (ids[i] !== i) {
 *                  i = ids[i]
 *              }
 *          Now, Find root of 4.
 *              Step 1: ids[4] => 3, i becomes = 3
 *              Step 2: ids[3] => 2, i becomes = 2
 *              Step 3: ids[2] => 8, i becomes = 8
 *              Step 4: ids[8] => 8, loop terminates and we found the root of 4 which is 8
 *
 *      With Path Compression
 *          Consider this code from 'getRootOf' method:
 *              while (ids[i] !== i) {
 *                  ids[i] = ids[ids[i]]    <= Notice this line -> grandparent thing done here.
 *                  i = ids[i]
 *              }
 *
 *          Now, Find root of 4.
 *              Step 1: ids[4] => 3, ids[ids[4]] => 2, i becomes = 2
 *              Step 2: ids[2] => 8, ids[ids[2]] => 8, i becomes = 8.
 *                      Woah! Loop terminates here. 😱
 *
 *          Did you see any difference in the number of steps? Yeah? Exactly that's why it runs super fast. 😎
 *          Number of steps will reduce significantly as we traverse more and more nodes. ↓
 *
 *          More importantly, it will keep your tree as flat as possible. That's what we want in real situations.
 *          Flat Trees => Less Depth => Easy Search => Better Algorithm.
 *
 * So, what's the best part of this improvement?
 *      👉🏼 YOU ADD ONE SINGLE LINE TO YOUR EXISTING QUICK UNION (WEIGHTED/UNWEIGNTED) codebase, and IT'S FAST! 😎 😎 😎
 *
 * Change to code:
 *      In you 'getRootOf' method, add this line: ids[i] = ids[ids[i]]
 *      It becomes:
 *          getRootOf (i) {
 *              let ids = this.ids
 *              while (ids[i] !== i) {
 *                  ids[i] = ids[ids[i]]
 *                  i = ids[i]
 *              }
 *              return i
 *           }
 *
 * Complexities: log*N (Read as log star N) which is the number of time you run log N to get to 1. 😅
 */
