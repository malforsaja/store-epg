const Sequelize = require('sequelize');
const db = require('../config/database');

const Epg = db.define('epg', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tv_source_info_url: {
    type: Sequelize.STRING
  },
  tv_source_info_name: {
    type: Sequelize.STRING
  },
  tv_generator_info_name: {
    type: Sequelize.STRING
  },
  tv_generator_info_url: {
    type: Sequelize.STRING
  },
  channel_id: {
    type: Sequelize.STRING
  },
  channel_display_name: {
    type: Sequelize.STRING
  },
  programme_start: {
    type: Sequelize.STRING
  },
  programme_stop: {
    type: Sequelize.STRING
  },
  programme_title: {
    type: Sequelize.STRING
  },
  programme_title_lang: {
    type: Sequelize.STRING
  },
  programme_desc: {
    type: Sequelize.STRING
  },
  programme_desc_lang: {
    type: Sequelize.STRING
  }
}, {
    tableName: 'epg',
    timestamps: false,
  })

module.exports = Epg;