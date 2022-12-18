<template>
  <div class="catalog" style="margin-top:10px;">
    <br />
    <h1 class="title is-1" style="text-align:center; font-family: 'Covered By Your Grace', cursive; color:#1C98F7; font-size:70px">CATALOG</h1>
  </div>

    <button @click="reverseOrder" id="reverse" class="button is-primary">reverse the order</button>

  <div class="columns is-centered" style="margin-top:40px; margin-bottom:30px">
    <input class="input is-rounded" style="width:500px" type="text" id="search2" v-model="search" name="search"
      placeholder="search thread...">
  </div>

  <div class="box" style="position:absolute; left:300px;">
    <div class="card" style="width:1000px; display:flex; margin-bottom:50px" v-for="forum in filteredItems"
      :key="forum.id">
      <div class="card-image is-rounded" style="align-items:center">
        <img :src="forum.imageThread" onerror="this.style.display='none'"
          style="width:200px;height:200px; object-fit: cover" />
      </div>

      <div class="card-content">
        <h5>#{{ forum.id }}</h5>
        <h5 class="title is-3" id="title" style="margin-top:20px;">{{ forum.Title }}</h5>
        <div style="position:absolute;top:150px">
          <router-link href="#" id="viewthread" class="button is-info" :to="{ path: `/thread/${forum.id}` }">view thread</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&display=swap');
.darkmode--activated .box, .darkmode--activated .card, .darkmode--activated .card-content, .darkmode--acivated .content{
    background-color:black;
    color:white;
}
.darkmode--activated #title{
  color:white
}
.darkmode--activated #desc{
  color:white
}
.darkmode--activated #viewthread{
  background-color:rgb(227, 103, 8);
}
.darkmode--activated #search2{
  background-color:rgb(227, 103, 8);;
  border-color: black;
}
.darkmode--activated ::placeholder{
  color:white;
}
.darkmode--activated #reverse{
  background-color:rgb(219, 63, 63)
}
</style>
<script>
// @ is an alias to /src
import Darkmode from 'darkmode-js';
import forColRef from "../firebase";
import { getDocs, doc, deleteDoc, limitToLast,query, orderBy } from "firebase/firestore";

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      forums: [],
      selectedDoc: null,
      search: "",
    }
  },
  methods: {
    reverseOrder(){
      this.forums = this.forums.reverse();
    },
    async fetchData() {
      let dataSS = await getDocs(query(forColRef, orderBy('createdOrder'), limitToLast(25)));
      let forums = [];
      dataSS.forEach((forum) => {
        let forumData = forum.data();
        forumData.id = forum.id;
        forums.push(forumData);
      });
      this.forums = forums
    },
  },
  created() {
    this.fetchData();
    new Darkmode().showWidget();
  },
  computed: { 
    filteredItems(){
      return this.forums.filter((item) => {
          return item.Title.match(this.search) || item.Description.match(this.search) || item.id.match(this.search)
      })
    }
  }
}
</script>