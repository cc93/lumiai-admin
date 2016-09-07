/**
 * Created by congcong on 16/8/27.
 */

//快速排序
function quickSort(arr) {
    const MAX_LENGTH_INSERT_SORT = 7;
    if(arr.length > MAX_LENGTH_INSERT_SORT){
        qSort(arr, 1, arr.length - 1);
    }else{
        insertSort(arr);
    }
    function qSort(arr, low, high) {
        var pivot;
        while (low < high) {
            //选取,平分
            pivot = partition(arr, low, high);
            //分别对低分区、高分区进行qSort
            qSort(arr, low, pivot - 1);
            low = pivot + 1;
        }
    }
    function getPivotkey(arr,low,high){
        var middle = Math.floor(low + (high - low) / 2);
        if (arr[low] > arr[high]) {
            //l > h
            swap(arr, low, high);
            //l < h
        }
        if (arr[middle] > arr[high]) {
            //middle > h
            swap(arr, middle, high);
            //middle < h
        }
        //这样保证了最右端是最大的
        if (arr[low] < arr[middle]) {
            //low < middle
            swap(arr, low, middle);
            //low > middle
        }
        //这样保证了最左边等脚标为中间值
        //取中间值,以上是三数取中法
        return arr[low];

    }
    function partition(arr, low, high) {
        //选取
        //var pivotkey = arr[low];
        var pivotkey = getPivotkey(arr,low,high);
        arr[0] = pivotkey;
        while (low < high) {
            //数组两边向中间检测和交换
            while (low < high && arr[high] >= pivotkey) {
                high--;
            }
            //swap(arr, low, high);
            arr[low] = arr[high];
            while (low < high && arr[low] <= pivotkey) {
                low++;
            }
            //swap(arr, low, high);
            arr[high] = arr[low];
        }
        arr[low] = arr[0];
        return low;
    }

    function swap(arr, low, high) {
        var t = arr[low];
        arr[low] = arr[high];
        arr[high] = t;
    }
}

//直接插入排序(插牌)
function insertSort(arr){
    for(i=2;i<=arr.length;i++){
        if(arr[i-1]>arr[i]){
            //存小的
            arr[0] = arr[i];
            for(j=i-1;arr[j]>arr[0];j--){
                arr[j+1] = arr[j];
            }
            arr[j+1] = arr[0];
        }
    }
}


//9 numbers to be sorted, arr.length = 10
var arr = [0, 50, 10, 90, 30, 70, 40, 80, 60, 20];
var arr2 = [0, 9, 1, 5, 8, 3, 7, 4, 6, 2,11];
arr2.sort(function(a,b){return b-a;});
console.log('arr2 = ' + arr2);