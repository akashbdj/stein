#Quick Union    
"""
 * This is QUICK UNION because 'union' operation is simple, whereas the 'find' operation is slightly expensive.
 
 * This is a lazy approach.
 * Interpretation : ids[i] is the parent of i.
 * Root of 'i' is : ids[ids[ids[ids[....ids[i]...]]]], and so on.
 * How to know that we have reached at the ROOT of i?
 *      Recursively find parent of i till you reach at a point where
 *      ids[i] == i
 *      Example:
 *        0   1   2   3   4   5   6   7   8   9
 *      [ 0,  1,  2,  8,  3,  5,  5,  7,  8,  9 ]

 *      Task: root of 4.
 *      Solution: parent of 4 is 3, parent of 3 is 8, parent of 8 is 8.
 *      Wait! Parent of 8 is 8? Yes! And, that's the root of 4.
 *      Condition to find root i.e ids[i] = i satisfies here. ids[8] === 8

 *      Now, root of 2? You're right - it's 2.

 * FIND : Check if 'p' & 'q' have same ROOT.

 * UNION: To merge component containing 'p' & 'q', set the id of p's root to
 * the id of q's root.

 * Why is UNION operation quick? Because it involves only changing one entry in
 * the array of ids.
 *
 * Why is FIND operation slightly expensive? Because you've to recursively go up
 * in the tree to find the root of 'i'.

 * In simple words,
 * To connect 'p' and 'q', find root of both 'p' and 'q', and change one of the
 * root to others.

 * Complexities:
 *  Initialize : N
 *  Union: N (why N? Because involves finding the root. Check implementation!)
 *  Find: N
 *
 * Problem here:
 *  1. Trees can get tall.
 *  2. Finding can be very expensive (N array access)
"""
class QuickUnion:
    arr = []
    def __init__(self,n):
        self.n = n
        for i in range(n):
            self.arr.append(i)

    def isConnected(self,p,q):
        return self.getroot(p) == self.getroot(q)

    def getroot(self,i):
        self.i = i
        while self.arr[i] != i:
            i = self.arr[i]
        return i

    def union(self,p,q):
        self.proot = self.getroot(p)
        self.qroot = self.getroot(q)
        self.arr[self.proot] = self.qroot

    def display(self):
        for i in self.arr:
            print(self.arr[i])

a = QuickUnion(10)
print(a.isConnected(2, 4))
a.union(2, 4)
print(a.isConnected(2, 4))
a.union(1, 2)
print(a.isConnected(1, 4))
a.display()