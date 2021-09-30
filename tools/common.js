import { exec, execSync } from "child_process";

export async function getDependencies(packageName) {
    return await npmInfo(packageName, ['dependencies']);
}

export function getDependenciesSync(packageName) {
    return npmInfoSync(packageName, ['dependencies']);
}

export async function getDevDependencies(packageName) {
    return await npmInfo(packageName, ['devDependencies']);
}

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
                resolve(stdout);
            }
        }));
    }));
}

function npmInfoSync(packageName, fields=[]) {
    return parseOutput(execSync(`npm info ${packageName} ${fields.join(' ')}`).toString());
}
