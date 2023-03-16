import pbts from '@pbts/core';
import protobuf from 'protobufjs';
import { join } from 'path';
import { writeFileSync } from 'node:fs';


const main = () => {

  const args = process.argv.slice(2).map((item) => item.split('='));
  const params = {};
  args.forEach(([key, value]) => params[key] = value);
  console.log('handle params', params, args);

  const filename = params.root;
  const root = protobuf.loadSync(filename.split('/'));
  const definition = pbts.parseProtoRoot(root, { isParamOptional: true });
  writeFileSync(params.output, definition);
  console.log(`[Success] "${params.output}" is converted successfully`);
};

main();