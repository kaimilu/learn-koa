<template>
  <div class="top">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    name: 'top',
    data () {
      return {
        title: ''
      }
    },
    computed: {
      displayName () {
        return this.$store.state.user.displayName || -1
      }
    },
    methods: {
      handleSelect (index, indexPath) {
        if (index === '1-1') {
          this.$router.push({
            name: 'userEdit'
          })
        } else if (index === '1-2') {
          this.$router.push({
            name: 'logout'
          })
        }
      }
    },
    created () {
      // if (this.displayName === -1) {
      //   let username = window.localStorage.getItem('username')
      //   this.$store.dispatch('FETCH_USER', {
      //     model: 'user',
      //     query: {},
      //     username
      //   }).catch((err) => console.error(err))
      // }
    }
  }
</script>
