<template>
  <div>
    <div style="display: flex;
         justify-content: center;">
      <span style="margin-right: 5px;">Создать </span>
      <input type="text" placeholder="Название" v-model="name">
      <select v-model="main">
        <option :value='true'>true</option>
        <option :value='false'>false</option>
      </select>
      <button @click="postBrandData">create</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'createBrand',
  props: {
    checker: Function,
  },
  data() {
    return {
      name: '',
      main: Boolean,
    };
  },
  methods: {
    async postBrandData() {
      await this.$store.dispatch('POST_CREATE_BRAND', {
        title: this.name,
        main: this.main,
      });
      this.name = '';
      this.main = Boolean;
      await this.checker;
    },
  },
};
</script>

<style scoped>

</style>
