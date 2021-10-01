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

/**
 * Asynchronously get data from specified field
 * or fields. If field data can be only object,
 * _isObject=true_ can be used to return parsed
 * data.
 * @param {string} packageName
 * @param {string[]} fields
 * @param {boolean} isObject
 * @return {Promise<string | object>}
 */
export async function getFields(packageName, fields, isObject=false) {
    return await npmInfo(packageName, fields, isObject);
}

/**
 * Synchronously get data from specified field
 * or fields. If field data can be only object,
 * _isObject=true_ can be used to return parsed
 * data.
 * @param {string} packageName
 * @param {string[]} fields
 * @param {boolean} isObject
 * @return {string | object}
 */
export function getFieldsSync(packageName, fields, isObject=false) {
    return npmInfoSync(packageName, fields, isObject);
}

async function npmInfo(packageName, fields=[], isObject=false) {
    return new Promise(((resolve, reject) => {
        exec(`npm info ${packageName} ${fields.join(' ')}`, ((error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            if (stderr) {
                reject(stderr);
            }
            if (stdout) {
                resolve(isObject ? parseOutput(stdout) : stdout);
            }
        }));
    }));
}

function npmInfoSync(packageName, fields=[], isObject=false) {
    const stdout = execSync(`npm info ${packageName} ${fields.join(' ')}`).toString();
    return isObject ? parseOutput(stdout) : stdout;
}
