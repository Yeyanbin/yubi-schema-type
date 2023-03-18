import fs from 'node:fs';

export const editFile = (file, callback) => {
  const content = fs.readFileSync(file, 'utf-8');
  fs.writeFileSync(file, callback(content), 'utf-8');
};

export const createFile = (dirName, fileName, content) => {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }
  fs.writeFileSync(`${dirName}/${fileName}`, content, {
    encoding: 'utf-8'
  });
};

export const createFileByDirList = (dirList, fileName, content) => {
  let base = '';
  dirList.forEach((dirName) => {
    // console.log(base + dirName)
    if (!fs.existsSync(base + dirName)) {
      fs.mkdirSync(base + dirName);
    }
    base = base + dirName + '/'
  })

  fs.writeFileSync(`${dirList.join('/')}/${fileName}`, content, {
    encoding: 'utf-8'
  });
};

export const getUpperProjectName = projectName => projectName.slice(0, 1).toUpperCase() + projectName.slice(1);

const defaultBaseFramework = 'base';
const defaultTemplateSrc = './_templates';

export const readTemplate = (framework, templateName, { templateSrc, baseFramework } = {}) => {
  if (fs.existsSync(`${templateSrc ?? defaultTemplateSrc}/${framework}/${templateName}`)) {
    return fs.readFileSync(`${templateSrc ?? defaultTemplateSrc}/${framework}/${templateName}`, 'utf-8');
  }
  return fs.readFileSync(`${templateSrc ?? defaultTemplateSrc}/${baseFramework ?? defaultBaseFramework}/${templateName}`, 'utf-8');
};

export const search = ({ fileName, root }, fileCallback) => {

  const dirList = [];

  const searchFileList = ({
    fileName,
    root,
    level,
  }) => {
    // console.log('fileName', fileName, root)
    const newFilePath = `${root}/${fileName}`;
    const stat = fs.statSync(newFilePath);

    if (stat.isDirectory()) {
      dirList[level] = fileName;
      fs.readdirSync(newFilePath).map((fileName) => ({
        fileName,
        root: newFilePath,
        level: level + 1,
      })).forEach(searchFileList);
    } else {
      fileCallback({
        filePath: newFilePath,
        fileName,
        root,
        stat,
        dirList: dirList.slice(0, level + 1),
      });
    }
  }
  searchFileList({ fileName, root, level: 0 })
}