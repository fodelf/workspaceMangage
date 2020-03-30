<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// import T from './TerminalView'
export default {
  name:'xx',
  components:{
    // T
  }
}
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
