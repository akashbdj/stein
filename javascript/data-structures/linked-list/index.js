class Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.length = 0
    }

    insertBegin(value) {
        let node = new Node(value)

        if (!this.head) {
            this.head = node
        } else {
            node.next = this.head
            this.head = node
        }
    }

    insertAtIndex(index, value) {
        let node = new Node(value)
        for (let i = 0; i <= index; i++) {}
    }
}
