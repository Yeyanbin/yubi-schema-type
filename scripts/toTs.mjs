import pbts from '@pbts/core';
import protobuf from 'protobufjs';
import { search, createFileByDirList } from './utils/fsUtils.mjs';


const main = () => {

  const args = process.argv.slice(2).map((item) => item.split('='));
  const params = {};
  args.forEach(([key, value]) => params[key] = value);
  // console.log('handle params', params, args);
  console.log('Start proto to typescript...')

  const rootPath = params.root.split('/');
  const fileName = rootPath.pop();
  const output = params.output;

  search({
    fileName:   fileName || params.root,
    root: rootPath.join('/') || ''
  }, ({
    filePath,
    fileName,
    root,
    dirList,
    stat
  }) => {
    console.log(`-------find proto file: ${filePath}------`)
    // console.log('filePath', filePath);
    // console.log('fileName', fileName);
    // console.log('root', root);
    // console.log('dirList', dirList);
    // console.log('file stat', stat);

    const newFileName = `${fileName.split('.')[0]}.ts`;
    const newDir = [output, ...dirList.slice(1)];
    const pbLoad = protobuf.loadSync(filePath);
    const pdContent = pbts.parseProtoRoot(pbLoad, { isParamOptional: true });

    console.log(`[parse] file: ${newDir.join('/')}/${newFileName}`)
    createFileByDirList(newDir, newFileName, pdContent);
    console.log(`[Success] "${newDir.join('/')}/${newFileName}" is converted successfully`);
  })
};

main();