
import fs from 'node:fs';
import { search } from './utils/fsUtils.mjs';

search({
    fileName: 'protos', 
    root: '.'
}, ({
    filePath,
    fileName,
    root,
    dirList,
}) => {
    console.log('filePath', filePath);
    console.log('fileName', fileName);
    console.log('root', root);
    console.log('dirList', dirList);
})