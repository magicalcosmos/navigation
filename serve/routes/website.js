/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const Router = express.Router();
const fs = require('fs');
const path = require('path');
const UUID = require('uuid');
const ID = UUID.v1();
const { getWebsite, saveWebsite, getDic, saveDic } = require('../util/websiteutil');

// 引入解析包
const formidable = require('formidable');

// 写入数据
function writeJson(params) {
  fs.readFile(path.resolve(__dirname, '../website.json'), function(err, data) {
    if (err) {
      return console.error(new Date(), err);
    }
    let websiteData = data.toString(); //将二进制的数据转换为字符串
    websiteData = JSON.parse(websiteData); //将字符串转换为json对象
    websiteData.data.push(params); //将传来的对象push进数组对象中
    websiteData.total = websiteData.data.length; //定义一下总条数，为以后的分页打基础
    const str = JSON.stringify(websiteData); //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile(path.resolve(__dirname, '../website.json'), str, function(err) {
      if (err) {
        console.error(err);
      }
    });
  });
}

// 编辑数据
function editJson(inx, params) {
  fs.readFile(path.resolve(__dirname, '../website.json'), function(err, data) {
    if (err) {
      return console.error(new Date(), err);
    }
    let websiteData = data.toString(); //将二进制的数据转换为字符串
    websiteData = JSON.parse(websiteData); //将字符串转换为json对象
    websiteData.data.splice(inx, 1, params); //将传来的对象push进数组对象中
    websiteData.total = websiteData.data.length; //定义一下总条数，为以后的分页打基础
    const str = JSON.stringify(websiteData); //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile(path.resolve(__dirname, '../website.json'), str, function(err) {
      if (err) {
        console.error(err);
      }
    });
  });
}

// 删除数据
function deleteJson(inx) {
  fs.readFile(path.resolve(__dirname, '../website.json'), function(err, data) {
    if (err) {
      return console.error(new Date(), err);
    }
    let websiteData = data.toString(); //将二进制的数据转换为字符串
    websiteData = JSON.parse(websiteData); //将字符串转换为json对象
    websiteData.data.splice(inx, 1); //将传来的对象push进数组对象中
    websiteData.total = websiteData.data.length; //定义一下总条数，为以后的分页打基础
    const str = JSON.stringify(websiteData); //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile(path.resolve(__dirname, '../website.json'), str, function(err) {
      if (err) {
        console.error(err);
      }
    });
  });
}

Router.post('/add', function(req, res) {
  const params = {
    name: req.body.name,
    url: req.body.url,
    type: req.body.type,
    imageUrl: req.body.imageUrl
  };
  writeJson(params);
  return res.json({ code: 1, msg: '添加成功' });
});

Router.post('/get', function(req, res) {
  fs.readFile(path.resolve(__dirname, '../website.json'), function(err, data) {
    if (err) {
      return console.error(err);
    }
    let websiteData = data.toString(); //将二进制的数据转换为字符串
    websiteData = JSON.parse(websiteData); //将字符串转换为json对象
    websiteData.data = websiteData.data.filter(item => {
      return item.type !== 5;
    });
    return res.json({ code: 1, msg: websiteData });
  });
});

Router.post('/delete', function(req, res) {
  deleteJson(req.body.inx);
  return res.json({ code: 1, msg: '删除成功' });
});

Router.post('/edit', function(req, res) {
  const params = {
    name: req.body.name,
    url: req.body.url,
    type: req.body.type,
    imageUrl: req.body.imageUrl
  };
  editJson(req.body.inx, params);
  return res.json({ code: 1, msg: '编辑成功' });
});

Router.post('/upload', function(req, res) {
  const form = formidable({ multiples: true });
  form.parse(req, function(error, fields, files) {
    res.writeHead(200, { 'content-type': 'application/json' });
try {
    fs.writeFileSync('./common/' + files.file.name, fs.readFileSync(files.file.path));
} catch(e){
console.log(e);
console.log(123)
}
    res.end(JSON.stringify({ fields, files }, null, 2));
  });
});

/**
 * 添加工具列表
 */
Router.post('/addData', async function(req, res) {
  try {
    // 获取请求参数
    const params = req.body;
    // 主键
    params.id = ID;
    const websiteData = await getWebsite();
    websiteData.data.push(params); //将传来的对象push进数组对象中
    websiteData.total = websiteData.data.length; //定义一下总条数，为以后的分页打基础
    await saveWebsite(websiteData);
    res.json({ code: 1, msg: '添加成功' });
  } catch (error) {
    res.json({
      code: 0,
      msg: error.message
    });
  }
});
/**
 * 获取工具列表
 */
Router.get('/getData/:type', async function(req, res) {
  try {
    // 获取参数
    const type = Number.parseInt(req.params.type);
    const websiteData = await getWebsite();
    const data = websiteData.data.filter(item => item.type === type);
    res.json({ code: 1, msg: '获取数据成功', data: data });
  } catch (error) {
    res.json({
      code: 0,
      msg: error.message
    });
  }
});
/**
 * 更新工具列表
 */
Router.post('/updateData', async function(req, res) {
  try {
    // 获取请求参数
    const params = req.body;
    const websiteData = await getWebsite();
    const index = websiteData.data.findIndex(item => item.id === params.id);
    websiteData.data.splice(index, 1, params);
    websiteData.total = websiteData.data.length; //定义一下总条数，为以后的分页打基础
    await saveWebsite(websiteData);
    res.json({ code: 1, msg: '编辑成功' });
  } catch (error) {
    res.json({
      code: 0,
      msg: error.message
    });
  }
});
/**
 * 删除工具列表
 */
Router.delete('/deleteData/:id', async function(req, res) {
  try {
    // 获取请求参数
    const id = req.params.id;
    const websiteData = await getWebsite();
    const index = websiteData.data.findIndex(item => item.id === id);
    if (index === -1) {
      return res.status(404).end();
    }
    websiteData.data.splice(index, 1);
    websiteData.total = websiteData.data.length; //定义一下总条数，为以后的分页打基础
    await saveWebsite(websiteData);
    res.json({ code: 1, msg: '删除成功' });
  } catch (error) {
    res.json({
      code: 0,
      msg: error.message
    });
  }
});

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
