<template>
  <div id="app">
    <example></example>
    <cr-dialog></cr-dialog>
  </div>
</template>
<style>

</style>
<script type="text/babel">
  import example from "./components/example"
  import crDialog from "../../components/dialog.vue"
  export default {
    data() {
      return {}
    },
    components:{
      example,crDialog
    }
  }
</script>
