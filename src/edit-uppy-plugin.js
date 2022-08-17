/*
 * Because of the way Uppy is designed, we can't use onBeforeUpload to set the video_id as it does not support async.
 * So this custom plugin is used to set the video_id before the upload starts.
 *
 * @see https://uppy.io/docs/writing-plugins/#Example-of-a-custom-plugin
 */
import {UIPlugin} from "@uppy/core";

class UppyCreateVid extends UIPlugin {
  constructor (uppy, opts) {

    super(uppy, { ...{}, ...opts })

    this.id = this.opts.id || 'CreateVid'
    this.type = 'modifier'
  }

  createVideo(title) {

    return new Promise((resolve, reject) => {

      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/*+json',
          AccessKey: this.opts.apiKey
        },
        body: JSON.stringify({"title": title})
      };

      fetch(`https://video.bunnycdn.com/library/${this.opts.libraryId}/videos`, options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          return resolve(data.guid);
        })
        .catch((error) => {
          console.log('Error:', error);
          return reject(error);
        });
    });
  }

  prepareUpload = (fileIDs) => {
    const promises = fileIDs.map((fileID) => {
      const file = this.uppy.getFile(fileID)
      const title = file.name;

      return this.createVideo(title).then((videoId) => {
          console.log(`Video ${videoId} created`);
          this.opts.blockProps.video_id = videoId;
        }
      ).catch((err) => {
        this.uppy.log(`Video could not be created ${file.id}:`, 'warning')
        this.uppy.log(err, 'warning')
      })
    })

    const emitPreprocessCompleteForAll = () => {
      fileIDs.forEach((fileID) => {
        const file = this.uppy.getFile(fileID)
        this.uppy.emit('preprocess-complete', file)
      })
    }

    // Why emit `preprocess-complete` for all files at once, instead of
    // above when each is processed?
    // Because it leads to StatusBar showing a weird “upload 6 files” button,
    // while waiting for all the files to complete pre-processing.
    return Promise.all(promises)
      .then(emitPreprocessCompleteForAll)
  }

  install () {
    this.uppy.addPreProcessor(this.prepareUpload)
  }

  uninstall () {
    this.uppy.removePreProcessor(this.prepareUpload)
  }
}

export default UppyCreateVid
