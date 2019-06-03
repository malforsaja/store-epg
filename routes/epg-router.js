const express = require('express');
const router = express.Router();
const Epg = require('../models/epg-model');
const fs = require('fs');
const xml2js = require('xml2js');

function readFile(pathFile) {
  return new Promise((resolve, reject) => {
    let parser = new xml2js.Parser();
    fs.readFile(pathFile, (err, data) => {
      if (err) {
        console.log('read err: ', err);
        reject(err);
      }
      parser.parseString(data, (err, epgData) => {
        if (err) {
          console.log('parse err: ', err);
          reject(err);
        }

        let createObject = epgData.tv.programme.map(item => {
          return {
            tv_source_info_url: epgData.tv.$["source-info-url"],
            tv_source_info_name: epgData.tv.$["source-info-name"],
            tv_generator_info_name: epgData.tv.$["generator-info-name"],
            tv_generator_info_url: epgData.tv.$["generator-info-url"],
            channel_id: epgData.tv.channel[0].$.id,
            channel_display_name: epgData.tv.channel[0]["display-name"][0]._,
            programme_start: item.$.start,
            programme_stop: item.$.stop,
            programme_title: item.title[0]._,
            programme_title_lang: item.title[0].$.lang,
            programme_desc:  item.desc[0]._,
            programme_desc_lang: item.desc[0].$.lang,
          }
        })
        Epg.bulkCreate(createObject).then((data) => {
          resolve(data)
        }).catch(err => {
          console.log('Problem during the save on db: ', err);          
          reject(err);
        });
      });
    });
  })
}

router.get('/xml', (req, res) => {
  let parser = new xml2js.Parser(/* {attrkey: false} */);
  fs.readFile(__dirname + '../../assets/epg_sample_1.xml', (err, data) => {
    if (err) {
      console.log('read err: ', err);
    }
    parser.parseString(data, function (err, epgData) {
      if (err) {
        console.log('parse err: ', err);
      }
      console.log('name: ', epgData.tv.channel[0].$.id);

      res.send(epgData);
      Epg.create({
        tv_source_info_url: epgData.tv.$["source-info-url"],
        tv_source_info_name: epgData.tv.$["source-info-name"],
        tv_generator_info_name: epgData.tv.$["generator-info-name"],
        tv_generator_info_url: epgData.tv.$["generator-info-url"],
        channel_id: epgData.tv.channel[0].$.id,
        channel_display_name: epgData.tv.channel[0]["display-name"][0]._
      }).then((epg) => {
        console.log('epg stored: ');
      }).catch((err) => {
        console.log('Failed to add epg data: ', err);
      })
      console.log('Done');
    });
  });
});

// File upload and adding epg data
router.post('/upload', async (req, res) => {
  try {
    if (!req.files) {
      // return res.send({
      //   message: 'No file uploaded'
      // });
      return res.render('error');
    }

    if (req.files.epgFile.mimetype !== "text/xml") {
      // return res.send({
      //   message: 'Choose an xml file'
      // });
      return res.render('error');
    }

    //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
    let epgFile = req.files.epgFile;

    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    epgFile.mv(__dirname + `../../assets/${epgFile.name}`, async (err) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        let data = await readFile(__dirname + `../../assets/${epgFile.name}`);
        if (!data) {
          return res.render('error');
        }
        res.render('success');
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;