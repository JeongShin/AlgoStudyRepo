const minPathSum = function (grid) {
    const col = grid.length, row = grid[0].length;
    const dp = grid.map((v, i) => i === 0 ? v : v.map((v, i) => i === 0 ? v : 0));
    let [i, j] = [0, 0];


    for (i = 0; i < col; i++) {
        for (j = 0; j < row; j++) {
            if (i === 0 && j === 0)
                continue;

            let up;
            if ( (up = (dp[i - 1] || [])[j]) === undefined)
                up = Infinity;

            let left;
            if ((left = dp[i][j - 1]) === undefined)
                left = Infinity;

            dp [i][j] = Math.min(left, up) + grid[i][j];
        }
    }
    return dp[col - 1][row - 1]
}

minPathSum([[0,0],[0,0]])

const minPathSum2 = function (grid) {
    // Get the two dimensions of the grid
    const n = grid.length;
    const m = grid[0].length;

    // Calculate the distance travelled within the first column
    // This is because each square depends on the one above
    // And the one to the left. However there is nothing left
    // of the first column so we can calculate it by adding
    // the current square to the square above it
    for (let i = 1; i < n; i++) {
        grid[i][0] += grid[i - 1][0];
    }

    // The same goes for the first row. There is nothing above the
    // first row. So we just calculate the distance by what is to the left
    // of it
    for (let j = 1; j < m; j++) {
        grid[0][j] += grid[0][j - 1];
    }

    // Start one row and one column in because we've precomputed
    // those above
    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
            // The distance to the grid at i,j is equal to itself plus the minimum
            // of the two grid spaces (one above, one to the left)
            grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
        }
    }

    // Return the distance bottom right corner
    return grid[n - 1][m - 1];
};