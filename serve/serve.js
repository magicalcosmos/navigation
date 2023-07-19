/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const { host, port, prefixPath } = require('./config/config.default');

const app = express();
app.use('/', express.static(path.join(__dirname, '/common')));
app.use(cookieParser());
app.use(express.json());

//设置允许跨域访问该服务.
app.use(cors());

// 各个模块router中中间件的用法
app.use(prefixPath, require('./routes/index'));

app.listen(port, function() {
  console.debug(`Started server at http://${host}:${port}`);
});
