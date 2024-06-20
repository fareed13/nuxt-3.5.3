export const blogMediaMixin = {
    methods: {
        getMediaUrl(mediaObj, size = 'small') {
            const config = useRuntimeConfig().public;
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
            if (mediaObj && mediaObj.uuid) {
                if (
                    mediaObj.uuid.slice(
                        mediaObj.uuid.length - 3,
                        mediaObj.uuid.length
                    ) === 'mp4' ||
                    mediaObj.media_type.toLowerCase() === 'video'
                ) {
                    mediaUrl = {
                        name:
                            config.AMAZONAWS_VIDEO_URL +
                            mediaObj.uuid +
                            `_${size === 'large' ? '1000' : pixelSize}.` +
                            mediaObj.extension
                    }; // for video component
                } else {
                    mediaUrl =
                        config.AMAZONAWS_IMAGE_URL +
                        mediaObj.uuid +
                        `_${pixelSize}.` +
                        mediaObj.extension;
                }
            }

            return mediaUrl;
        }
    }
};
