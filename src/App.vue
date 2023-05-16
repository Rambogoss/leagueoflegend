<template>
  <nav class="navbar">
    <img alt="Vue logo" src="./assets/logo.png" id="logo">
  </nav>
  <div id="content">
    <ChampionGallery :searchTerm="searchTerm" @like="like" />
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
      LOLData: [],
      championdata: [],
      championsName: [],
      searchTerm: '',
      favoris: [] // Array to store favorite champion names
    }
  },
  created: function () {
    this.retrieveLOLData()
  },
  methods: {
    async retrieveLOLData() {
      this.LOLData = await getLOLData()
      this.championdata = this.LOLData["data"]
    },
    like(championName) {
      if (this.favoris.includes(championName)) {
        this.favoris = this.favoris.filter(name => name !== championName); // Remove the name if already exists
      } else {
        this.favoris.push(championName); // Add the champion's name to the 'favoris' array
      }
      console.log(this.favoris); // Log the 'favoris' array to the console
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
  margin-top: 0em;

}



body{
  background-color: rgb(20, 20, 20);
}


#logo{
  width: 10em;
}

#content{
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#nav{
  margin-top: 0%;
}
#nav:hover{

  background-color: blue;
}

ul{
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  border: 0;
}

.navbar{
  background-color: #bff4fd;
  margin-top: 0;
  padding: 0;
  border: 0;
}

html,body{
  margin-top: 0;
  padding: 0;
}


</style>
