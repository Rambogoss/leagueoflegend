<template>
<nav class="navbar">
  <ul>
  <li><a href="default.asp">Home</a></li>
  <li><a href="news.asp">News</a></li>
  <img alt="Vue logo" src="./assets/logo.png" id="logo">
  <input type="text" placeholder="Search.." v-model="searchTerm">
 
  </ul>
</nav>  

  
  <div id="content">
    <ChampionGallery :searchTerm="searchTerm" @click="like()"/>
  
     
  </div>
  {{championsdata}}
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
      championdata : [],
       championsName: [],
    searchTerm: '',
    likedChampions: []
  }
  },

  created : function() {
    this.retrieveLOLData()
  },
  
  methods: {
    async retrieveLOLData() {
      this.LOLData = await getLOLData()
      this.championdata = this.LOLData["data"]
    },
    like() {
      
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
  width: 10%;
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
