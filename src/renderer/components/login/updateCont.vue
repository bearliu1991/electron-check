<template>
    <div id="updateCont">
        <div class="bold fn14">迎客通有新版本了</div>
        <ul>
            <li v-for="item in (updateData && updateData.descrips)">{{item}}</li>
        </ul>
        <div class="update" @click="update">立即更新</div>
    </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "updateCont",
    data() {
      return {}
    },
    computed : {
      ...mapState({updateData : state => state.update.updateData})
    },
    methods: {
      update() {
        this.$emit('hideCont')
      }
    }
  }
</script>

<style lang="stylus" scoped>
    #updateCont
        width:100%
        .bold
            text-align:left
        ul
            background: #fff
            text-align:left
            padding-left:5px
            height:200px
            overflow-y:auto
            margin:5px 0 20px 0
            li
                margin:5px 0
        .update
            display:inline-block
            margin:0 auto
            line-height:30px
            height:30px
            padding:0 5px
            background-color:lightskyblue
            color:#fff
            cursor:pointer

</style>