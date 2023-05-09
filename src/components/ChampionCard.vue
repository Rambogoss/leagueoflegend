<template>
  <div class="ChampionCard" @mouseover="showDescription = true" @mouseleave="showDescription = false">
    {{name}}<br>
    {{short}}<br>
    {{tags}}

    <br>
   <img :src="`http://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${id}.png`" :alt="name" @click="like()" >

    <div id="short">
      <p v-show="showDescription"> Description : {{description}} </p>
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
    tags :{type: Array, required: true }
 
  },
  data() {
    return {
      showDescription: false
    }
  },
  methods: {
    like() {
  const img = event.target;
  const currentOpacity = parseInt(img.style.opacity) || 30;
  img.style.opacity = currentOpacity === 30 ? '100%' : '30%';


}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* img{
  width : 50%;
} */
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



</style>
