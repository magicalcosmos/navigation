/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const Router = express.Router();
const { getDic, saveDic } = require('../util/websiteutil');

/**
 * 获取字典
 */
Router.get('/getDic', async (req, res) => {
  try {
    // 获取查询参数
    const field = req.query.field;

    const dicData = await getDic();

    const data = dicData.data.filter(item => item.field === field);

    res.json({ code: 1, msg: '获取数据成功', data: data });
  } catch (error) {
    res.json({
      code: 0,
      msg: error.message
    });
  }
});

/**
 * 字典value值
 * @param {Array} dicData
 * @param {Object} params
 * @returns
 */
function getValue(dicData, params) {
  if (!dicData) {
    throw new Error('dicData is not found');
  }
  let maxValue = 1;
  const newArrs = dicData.data.filter(item => item.field === params.field);
  if (newArrs.length > 0) {
    const arrValues = newArrs.map(item => Number.parseInt(item.value));
    maxValue = Math.max(...arrValues) + 1;
  }
  return maxValue;
}

/**
 * 新增字典
 */
Router.post('/addDic', async function(req, res) {
  try {
    // 获取请求参数
    const params = req.body;
    const dicData = await getDic();
    params.value = getValue(dicData, params);
    dicData.data.push(params); //将传来的对象push进数组对象中
    dicData.total = dicData.data.length; //定义一下总条数，为以后的分页打基础
    await saveDic(dicData);
    res.json({ code: 1, msg: '添加成功' });
  } catch (error) {
    res.json({
      code: 0,
      msg: error.message
    });
  }
});

module.exports = Router;
