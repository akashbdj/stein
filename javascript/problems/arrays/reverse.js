function reverse(arr = [], count) {
    if (count === len) return arr

    let current = arr[count]

    count++
    reverse(arr, count)
    arr[len - 1 - (count - 1)] = current
    return arr
}

let arr = [22, 11, 20, 76, 123, 70]
let len = (arr && arr.length) || 0

let reversedArray = reverse(arr, (count = 0))
console.log('Reversed Array => ', reversedArray)
