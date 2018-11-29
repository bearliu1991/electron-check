<template>
    <div id="right_part">
        <div v-show="!isHot && !isInstall">{{msg}}</div>
        <div v-show="isHot">
            <div class="cursor" @click="excHot">热更新</div>
        </div>
        <div class="cursor" v-show="isInstall" @click="excInstall">安装更新</div>
    </div>
</template>

<script>
  import common from '@/assets/js/public';

  let fs = require('fs')
  const {ipcRenderer} = require('electron');

  export default {
    name: "right_part",
    data () {
      return {
        msg : '检测中。。。。。',
        isInstall : false,
        isHot : false
      }
    },
    created() {
      this.versionCheck()
    },
    methods: {
      versionCheck() {
        let self = this;
        ipcRenderer.on('hello', (e, msg, msg2) => {
          console.error(msg)
          console.error(msg2)
          // 监听主进程发来的事件...
        });
        ipcRenderer.on('write', (e, data) => {
          let fs = require("fs");
          // 监听主进程发来的事件...
        });

        (async () => {
          const res = await common.httpGet('http://localhost:8899/update');
          const obj = JSON.parse(res.data)
          if (obj.isUpdate) {
            if (obj.hotUpdate) {
              self.isHot = true;
            }
            if (obj.installUpdate){
              self.isInstall = true;
            }
          }
        })()
      },
      excInstall () {
        ipcRenderer.send('checkVersion');
      },
      excHot () {
        ipcRenderer.send('excuteHot');
      }
    }
  }
</script>

<style lang="stylus" scoped>
    #right_part
        display: flex
        height: 100vh
        padding: 10px
        align-items: center
        justify-content: center
        .cursor
            margin:0 10px
            display:inline-block
            height:30px;
            background-color:blue
            color: #ffffff
            padding: 0 10px
            line-height:30px
</style>