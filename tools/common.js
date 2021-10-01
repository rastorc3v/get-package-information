import { exec, execSync } from "child_process";
import parseOutput from "./outputParser.js";

/**
 * Asynchronously get object which the same as dependencies field
 * in package.json from provided package.
 * @param packageName
 * @return {Promise<{dependencyPackageName: version}>}
 */
export async function getDependencies(packageName) {
    return await npmInfo(packageName, ['dependencies'], true);
}

/**
 * Synchronously get object which the same as dependencies field
 * in package.json from provided package.
 * @param packageName
 * @return {{dependencyPackageName: version}}
 */
export function getDependenciesSync(packageName) {
    return npmInfoSync(packageName, ['dependencies'],true);
}

/**
 * Asynchronously get object which the same as devDependencies field
 * in package.json from provided package.
 * @param packageName
 * @return {Promise<{devDependencyPackageName: version}>}
 */
export async function getDevDependencies(packageName) {
    return await npmInfo(packageName, ['devDependencies'], true);
}

/**
 * Synchronously get object which the same as devDependencies field
 * in package.json from provided package.
 * @param packageName
 * @return {{devDependencyPackageName: version}}
 */
export function getDevDependenciesSync(packageName) {
    return npmInfoSync(packageName, ['devDependencies'], true);
}

/**
 * Asynchronously get object which contains devDependencies field
 * data concatenated with dependencies field data in package.json
 * from provided package.
 * @param packageName
 * @return {{dependencyPackageName: version}}
 */
export async function getAllDependencies(packageName) {
    return await npmInfo(packageName, ['devDependencies', 'dependencies'], true);
}

/**
 * Synchronously get object which contains devDependencies field
 * data concatenated with dependencies field data in package.json
 * from provided package.
 * @param packageName
 * @return {{dependencyPackageName: version}}
 */
export function getAllDependenciesSync(packageName) {
    return npmInfoSync(packageName, ['devDependencies', 'dependencies'], true);
}

async function npmInfo(packageName, fields=[], isJSON=false) {
    return new Promise(((resolve, reject) => {
        exec(`npm info ${packageName} ${fields.join(' ')}`, ((error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            if (stderr) {
                reject(stderr);
            }
            if (stdout) {
                resolve(isJSON ? parseOutput(stdout) : stdout);
            }
        }));
    }));
}

function npmInfoSync(packageName, fields=[], isJSON=false) {
    const stdout = execSync(`npm info ${packageName} ${fields.join(' ')}`).toString();
    return isJSON ? parseOutput(stdout) : stdout;
}
