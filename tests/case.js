const green = "\x1b[32m"
const red = "\x1b[31m"
const reset = "\x1b[0m"

/**
 * Check if callback returns true
 * @param {string} caseName
 * @param {function} cb
 * @return {Promise<void>}
 */
export async function checkCase(caseName, cb) {
    console.log(caseName);
    console.time('Elapsed time');
    if (cb()) {
        console.log(green + '✓ passed' + reset)
    } else {
        console.log(red + '✘ not passed' + reset);
        console.timeEnd('Elapsed time')
        process.exit(-1)
    }
    console.timeEnd('Elapsed time')
}
