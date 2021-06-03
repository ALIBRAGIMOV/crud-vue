<template>
  <input type="search" placeholder="search" v-model="search.searchKey"/>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'searchBrand',
  computed: {
    ...mapGetters({
      search: 'SearchKey',
    }),
  },
  data() {
    return {};
  },
};
</script>

<style scoped>

</style>
