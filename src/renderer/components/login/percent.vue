<template>
    <div id="percent">
        <div :style="{width: width}"></div>
    </div>
</template>

<script>
  import {ipcRenderer} from 'electron';
  export default {
    name: "percent",
    data() {
      return {
        width: '50%'
      }
    },
    created() {
      ipcRenderer.on('hello', (state, data) => {
        console.error(data)
      })
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/index.styl'
    #percent
        relative()
        width: 160px
        height:10px
        bgColor(#999)
        margin: 30px auto
        div
            absolute()
            left:0
            top:0
            bottom:0
            height:100%
            bgColor(blue)
</style>