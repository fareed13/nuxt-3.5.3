<template>
  <div>
    <video ref="videoPlayer"  loop muted playsinline
           :autoplay="videoOptions.autoplay"
           :controls="videoOptions.controls"
           class="video-js vjs-fluid vjs-default-skin vjs-big-play-centered"
    >
      <source :src="media.name">
  </video>

  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.min.css'
import { sections } from '../../mixins/sections'

export default {
  name: 'VideoPlayer',
  mixins: [sections],
  data () {
    return {
      player: null,
      videoOptions: {
        autoplay: true,
        controls: true
      }
    }
  },
  mounted () {
    if(this.media.autoPlay !== null && typeof(this.media.autoPlay) !== 'undefined'){
      this.videoOptions.autoplay = this.media.autoPlay;
    }
    this.player = videojs(this.$refs.videoPlayer, this.videoOptions, function onPlayerReady () {
    })
  },
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>
