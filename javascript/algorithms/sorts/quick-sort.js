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
 * Motive for partitioning :
 *      Move Pivot to its correct position in the array such that every element to its left is smaller than Pivot and
 *      every element to its right is greater than Pivot
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
 *   <===========================       T H A T' S   H O W   Q U I C K   S O R T   W O R K S        ==============================>
 *
 * Complexities:
 *      1. In place - no extra space unlike MERGE SORT
 *      2. Time - N log N
 *      3. Worst Case - array is already sorted. 1/2 N^2. That's why shuffling the array is needed for performace guarantee.
 *      4. Average Number of comparison - 2N Log N 🤔
 *      5. Number of exchanges - 1/2 N Log N 🤔
 *      5. Why faster than Merge Sort? Less data movement. No auxilliary array.
 *
 * Caveats:
 *      Quick Sort is not stable. 🙄
 *      Partitioning can cause long range exchanges.
 *      Duplicate values can create problems. Can go quadratic times. 😰🤢
 *          Solution to Duplicate Keys => Stop partitioning at equal keys.
 *
 * Improvements:
 *      Choose Insertion sort for small sub-arrays.
 *      Prefer choosing median as your pivot. (low + (high - low)/2)
 *
 * Better Solution: Continue reading below Quick implementation.
 *
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
        let pivot = this.partition(low, high) // position of the pivot after partitioning!
        this.sort(low, pivot - 1)
        this.sort(pivot+1, high)
    }
}

const arr = ['f', 'a', 'b', 'e', 'd', 'h', 'c', 'g']
const low = 0
const high = arr.length - 1
const quick = new Quick(arr)
quick.sort(low, high)





/**
 * Better Solution: (Discovered by Dijkstra 🙌🏼)
 *      3 WAY PARTITIONING: (Dutch National Flag Problem 🤓🇳🇱)
 *      [_, ...< Pivot.., ...= Pivot..., > Pivot....,_]
 *      low            lt             gt           high ===> 2 pointers in the middle - lt & gt (lt - less than & gt - greater than)
 *
 *      Every item to left of lt is less than Pivot.
 *      Every item between lt & gt is equal to Pivot.
 *      Every item to right of gt is greater than Pivot.
 *
 *      Steps:
 *          1. Pivot => arr[low]
 *          2. Scan from left to right
 *              -> arr[i] < Pivot, swap arr[i] and arr[lt]. Increment both 'i' & 'lt'
 *              -> arr[i] > Pivot, swap arr[i] and arr[gt]. Decrement 'gt'
 *              -> arr[i] === Pivot, Increment 'i'
 *
 *      Example:
 *          Consider this array:
 *
 *          lt  i                                               gt
 *          [P  A   B   X   W   P   P   V   P   D   C   P   Y   Z]
 *          🔺                                                  high
 *          low
 *
 *          Let's start:
 *        →    arr[i], which is A, is less than Pivot('P') => Swap arr[i] and arr[lt]. Also, increment 'i' & 'lt'
 *              Resulting Array:
 *                  lt  i                                           gt
 *              [A  P   B   X   W   P   P   V   P   D   C   P   Y   Z]
 *                  🔺
 *
 *        →    Now, arr[i] is again less than Pivot => repeat above steps!
 *              Resulting Array:
 *                      lt  i                                       gt
 *              [A  B   P   X   W   P   P   V   P   D   C   P   Y   Z]
 *                      🔺
 *
 *        →    This time -> arr[i] > Pivot ==> swap arr[i] and arr[gt]. Decrement 'gt'.
 *              Resulting Array:
 *                      lt  i                                   gt
 *              [A  B   P   Z   W   P   P   V   P   D   C   P   Y   X]
 *                      🔺
 *
 *        →    Wait! arr[i], which is Z now, is again greater than Pivot.
 *              swap arr[i] and arr[gt]. Decrement 'gt'.
 *              Resulting Array:
 *                      lt  i                               gt
 *              [A  B   P   Y   W   P   P   V   P   D   C   P   Z   X]
 *                      🔺
 *
 *        →    Aah!😩 arr[i] is again greater than Pivot.
 *              swap arr[i] and arr[gt]. Decrement 'gt'.
 *              Resulting Array:
 *                      lt  i                           gt
 *              [A  B   P   P   W   P   P   V   P   D   C   Y   Z   X]
 *                      🔺
 *
 *        →    arr[i] is equal to Pivot => Increment 'i'. That's it! ✋🏼
 *              Resulting Array:
 *                      lt      i                       gt
 *              [A  B   P   P   W   P   P   V   P   D   C   Y   Z   X]
 *                      🔺
 *
 *        →    arr[i] > Pivot. What do we do? Swap arr[i] and arr[gt]. Also, decrement gt!
 *              Resulting Array:
 *                      lt      i                   gt
 *              [A  B   P   P   C   P   P   V   P   D   W   Y   Z   X]
 *                      🔺
 *
 *        →    Now, arr[i] is less than Pivot! => swap arr[i] and arr[lt]. Increment both 'i' & 'lt'
 *              Resulting Array:
 *                          lt      i               gt
 *              [A  B   C   P   P   P   P   V   P   D   W   Y   Z   X]
 *                          🔺
 *
 *        →    arr[i] is equal to Pivot! Increment 'i'! ✋🏼
 *              Resulting Array:
 *                          lt          i           gt
 *              [A  B   C   P   P   P   P   V   P   D   W   Y   Z   X]
 *                          🔺
 *
 *        →    Again, arr[i] is equal to Pivot! Increment 'i'! ✋🏼
 *              Resulting Array:
 *                          lt              i       gt
 *              [A  B   C   P   P   P   P   V   P   D   W   Y   Z   X]
 *                          🔺
 *
 *        →    arr[i], which is V, is greater than Pivot! => Swap arr[i] and arr[gt]. Also, decrement gt!
 *              Resulting Array:
 *                          lt              i   gt
 *              [A  B   C   P   P   P   P   D   P   V   W   Y   Z   X]
 *                          🔺
 *
 *        →   arr[i], which is D, is less than Pivot(P).
 *             swap arr[i] and arr[lt]. Increment both 'i' & 'lt'
 *             Resulting Array:
 *                              lt             i/gt
 *              [A  B   C   D   P   P   P   P   P   V   W   Y   Z   X]
 *                              🔺
 *
 *              Are we done with PARTITIONING? Hell YES! 💥🤓
 *              Because our pointers have crossed and we have seen everything in the array.
 *
 *              Notice ->
 *                  Everything to the left of 'lt' is less than Pivot.✅
 *                  Every item between lt & gt is equal to Pivot.✅
 *                  Every item to right of gt is greater than Pivot.✅
 *
 *              Yes! That's what we wanted. So, we are done with PARTITIONING.😅
 *
 *
 *              DO IT RECURSIVELY ON 2 HALVES (left and right) TO SORT THE ENTIRE ARRAY! 🕺🏻
 *
 *  Code? Check below!
 *  Complexity: N Log N when all distinct items. Linear when only a constant number of distinct keys!
 */

 class Quick {

     constructor (arr) {
         this.arr = arr
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

         let pivot = arr[low]
         let i = low
         let lt = low
         let gt = high

         // Partitioning logic
         // i <= gt basically check if our pointers have crossed!
         while (i <= gt) {
             if (arr[i] < pivot) {
                 this.exchange(lt++, i++)
             } else if (arr[i] > pivot) {
                 this.exchange(i, gt--)
             } else {
                 i++
             }
         }

         this.sort(low, lt - 1)
         this.sort(gt + 1, high)
     }
 }

 const arr = [0, 1, 0, 0, 1, 1, 0, 1, 2, 2, 1, 2, 0, 1, 1, 0, 2, 0, 0, 2, 2, 2, 0, 1, 1, 2, 0]
 const low = 0
 const high = arr.length - 1
 const quick = new Quick(arr)
 quick.sort(low, high)
