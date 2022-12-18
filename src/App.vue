<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item" style="margin-left: 20px; text-decoration:none; color:inherit;">
        <img src="./assets/logohome.png">
        <h4 style="margin-left:10px">Ghibahin</h4>
      </router-link>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" style="margin-right: 20px;">
      <div class="navbar-end">
        <router-link to="/catalog" class="navbar-item" style="text-decoration:none; color:inherit;">
          Catalog
        </router-link>
        <router-link to="/addForum" class="navbar-item" style="text-decoration:none; color:inherit;">
          Add Thread
        </router-link>
        <router-link to="/archive" class="navbar-item" style="text-decoration:none; color:inherit;">
          Archive
        </router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>