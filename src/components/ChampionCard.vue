<template>
  <div class="ChampionCard" @mouseover="showDescription = true" @mouseleave="showDescription = false">
    <span :class="{ favoris: isFavorite }">{{ name }}</span><br>
    <span :class="{ favoris: isFavorite }">{{ short }}</span><br>
    <span class="tags">{{ tags }}</span>
    <br>
    <img
      :src="`http://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${id}.png`"
      :alt="name"
      @click="$emit('like', name)" 
    >
    <div id="short">
      <p v-show="showDescription">Description: {{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChampionCard',
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    short: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: Array, required: true }
  },
  computed: {
    isFavorite() {
      return this.$root.favoris.includes(this.name);
    }
  },
  data() {
    return {
      showDescription: false
    }
  }
}
</script>

<style scoped>

p{
  text-justify: auto;
  text-align: justify;
}
p:hover{
  color: blueviolet;
}

#short{
  width: 20em;
}

img:hover {
  border: 2px solid blue;
  border-radius: 4px;
  border-block-color: blueviolet;
}

.ChampionCard {
  margin-bottom: 3em;
}

.favoris {
  color: red; 
}

.tags {
  color: grey;
}
</style>
