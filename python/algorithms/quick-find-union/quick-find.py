#Quick Find
"""
 * This is a QUICK FIND because 'find' operation is simple, whereas the 'union' operation is expensive.
 * Why is UNION operation expensive? Because it involves changing ids of every node which
is connected to 'p'.
 * Why is FIND operation quick? Because you just have to find the id of the p. O(1) complexity
 * Problem:
   1. Trees are flat, but too expensive to keep them flat.
   2. Union is too expensive. N array access.
 """
class QuickFind:
    arr = []
    def __init__(self,n):
        self.n = n
        for i in range(n):
            self.arr.append(i)
    def isConnected(self,p,q):
        self.p = p
        self.q = q
        return self.arr[p] == self.arr[q]
    def union(self,p,q):
        self.p = p
        self.q = q
        self.pId = self.arr[p]
        self.qId = self.arr[q]
        for i in range(len(self.arr)):
            if self.arr[i] == self.pId:
                self.arr[i] = self.qId
    def display(self):
        for i in self.arr:
            print(self.arr[i])

a = QuickFind(10)
print(a.isConnected(2, 4))#false
a.union(2, 4)
print(a.isConnected(2, 4)) #true
a.union(1, 4)
print(a.isConnected(1, 2))#true => 2 & 4 are connected and 1 & 4 are connected. so, 1 & 2 are connected.
a.display()