(function () {
    function sumMatrix(matrix: number[][]) {
        let sum = 0;
        for (let i = 0; i < matrix.length; i++) {
            let currentRow = matrix[i];
            for (let i = 0; i < currentRow.length; i++) {
                sum += currentRow[i];
            }
        }
        return sum;
    }
    let arr: number[][] = [[1, 2, 3], [1, 2, 3]];
    let result = sumMatrix(arr);
    console.log(result);
})();