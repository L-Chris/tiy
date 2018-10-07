const fs = require('fs')
const glob = require('glob')
const path = require('path')

const requireRealpath = _ => require(fs.realpathSync(_))

const getConfig = () => {
  let userConfig = fs.existsSync('config/index.js') ? requireRealpath('config/index.js') : {}
  let defaultConfig = require('./config')
  const config = Object.assign({}, defaultConfig, userConfig)
  return config
}

const config = getConfig()

exports.getConfig = getConfig

exports.getDB = () => {
  const mysql = require('mysql2/promise')

  const pool = mysql.createPool(config.database)

  return pool
}

exports.getTables = () => requireRealpath(config.tablesPath)

exports.getServices = () => {
  return glob.sync(`${config.servicesPath}/*.js`, { absolute: true })
    .map(_ => ({
      name: path.basename(_, '.js').toLowerCase(),
      path: _
    }))
}

exports.getControllers = () => {
  return glob.sync(`${config.controllersPath}/*.js`, { absolute: true })
    .map(_ => ({
      name: path.basename(_, '.js').toLowerCase(),
      path: _
    }))
}

exports.getRoutes = () => {
  return glob.sync(`${config.routesPath}/*.js`, { absolute: true })
    .map(_ => ({
      baseURL: `/${path.basename(_, '.js')}`,
      path: _
    }))
}