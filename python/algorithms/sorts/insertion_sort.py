# Insertion Sort
def insertion_sort(arr):
	for i in range(0,len(arr)):
		temp = arr[i]
		j = i-1
		while j>=0 and arr[j]>temp:
			arr[j+1] = arr[j]
			j-=1
		arr[j+1] = temp
	print ("Sorted array: ",arr)

arr = [2, 6, 1, 3, 4, 10]
insertion_sort(arr)