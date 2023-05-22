<template>
  <div id="app">
    <nav class="navbar">
      <img alt="Vue logo" src="./assets/logo.png" id="logo">
    </nav>
    <div id="content">
      <ChampionGallery :searchTerm="searchTerm" @like="like" />
    </div>
  </div>
</template>

<script>
import ChampionGallery from './components/ChampionGallery.vue'
import { getLOLData } from "@/services/champ.js"

export default {
  name: 'App',
  components: {
    ChampionGallery
  },
  data() {
    return {
      searchTerm: '',
      favoris: [] 
    }
  },
  created() {
    this.retrieveLOLData();
    this.loadFavorites();
  },
  methods: {
    async retrieveLOLData() {
      const LOLData = await getLOLData();
      this.championdata = LOLData.data;
    },
    loadFavorites() {
      const favorites = localStorage.getItem('favorites');
      if (favorites) {
        this.favoris = JSON.parse(favorites);
      }
    },
    like(championName) {
      if (this.favoris.includes(championName)) {
        this.favoris = this.favoris.filter((name) => name !== championName);
      } else {
        this.favoris.push(championName);
      }
      localStorage.setItem('favorites', JSON.stringify(this.favoris)); 
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #bff4fd;
  margin-top: 0;
}

body {
  background-color: rgb(20, 20, 20);
  margin: 0;
}

#logo {
  width: 10em;
}

#content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.navbar {
  background-color: #bff4fd;
  margin-top: 0;
  padding: 0;
  border: 0;
}

.champion-card-list {
  background-color: rgba(0, 99, 180, 0.103);
}
</style>
