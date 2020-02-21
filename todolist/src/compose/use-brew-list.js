import {
  ref,
  reactive,
  toRefs
} from "@vue/composition-api";
export default function () {
  const val = ref("");
  const brewers = reactive({
    list: []
  });
  const submitted = async () => {
    const response = await fetch(
      `https://api.openbrewerydb.org/breweries/?by_name=${val.value}`
    );
    const json = await response.json();
    // this.brewers = json;
    console.log(json);
    brewers.list = json;
  };
  return {
    val,
    ...toRefs(brewers),
    submitted
  };
}
