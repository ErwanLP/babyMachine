<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Baby Machine</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="#/rules">Regles</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/users">Utilisateurs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/teams">Equipes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/tournaments">Tournois</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/signin">Inscription</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/login">Connection</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
  nav {
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li { display: inline-block; }

    a {
      color: red;
      display: block;
      padding: 6px 12px;
      text-decoration: none;
    }
  }
</style>
