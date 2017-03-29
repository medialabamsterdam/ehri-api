'use strict'

/**
 * FileController
 *
 */

const fs = require('fs')
const mime = require('mime')
const path = require('path')
const uuid = require('node-uuid').v4;

module.exports = {
  index(req, res) {
    File
      .find()
      .then(files => {
        if(!files || !Array.isArray(files)) {
          throw new sails.ServerError('Invalid response from ORM')
        }
        res.success(files)
      })
      .catch(err => {
        sails.log.error(`[FileController.download] Error: ${err.message}`)
        res.error(err)
      });
  },
  create(req, res) {
    /*const ext = mime.extension(req.headers['content-type'])
    const filename = req.headers['x-file-name'] || `F${Date.now()}.${ext}`
    sails.log.debug('**** ' + filename)
    const stream = fs.createWriteStream(path.join(__dirname, '../../uploads', filename))*/

    req.file('file').upload(function (err, uploadedFiles) {
      if(err) {
        return res.error(new sails.ServerError(err.message));
      }

      if(uploadedFiles.length === 0) {
        return res.error(new sails.RequestError('No files uploaded'))
      }

      let file = uploadedFiles[0];

      File
        .create({
          localPath: file.fd,
          size: file.size,
          mimeType: file.type,
          name: file.filename,
          key: uuid()
        })
        .then(createdFile => {
          if(!createdFile || typeof createdFile !== 'object') {
            throw new sails.ServerError('Invalid response from ORM')
          }
          res.success(createdFile)
        })
        .catch(err => {
          sails.log.error(`[FileController.create] Error: ${err.message}`)
          res.error(err)
        })
    });
  },

  show(req, res) {
    File
      .findOne(req.param('id'))
      .then(file => {
        if(!file || typeof file !== 'object') {
          throw new sails.NotFoundError('File doesn\'t exist')
        }
        res.success(file)
      })
      .catch(err => {
        sails.log.error(`[FileController.download] Error: ${err.message}`)
        res.error(err)
      });
  },

  download(req, res) {
    File
      .findOne(req.param('id'))
      .then(file => {
        if(!file || typeof file !== 'object') {
          throw new sails.NotFoundError('File doesn\'t exist')
        }

        res.set('Content-Type', file.mimeType)
        fs.createReadStream(file.localPath).pipe(res)
      })
      .catch(err => {
        sails.log.error(`[FileController.download] Error: ${err.message}`)
        res.error(err)
      });
  },

  destroy(req, res) {
    File
      .destroy(req.param('id'))
      .then(destroyedFiles => {
        if(!Array.isArray(destroyedFiles)) {
          sails.log.error(`[FileController.download] Invalid Response: ${req.param('id')}`)
          throw new sails.ServerError('Invalid response from ORM')
        }
        if(destroyedFiles.length === 0) {
          sails.log.error(`[FileController.download] File not found: ${req.param('id')}`)
          throw new sails.NotFoundError('File doesn\'t exist')
        }

        fs.unlinkSync(destroyedFiles[0].localPath);

        res.success(destroyedFiles[0]);
      })
      .catch(err => {
        sails.log.error(`[FileController.download] Error: ${err.message}`)
        res.error(err)
      });
  }

}
