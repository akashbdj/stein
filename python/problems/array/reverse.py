def reversed_arr(arr,count):
	if count==len(arr):
		return arr
	temp = arr[count]
	count += 1
	reversed_arr(arr,count)
	arr[len(arr) - 1 - (count - 1)] = temp
	return arr

arr = [22, 11, 20, 76, 123, 70]
count=0
print ("Reversed array: ",reversed_arr(arr,count))