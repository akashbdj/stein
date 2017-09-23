/**
 *  Priority Queue:
 *      Priority Queue is an extension of queue with following properties.
 *          1) Every item has a priority associated with it.
 *          2) An element with high priority is dequeued before an element with low priority.
 *          3) If two elements have the same priority, they are served according to their order in the queue.
 *
 *      A typical priority queue supports following operations.
 *          ➤ insert(item, priority): Inserts an item with given priority.
 *          ➤ getHighestPriority(): Returns the highest priority item.
 *          ➤ deleteHighestPriority(): Removes the highest priority item.
 *
 *      Applications of Priority Queue:
 *          1) CPU Scheduling
 *          2) Graph algorithms like Dijkstra’s shortest path algorithm, Prim’s Minimum Spanning Tree, etc
 *          3) All queue applications where priority is involved.
 *          4) Data Compression (Huffman codes)
 *          5) Find the largest M items in a stream of N items.
 *
 *      Ways to implement Priority Queue
 *          ➤ Arrays - Insertion and Deletion is expensive in order to maintain the priority.
 *          ➤ LinkedList -> Same as array. But deletion is fast.
 *          ➤ Binary Heap -> Best
 *
 */
