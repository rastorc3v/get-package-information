import { exec, execSync } from "child_process";
import parseOutput from "./outputParser.js";

/**
 * Asynchronously get object which the same as dependencies field
 * in package.json from provided package
 * @param packageName
 * @return {Promise<{dependencyPackageName: version}>}
 */
export async function getDependencies(packageName) {
    return await npmInfo(packageName, ['dependencies']);
}

/**
 * Synchronously get object which the same as dependencies field
 * in package.json from provided package
 * @param packageName
 * @return {{dependencyPackageName: version}}
 */
export function getDependenciesSync(packageName) {
    return npmInfoSync(packageName, ['dependencies']);
}

/**
 * Asynchronously get object which the same as devDependencies field
 * in package.json from provided package
 * @param packageName
 * @return {Promise<{devDependencyPackageName: version}>}
 */
export async function getDevDependencies(packageName) {
    return await npmInfo(packageName, ['devDependencies']);
}

/**
 * Synchronously get object which the same as devDependencies field
 * in package.json from provided package
 * @param packageName
 * @return {{devDependencyPackageName: version}}
 */
export function getDevDependenciesSync(packageName) {
    return npmInfoSync(packageName, ['devDependencies']);
}

async function npmInfo(packageName, fields=[]) {
    return new Promise(((resolve, reject) => {
        exec(`npm info ${packageName} ${fields.join(' ')}`, ((error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            if (stderr) {
                reject(stderr);
            }
            if (stdout) {
                resolve(parseOutput(stdout));
            }
        }));
    }));
}

function npmInfoSync(packageName, fields=[]) {
    return parseOutput(execSync(`npm info ${packageName} ${fields.join(' ')}`).toString());
}
