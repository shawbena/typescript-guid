(function () {
    function sumMatrix(matrix) {
        var sum = 0;
        for (var i = 0; i < matrix.length; i++) {
            var currentRow = matrix[i];
            for (var i_1 = 0; i_1 < currentRow.length; i_1++) {
                sum += currentRow[i_1];
            }
        }
        return sum;
    }
    var arr = [[1, 2, 3], [1, 2, 3]];
    var result = sumMatrix(arr);
    console.log(result);
})();
