<!--
 * @Author: yuguangzhou
 * @Date: 2021-05-06 16:34:55
 * @LastEditTime: 2021-05-10 13:39:21
 * @LastEditors: yuguangzhou
 * @Description:  视频播放器
-->
<template>
  <div >
    <a-row>
      <a-col>
        <h1>西瓜播放器</h1>
        <h2>可拖拽进度条,截图,下载,倍速播放等功能</h2>
      </a-col>
    </a-row>
    <div id="vs"></div>
  </div>
</template>

<script>
import Player from  'xgplayer';
// import FlvPlayer  from 'xgplayer-flv.js'

export default {
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {
    // const player = new Player({
    //     id: 'vs',
    //     url: 'https://live.bilibili.com/76',
    //     crossOrigin:true,
    //     isLive: true,
    // })

      let player = new Player({
          id: 'vs',
        	url: "//s1.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4",
          playsinline: true,
          playbackRate: [0.5, 0.75, 1, 1.5, 2],
          whitelist: [
              ""
          ],
          fluid: false,
          screenShot: true,
          download: true,
          thumbnail: {
              pic_num: 44,
              width: 160,
              height: 90,
              col: 10,
              row: 10,
              urls: [
                  ""
              ]
		      },
          height: 400,
          width: 600
      });
  },
  methods: {

  },
  computed: {

  }
}
</script>

<style scoped lang="less">
.player{
  margin: 0 auto;
}
</style>
