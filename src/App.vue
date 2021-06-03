<template>
  <div id="app"
       style="display: flex;
       justify-content: center;">
    <div class="listContainer">
        <CreateBrand :checker="checkMainProperty"/>
      <div>
        <SearchBrand/>
      </div>
      <button @click="regHandle"
              style="margin: 10px 0px 10px 0px"
              v-bind:class="{ 'regIsActive': regActive, 'regIsNotActive': regNotActive }">
        <span style="font-size: 1rem">Aa</span>
      </button>
      <div>
        <span>
          ({{ filtered.length }})
        </span>
        <button @click="listOpen" v-if="open"> open</button>
        <button @click="listClose" v-if="close"> close</button>
      </div>
      <div>
        <button @click="sortHandle" v-show="sortedOff">🌑 A-z</button>
        <button @click="sortHandle" v-show="sortedOn">🌕 A-z</button>
      </div>
      <div style="display: flex;
         justify-content: center"
           v-for="item in filtered.slice(0, this.openList)"
           :key="item.id">
        <div v-if="editItem === item._id">
          <input type="text" v-model="item.title">
          <select v-model="item.main">
            <option :value='true'>true</option>
            <option :value='false'>false</option>
          </select>
        </div>
        <div v-else>
        <span>
             --{{ item.title }}
        </span>
          <span>
            (main: {{ item.main }})
        </span>
        </div>
        <div v-if="editItem === item._id">
          <button @click="saveChanges(item)">save</button>
          <button @click="editItem = null">cancel</button>
        </div>
        <div v-else>
          <button @click="deleteBrand(item._id)">
            x
          </button>
          <button @click="changeItem(item._id)" style="margin-left: 0.2rem">
            edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CreateBrand from './components/createBrand.vue';
import SearchBrand from './components/searchBrand.vue';
import searchApi from './searchApi';

export default {
  name: 'App',
  components: { SearchBrand, CreateBrand },
  computed: {
    ...mapGetters({
      listData: 'listData',
      deleteId: 'DeleteId',
      search: 'SearchKey',
    }),
    filtered() {
      return searchApi(
        this.listData,
        this.search.searchKey,
        this.sortedOn,
        this.sortedOff,
        this.open,
        this.close,
        this.regActive,
        this.regNotActive,
      );
    },
  },
  data() {
    return {
      open: true,
      close: false,
      openList: 5,
      itemShow: true,
      changeItemShow: false,
      editItem: null,
      regActive: true,
      regNotActive: false,
      sortedOn: true,
      sortedOff: false,
    };
  },
  methods: {
    listOpen() {
      this.openList = this.filtered.length;
      this.open = false;
      this.close = true;
    },
    listClose() {
      this.openList = 5;
      this.close = false;
      this.open = true;
      this.checkMainProperty();
    },
    // удаление элемента
    async deleteBrand(id) {
      await this.$store.dispatch('DELETE_BRAND', id);
      // eslint-disable-next-line no-underscore-dangle
      const index = this.filtered.findIndex((brand) => brand._id === id);
      this.filtered.splice(index, 1);
      await this.checkMainProperty();
    },
    // сохранение id изменяемого элемента
    changeItem(id) {
      this.editItem = id;
    },
    // сохранение изменений
    saveChanges(item) {
      this.$store.dispatch('PUT_UPDATE_BRAND', item);
      this.editItem = null;
    },
    // проверка регистра
    regHandle() {
      if (this.regActive === true) {
        this.regActive = false;
        this.regNotActive = true;
      } else {
        this.regActive = true;
        this.regNotActive = false;
      }
    },
    // проверка значения main и установка длины списка
    async checkMainProperty() {
      const lengthMain = this.filtered.filter((item) => item.main === true).length;
      if (lengthMain < 5 && lengthMain > 0) {
        this.openList = lengthMain;
      }
    },
    // обработчик сортировки
    sortHandle() {
      if (this.sortedOn === true) {
        this.sortedOn = false;
        this.sortedOff = true;
      } else {
        this.sortedOn = true;
        this.sortedOff = false;
      }
    },
  },
  mounted() {
    // загрузка данных
    this.$store.dispatch('GET_ARRAY_DATA').then(() => {
      this.checkMainProperty();
    });
  },
};
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

.regIsActive {
  background: #c3f3ba;
}

.regIsNotActive {
  background: white;
}

.listContainer {
  display: flex;
  align-items: baseline;
  flex-flow: column;
  width: 360px;
  border: black solid 1.5px;
  border-radius: 12px;
  padding: 0.3rem;
}
</style>
