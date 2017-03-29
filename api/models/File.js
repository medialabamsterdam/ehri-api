'use strict'

/**
 * File
 *
 * @description:  A model describing a File.
 * @author:       Fabian Tollenaar <fabian@decipher.industries>
 * @copyright:    Decipher Industries, copyright (c) 2016. All rights reserved.
 * @package:      Bercq Report Manager
 */

module.exports = {

  attributes: {
    key: {
      type: 'string',
      required: true
    },

    mimeType: {
      type: 'string',
      required: true
    },

    size: {
      type: 'integer',
      required: true
    },

    localPath: {
      type: 'string',
      required: true
    },

    name: {
      type: 'string',
      required: true
    }
  }
};
