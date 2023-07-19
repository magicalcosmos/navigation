/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const dicPath = path.join(__dirname, '../dict.json');
const websitePath = path.join(__dirname, '../website.json');

/**
 * 从website.json中读取数据
 * @returns
 */
exports.getWebsite = async () => {
  const data = await readFile(websitePath);
  return JSON.parse(data);
};

/**
 * 往website.json中写入数据
 * @param {Object} data
 */
exports.saveWebsite = async data => {
  const dataStr = JSON.stringify(data);
  await writeFile(websitePath, dataStr);
};

/**
 * 从dict.json中读取数据
 * @returns
 */
exports.getDic = async () => {
  const data = await readFile(dicPath);
  return JSON.parse(data);
};

/**
 * 往dict.json中写入数据
 * @param {Object} data
 */
exports.saveDic = async data => {
  const dataStr = JSON.stringify(data);
  await writeFile(dicPath, dataStr);
};
