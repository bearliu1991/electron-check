<template>
    <div id="version">
        <div class="title">迎客通</div>
        <div class="version">版本：{{updateData && updateData.outerVersion}}</div>
    </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  export default {
    name: "version",
    data() {
      return {}
    },
    computed : {
      ...mapState({updateData : state => state.update.updateData}),
      isDescript () {
        const data = this.$store.state.update.updateData;
        if (data && data.isUpdate) {
          this.compo = 'UpdateCont'
        }
        return this.compo === 'UpdateCont'
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
    #version
        .title
            margin-bottom:10px
            fn(20px)
</style>