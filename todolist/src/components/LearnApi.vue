<template>
  <div>
    <h2>Learning Vue JS</h2>
    <section>
      <div class="search-input">
        <form @submit.prevent="submitted">
          <input type="text" v-model="val" />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <a href="https://api.openbrewerydb.org/breweries/">https://api.openbrewerydb.org/breweries/</a>
      </div>
      <div>
        <div class="content" v-for="brow in list" :key="brow.id">
          <div>
            <span>Name :</span>
            <span>{{brow.name}}</span>
          </div>
          <div>
            <span>Street :</span>
            <span>{{brow.street}}</span>
          </div>
          <div>
            <span>City :</span>
            <span>{{brow.city}}</span>
          </div>
          <div>
            <span>Zip :</span>
            <span>{{brow.postal_code}}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import useBrewList from "../compose/use-brew-list";
export default {
  name: "Learn-API",
  setup() {
    const { val, list, submitted } = useBrewList();
    return { val, list, submitted };
  }
};
</script>