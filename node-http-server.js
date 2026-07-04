#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 8080

const connect = require('connect')
const serveStatic = require('serve-static')

const distDir = path.join(__dirname, 'dist')
const staticRoot = fs.existsSync(distDir) ? distDir : __dirname
const indexFile = path.join(staticRoot, 'index.html')

connect()
  .use(serveStatic(staticRoot))
  .use((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.statusCode = 405
      res.end()
      return
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    fs.createReadStream(indexFile).pipe(res)
  })
  .listen(PORT, () => {
    console.log('Running on port: ' + PORT)
    console.log('Serving from: ' + staticRoot)
  })
