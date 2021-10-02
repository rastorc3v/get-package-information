import { exec, execSync } from "child_process";

/**
 * Asynchronously get object which the same as dependencies field
 * in package.json from provided package.
 * @param packageName
 * @return {Promise<{dependencyPackageName: version}>}
 */
export async function getDependencies(packageName) {
    return await npmInfo(packageName, ['dependencies']);
}

/**
 * Synchronously get object which the same as dependencies field
 * in package.json from provided package.
 * @param packageName
 * @return {{dependencyPackageName: version}}
 */
export function getDependenciesSync(packageName) {
    return npmInfoSync(packageName, ['dependencies']);
}

/**
 * Asynchronously get object which the same as devDependencies field
 * in package.json from provided package.
 * @param packageName
 * @return {Promise<{devDependencyPackageName: version}>}
 */
export async function getDevDependencies(packageName) {
    return await npmInfo(packageName, ['devDependencies']);
}

/**
 * Synchronously get object which the same as devDependencies field
 * in package.json from provided package.
 * @param packageName
 * @return {{devDependencyPackageName: version}}
 */
export function getDevDependenciesSync(packageName) {
    return npmInfoSync(packageName, ['devDependencies']);
}

/**
 * Asynchronously get object which contains devDependencies field
 * data concatenated with dependencies field data in package.json
 * from provided package.
 * @param packageName
 * @return {{dependencyPackageName: version}}
 */
export async function getAllDependencies(packageName) {
    return await npmInfo(packageName, ['devDependencies', 'dependencies']);
}

/**
 * Synchronously get object which contains devDependencies field
 * data concatenated with dependencies field data in package.json
 * from provided package.
 * @param packageName
 * @return {{dependencyPackageName: version}}
 */
export function getAllDependenciesSync(packageName) {
    return npmInfoSync(packageName, ['devDependencies', 'dependencies']);
}

/**
 * Asynchronously get data from specified field
 * or fields. If field data can be only object,
 * _isObject=true_ can be used to return parsed
 * data.
 * @param {string} packageName
 * @param {string[]} fields
 * @return {Promise<string | object>}
 */
export async function getFields(packageName, fields) {
    return await npmInfo(packageName, fields);
}

/**
 * Synchronously get data from specified field
 * or fields. If field data can be only object,
 * _isObject=true_ can be used to return parsed
 * data.
 * @param {string} packageName
 * @param {string[]} fields
 * @return {string | object}
 */
export function getFieldsSync(packageName, fields) {
    return npmInfoSync(packageName, fields);
}

async function npmInfo(packageName, fields=[]) {
    return new Promise(((resolve, reject) => {
        exec(`npm info ${packageName} ${fields.join(' ')} --json=true`, ((error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            if (stderr) {
                reject(stderr);
            }
            if (stdout) {
                resolve(JSON.parse(stdout));
            }
        }));
    }));
}

function npmInfoSync(packageName, fields=[]) {
    const stdout = execSync(`npm info ${packageName} ${fields.join(' ')} --json=true`).toString();
    return JSON.parse(stdout);
}
