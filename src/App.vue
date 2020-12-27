<template>
  <div id="app">
    <Header></Header>
    <router-view/>
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
</style>
