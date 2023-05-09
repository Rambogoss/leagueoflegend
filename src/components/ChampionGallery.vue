<template>
  <div class="ChampionGallery">
    <div>
      <p>Region: IONIA</p>
      <input type="text" v-model="searchQuery" placeholder="Search..."><br><br>
      <div class="boutons">
        <img src="../assets/Slayer_icon.png" :class="{ active: isSelectedFilter('Assassin') }" @click="toggleSelectedFilter('Assassin')">
        <img src="../assets/Mage_icon.png" :class="{ active: isSelectedFilter('Mage') }" @click="toggleSelectedFilter('Mage')">
        <img src="../assets/Tank_icon.png" :class="{ active: isSelectedFilter('Tank') }" @click="toggleSelectedFilter('Tank')">
        <img src="../assets/Marksman_icon.png" :class="{ active: isSelectedFilter('Marksman') }" @click="toggleSelectedFilter('Marksman')">
        <img src="../assets/Support_icon.png" :class="{ active: isSelectedFilter('Support') }" @click="toggleSelectedFilter('Support')">
        <img src="../assets/Fighter_icon.png" :class="{ active: isSelectedFilter('Fighter') }" @click="toggleSelectedFilter('Fighter')">
        <button :class="{ active: selectedFilter.length > 0 }" @click="clearSelectedFilter()">Clear</button>
      </div>
    </div>
    <br>
    <div class="champion-card-list">
      <ChampionCard v-for="(champion, index) in filteredChampionsData"
        :id="champion.id"
        :name="champion.name" 
        :tags="champion.tags"
        :short="champion.title"
        :description="champion.blurb"
        :key="index"/> 
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
      selectedFilter: []
    }
  },

  created: function () {
    this.retrieveLOLData()
  },

  computed: {
    filteredChampionsData() {
      const searchQuery = this.searchQuery.toLowerCase()
      const tagFilters = this.selectedFilter
      return Object.values(this.championsData).filter(champion => {
        if (tagFilters.length > 0) {
          return champion.name.toLowerCase().includes(searchQuery) && tagFilters.every(tag => champion.tags.includes(tag))
        } else {
          return champion.name.toLowerCase().includes(searchQuery)
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
      const img = event.target;
    const currentOpacity = parseInt(img.style.opacity) || 30;
    img.style.opacity = currentOpacity === 30 ? '100%' : '30%';
    },

    clearSelectedFilter() {
  this.selectedFilter = [];

  // Get all images in the .boutons div and set their opacity to 30%
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

  img:active{
    opacity:100%;
  }

  img {

    height: 4em;
    opacity: 30%;
  }

  
</style>