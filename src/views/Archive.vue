<template>
  <div class="catalog" style="margin-top:10px;">
    <br />
    <h1 class="title is-1" style="text-align:center; font-family: 'Covered By Your Grace', cursive; color:#1C98F7; font-size:70px">ARCHIVE</h1>
  </div>

<button @click="reverseOrder" class="button is-primary">reverse the order</button>
<div class="columns is-centered" style="margin-top:40px; margin-bottom:30px">
    <input class="input is-rounded" style="width:500px" type="text" v-model="search" name="search"
      placeholder="search thread...">
  </div>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody v-for="forum in filteredItems" :key="forum.id">
    <tr>
      <td>{{forum.id}}</td>
      <td>{{forum.Title}}</td>
      <td>{{forum.Description}}</td>
      <td><router-link href="#" class="btn btn-primary" :to="{ path: `/archived/${forum.id}` }">view</router-link></td>
    </tr>
  </tbody>
</table>
</template>
<style>
.table {
    text-align: left;
}
</style>
<script>
// @ is an alias to /src
import forColRef from "../firebase";
import { getDocs, doc, deleteDoc, query, orderBy } from "firebase/firestore";

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
      let dataSS = await getDocs(query(forColRef, orderBy('createdOrder')));
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