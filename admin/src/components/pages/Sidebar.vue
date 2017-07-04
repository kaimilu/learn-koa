<template>
  <el-row class="sidebar">
    <el-menu :router="true" :default-active="fullPath" class="full-height" :unique-opened="true" @select="handleSelect">
    <el-menu-item >
      <i class="el-icon-date"></i>
      概述
    </el-menu-item>

    </el-menu>
  </el-row>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      title: '',
      fullPath: ''
    }
  },
  watch: {
    '$route': function (route) {
      this.fullPath = route.path.split('/').slice(0, 3).join('/')
    }
  },
  methods: {
    push (name) {
      this.$router.push({name})
    },
    handleSelect (index, indexPath) {

    }
  },
  beforeMount () {
    this.fullPath = this.$route.path.split('/').slice(0, 3).join('/')
  }
}
</script>
