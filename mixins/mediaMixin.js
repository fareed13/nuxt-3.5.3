export const mediaMixin = {
  methods: {
    getMediaUrl(mediaObj, size = 'small') {
      const config = useRuntimeConfig().public
      // decide pixel size
      let pixelSize;
      if (size === 'xx-large') {
        pixelSize = '1440';
      } else if (size === 'x-large') {
        pixelSize = '1200';
      } else if (size === 'large') {
        pixelSize = '900';
      } else if (size === 'medium') {
        pixelSize = '700';
      } else {
        pixelSize = '350';
      }
      // make media url
      let mediaUrl = '';
      if (mediaObj && mediaObj.name) {
        if (mediaObj.name.slice(mediaObj.name.length - 3, mediaObj.name.length) === 'mp4' || mediaObj.type.toLowerCase() === 'video') {
          mediaUrl = {name: config.AMAZONAWS_VIDEO_URL + mediaObj.name + `_${(size === 'large') ? '1000' : pixelSize}.` + mediaObj.extension}; // for video component
        } else {
          mediaUrl = config.AMAZONAWS_IMAGE_URL + mediaObj.name + `_${pixelSize}.` + mediaObj.extension;
        }
      }
      return mediaUrl;
    },
    getBackgroundUrl () {
      const config = useRuntimeConfig().public
      let bgUrl = '';
      if (this.backgroundImage) {
        const bgImageName = this.backgroundImage.split('.')[0];
        const extension = this.backgroundImage.split('.')[1];
        bgUrl = `${config.AMAZONAWS_IMAGE_URL}${bgImageName}_900.${extension}`;
      }
      return bgUrl;
    }
  }
}
