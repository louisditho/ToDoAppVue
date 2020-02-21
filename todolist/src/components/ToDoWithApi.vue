<template>
  <div>
    <h1>Lerning API using axios</h1>
    <button @click="showJoke()">Show Joke</button>
    <div v-if="joke">{{ joke }}</div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  //   name: "try Axios",
  props: {
    msg: String
  },
  data() {
    return {
      joke: ""
    };
  },
  methods: {
    async showJoke() {
      //   alert("Hello World");
      let config = {
        headers: {
          Accept: "application/json"
        }
      };
      const joke = await axios.get("https://icanhazdadjoke.com", config);
      this.joke = joke.data.joke;
    }
  }
};
</script>