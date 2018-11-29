<script src="../../../../../middleware/app.js"></script>
<template>
    <div id="checking">检测更新中...</div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "checking",
    data() {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
    #checking
        margin-top: 70px
        font-size: 20px
</style>