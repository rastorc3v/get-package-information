import { checkCase } from './case.js';
import {
    getDependenciesSync,
    getDevDependenciesSync,
    getAllDependenciesSync
} from "../tools/common.js";

checkCase('Sum of dependencies and devDependencies should be equal all dependencies', () => {
    const devDependenciesCount = Object.keys(getDevDependenciesSync('webpack')).length;
    const dependenciesCount = Object.keys(getDependenciesSync('webpack')).length;
    const allDependenciesCount = Object.keys(getAllDependenciesSync('webpack')).length;
    return devDependenciesCount + dependenciesCount === allDependenciesCount;
});
