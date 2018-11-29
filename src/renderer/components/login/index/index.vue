<template>
    <div id="loginIndex">
        <div>迎客通</div>
        <!--<div class="land_wrap" v-show="isShowBar">-->
            <!--<div :style="{width: width}"></div>-->
        <!--</div>-->
        <div v-show="isShowBar">安装中...</div>
        <div v-show="!isShowBar" class="install" @click="showModal = true">立即安装</div>
        <Modal
                v-model="showModal"
                title="Common Modal dialog box title"
                @on-ok="install"
                @on-cancel="cancel">
            <p>您的迎客通正在运行，是否关闭以后安装</p>
        </Modal>
    </div>
</template>

<script>
  import {ipcRenderer} from 'electron';

  export default {
    name: 'login-index',
    data () {
      return {
        width: '0',
        showModal : false,
        isShowBar : true
      }
    },
    mounted() {
      let self = this;

      ipcRenderer.send('excHot')
      ipcRenderer.on('hello', (state, data) => {
        console.error(data)
      })
      ipcRenderer.on('over', (state, data) => {
        self.isShowBar = false;
      })
    },
    methods: {
      install () {
        ipcRenderer.send('excInstall')
      },
      cancel() {

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '~@/assets/css/index.styl'
    #loginIndex
        .install
            display:inline-block
            height:20px
            line-height:20px
            background-color:blue
            color: #ffffff
            padding:0 5px
            cursor:pointer
        .land_wrap
            position:relative
            margin:10px
            width:160px
            height:10px
            background-color:#999
            div
                position:absolute
                left:0
                top:0
                bottom:0
                background-color:blue
</style>
