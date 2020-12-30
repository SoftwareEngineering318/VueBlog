<template>
  <div id="app">
    <Header class="menu"></Header>
    <router-view style="z-index: 0"/>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "App",
  components: {Header}  //这里写要用到的组件
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.menu {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
