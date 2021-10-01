export default function parseOutput(cmdOutput) {
    const packageNames = [],
        packageVersions = [];
    for (let packageName of cmdOutput.matchAll(/(.+):\s/g)) {
        packageNames.push(packageName[1].replace('\'', '').replace('\'', ''));
    }
    for (let packageVersion of cmdOutput.matchAll(/:\s'(.+)'/g)) {
        packageVersions.push(packageVersion[1]);
    }
    return JSON.parse(packageNames.reduce((result, packageName, idx) => {
        return result + `${idx === 0 ? '' : ','}\n"${packageName.trim()}": "${packageVersions[idx]}"`
    }, "{") + "}");
}
