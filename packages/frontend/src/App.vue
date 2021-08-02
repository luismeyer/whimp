<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <input type="file" ref="file" v-on:change.stop="onImageChange()" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { apiUrl } from "./utils/api";

function onImageChange() {
  const [file] = this.$refs.file.files;

  const formData = new FormData();
  formData.append("file", file);

  fetch(`${apiUrl}/upload`, { method: "POST", body: formData });
}

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  methods: {
    onImageChange,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
