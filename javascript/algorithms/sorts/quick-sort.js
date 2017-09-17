/**
 *  Quick Sort (Recursive program that uses partitioning method described below)
 *
 *  SHUFFLE is needed to guarantee performace.
 *
 *  It has 2 main steps.
 *      1. Partitioning.
 *             For some 'j',
 *             => entry arr[j] is at its correct position in arr
 *             => no larger entry to the left of 'j'
 *             => no smaller entry to the right of 'j'
 *      2. Sort each piece recursively.
 *
 * Pivot - chosen arbitarily - is the partitioning element.
 *
 * How it works?
 *      1. Take two pointers, i & j.
 *      2. Move i from left to right as long as arr[i] is less than arr[pivot] ==> arr[i] < arr[pivot]
 *      3. Move j from right to left as long as arr[j] is greater than arr[pivot]
 *
 *      If we find any 'i' where arr[i] > arr[pivot], we stop the 'i' pointer.
 *      Same for 'j', if we find any 'j' where arr[j] < arr[pivot], we stop 'j' pointer.
 *      At this point we know, arr[i] and arr[j] are at the wrong position w.r.t arr[pivot].
 *      So, we exchange their positions. Also, increase i & j by 1.
 *
 *      Do this till 'i' and 'j' pointer cross each other. After this, exchange j's position with pivot's position.
 *      Now, we have done our partitioning. Everything to the left is smaller than PIVOT (partitioning element) and
 *      everything to the right is larger than PIVOT.
 *
 *      Example:
 *      [K  R   A   T   E   L   E   P   U]
 *       🔺 i                           j
 *      Partitioning element(PIVOT) : arr[0] which is K. (chosen arbitarily) Denoted by symbol 🔺
 *      i & j are our pointers. Now follow above conditions.
 *
 *      i stops immediately because (R > K) arr[i] > arr[pivot]  ----> Check condition 2 above.
 *      j keeps moving one step at a time, and stops at E. ---> Check condition 3 above.
 *
 *      Since we found i and j which dont satisfy our conditions, we exchange their positions.
 *      Array becomes:
 *          [K  E   A   T   E   L   R   P   U]
 *           🔺     i           j                 ==> i & j are at new positions after exchange.
 *
 *      Next,
 *          arr[i], which is A, is less than K (arr[pivot]) ✅
 *          arr[j], which is L, is greater than K. ✅
 *          No exchanges, move pointers to their next positions.
 *
 *      Next,
 *          arr[i], which is T, is greater than K. STOP! ❌
 *          arr[j], which is E now, is less than K. STOP! ❌
 *          Swap! Exchange!
 *
 *      Array becomes:
 *          [K  E   A   E   T   L   R   P   U]
 *           🔺         j   i                    ==> i & j are at new positions after exchange.
 *
 *      Pointers crossed each other and we have looked everything in the array. 💥
 *      'j' is at the right most part of the LEFT SUBARRAY.
 *      Swap arr[pivot] with arr[j].
 *
 *      Array becomes:
 *          [E  E   A   K   T   L   R   P   U] =====> pointer 'j' is now at the partitioning element(PIVOT🔺)
 *                      🔺
 *
 *      We have 💥 successfully partioned 💥 the array using our PIVOT🔺. Notice everything to the left of
 *      PIVOT is smaller than PIVOT and everything to the right is greater than PIVOT.
 *
 *      But wait! Array is not at all sorted yet which was our motive, right?
 *      Read here:
 *          Since we know everything to left of 'pivot' is smaller than pivot and everything to the right is greater.
 *          That means PIVOT is at its correct positions in the unsorted array.💥
 *
 *          TO SORT THE REMAINING ARRAY, SORT THE LEFT AND RIGHT HALVES RECURSIVELY USING THE SAME ABOVE METHOD.
 *              [E  E   A]   K   [T   L   R   P   U]
 *                  left                right
 *
 *          Again choose Pivot for left halve and do the same process. Same goes for right. At the end, you get the SORTED ARRAY. 😎🤓
 *
 *
 *          <========================       T H A T' S   H O W   Q U I C K   S O R T   W O R K S        ============================>
 *
 *  Complexities:
 *      1. In place - no extra space unlike MERGE SORT
 *      2. Time - N log N
 *      3. Worst Case - array is already sorted. 1/2 N^2. That's shuffling array is needed for performace guarantee.
 *      4. Average Number of comparison - 2N Log N 🤔
 *      5. Number of exchanges - 1/2 N Log N 🤔
 *      5. Why faster than Merge Sort? Less data movement. No auxilliary array.
 *
 *  Caveat:
 *      Quick Sort is not stable. 🙄
 *      Partitioning can cause long range exchanges.
 *      Duplicate values can create problems. Can go quadratic times. 😰🤢
 *          Solution to Duplicate Keys => Stop partitioning at equal keys.
 *
 *  Improvements:
 *      Choose Insertion sort for small sub-arrays.
 *      Prefer choosing median as your pivot. (low + (high - low)/2)
 *
 * Better Solution: (Discovered by Dijkstra 🙌🏼)
 *      3 WAY PARTITIONING: (Dutch Nation Flag Problem 🤓🇳🇱)
 *      [_, ...< Pivot.., ...= Pivot..., > Pivot....,_]
 *      🔺              i              j             k      ===> 3 pointers i, j & k.
 *
 *      Every item to left of i is less than Pivot.
 *      Every item between i & j is equal to Pivot.
 *      Every item to right of j is greater than Pivot.
 */


class Quick {
    constructor (arr) {
        this.arr = arr
        // SHUFFLE can be done here!
    }

    // This is the main method of QUICK SORT!
    // This code is taking arr[low] as the pivot i.e first element of the array/sub-array
    partition (low, high) {
        let arr = this.arr
        let i = low
        let j = high + 1

        while (true) {
            // Condition 1 in above documentation
            // Move to the right as long as arr[j] is less than
            // the arr[pivot] which arr[low] here.
            while (arr[++i] < arr[low]) {
                // Check to make sure we don't run to the right of array.
                if (i === high) break
            }

            // Condition 2 in above documentation
            // Move to the left as long as arr[j] is greater than
            // the arr[pivot] which arr[low] here.
            while (arr[--j] > arr[low]) {
                // Check to make sure we don't run to the left of array.
                if (j === low) break
            }

            // if pointers cross each other.
            if (j <= i) break;

            this.exchange(i, j)
        }

        // Since our pointers have crossed each other, We need to exchange
        // arr[j] and arr[low] positions. arr[low] is pivot here.
        this.exchange(j, low)
        return j // position of our pivot after exchange.
    }

    exchange (i, j) {
        let temp
        let arr = this.arr
        temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }

    sort (low, high) {
        if (high <= low) return // We're done with array or array is empty!
        let pivot = this.partition(low, high)
        this.sort(low, pivot - 1)
        this.sort(pivot+1, high)
    }
}

const arr = ['f', 'a', 'b', 'e', 'd', 'h', 'c', 'g']
const low = 0
const high = arr.length - 1
const quick = new Quick(arr)
quick.sort(low, high)
