<template>
  <div class="ChampionGallery">
    <div class="filtres">
      <p>Filtres</p>
      <input type="text" v-model="searchQuery" placeholder="Search..."><br><br>
      <div class="boutons">
        <img src="../assets/heart2.png" data-tag="favoris" :class="{ active: showFavorites }" @click="toggleShowFavorites">
        <img src="../assets/Slayer_icon.png" :data-tag="'Assassin'" :class="{ active: isSelectedFilter('Assassin') }" @click="toggleSelectedFilter('Assassin')">
        <img src="../assets/Mage_icon.png" :data-tag="'Mage'" :class="{ active: isSelectedFilter('Mage') }" @click="toggleSelectedFilter('Mage')">
        <img src="../assets/Tank_icon.png" :data-tag="'Tank'" :class="{ active: isSelectedFilter('Tank') }" @click="toggleSelectedFilter('Tank')">
        <img src="../assets/Marksman_icon.png" :data-tag="'Marksman'" :class="{ active: isSelectedFilter('Marksman') }" @click="toggleSelectedFilter('Marksman')">
        <img src="../assets/Support_icon.png" :data-tag="'Support'" :class="{ active: isSelectedFilter('Support') }" @click="toggleSelectedFilter('Support')">
        <img src="../assets/Fighter_icon.png" :data-tag="'Fighter'" :class="{ active: isSelectedFilter('Fighter') }" @click="toggleSelectedFilter('Fighter')">
        <button :class="{ active: selectedFilter.length > 0 }" @click="clearSelectedFilter()">Clear</button>
      </div>
    </div>
    <br>
    <div class="champion-card-list">
      <ChampionCard
        v-for="(champion, index) in filteredChampionsData"
        :id="champion.id"
        :name="champion.name" 
        :tags="champion.tags"
        :short="champion.title"
        :description="champion.blurb"
        :key="index"
        @like="emitLike(champion.name)"
      />
    </div>
  </div>
</template>

<script>
import ChampionCard from './ChampionCard.vue'
import { getLOLData } from "@/services/champ.js"

export default {
  name: 'ChampionGallery',
  components: { ChampionCard },
  data() {
    return {
      LOLData: [],
      championsData: {},
      searchQuery: '',
      selectedFilter: [],
      showFavorites: false 
    }
  },
  created: function () {
    this.retrieveLOLData();
    this.loadFavorites();
  },
  computed: {
    filteredChampionsData() {
      const searchQuery = this.searchQuery.toLowerCase()
      const tagFilters = this.selectedFilter
      let champions = Object.values(this.championsData)
      if (this.showFavorites) {
        
        champions = champions.filter(champion => this.$root.favoris.includes(champion.name))
      }
      return champions.filter(champion => {
        if (tagFilters.length > 0) {
          return (
            champion.name.toLowerCase().includes(searchQuery) &&
            tagFilters.every(tag => champion.tags.includes(tag))
          );
        } else {
          return champion.name.toLowerCase().includes(searchQuery);
        }
      })
    }
  },
  methods: {
    async retrieveLOLData() {
      this.LOLData = await getLOLData()
      this.championsData = this.LOLData["data"]
    },
    isSelectedFilter(tag) {
      return this.selectedFilter.includes(tag);
    },
    toggleSelectedFilter(tag) {
  if (this.selectedFilter.includes(tag)) {
    this.selectedFilter = this.selectedFilter.filter(t => t !== tag);
  } else {
    this.selectedFilter.push(tag);
  }


  const images = document.querySelectorAll('.boutons img:not([data-tag="favoris"])');
  images.forEach(img => {
    const tag = img.dataset.tag;
    const isActive = this.selectedFilter.includes(tag);
    img.style.opacity = isActive ? '100%' : '30%';
  });
},
    toggleShowFavorites() {
  this.showFavorites = !this.showFavorites; 

  const image = document.querySelector('.boutons img[data-tag="favoris"]');
  if (image) {
    image.style.opacity = this.showFavorites ? '100%' : '30%';
  }
},
    loadFavorites() {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      this.$root.favoris = JSON.parse(favorites); 
    }
  },

  emitLike(championName) {
    this.$emit('like', championName);
    localStorage.setItem('favorites', JSON.stringify(this.$root.favoris)); 
  },
    clearSelectedFilter() {
      this.selectedFilter = [];
      this.showFavorites = false; 

      const images = document.querySelectorAll('.boutons img');
  images.forEach(img => {
    img.style.opacity = '30%';
  });

    }
  }
}
</script>


<style scoped>
  .champion-card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  img {
    height: 4em;
    opacity: 30%;
  }

  p {
    margin-top: 2rem;
    margin-bottom: 0.5em;
  }
  
</style> 