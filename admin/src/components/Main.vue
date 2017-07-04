<template>
  <div class="dashboard">
    <top></top>
    <sidebar></sidebar>
    <div class="main">
      <router-view :key="$route.params.id || -1"></router-view>
    </div>
  </div>
</template>

<script>
  import Sidebar from './pages/Sidebar'
  import Top from './pages/Top'

  export default {
    name: 'dashboard',
    data () {
      return {
        title: ''
      }
    },
    components: {
      Sidebar,
      Top
    }
  }
</script>
