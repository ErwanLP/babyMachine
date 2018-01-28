<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-6">
        <div class="card" style="width: 100%; max-width: 18rem">
          <img class="card-img-top"  height="220" src="./../assets/trophy.jpg" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Tounoi en cours</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
          <div class="card-body">
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card" style="width: 100%;">
          <div class="card-body">
            <h5 class="card-title">Get started</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <a href="#/teams" class="btn btn-primary"><i class="fa fa-users" aria-hidden="true"></i> Créer ton equipe</a>
            </li>
            <li class="list-group-item">
              <a href="#/tournaments" class="btn btn-primary"><i class="fa fa-sign-in" aria-hidden="true"></i> Inscris
                ton equipe au tournoi</a>
            </li>
            <li class="list-group-item">
              <a href="#" class="btn btn-primary"><i class="fa fa-trophy" aria-hidden="true"></i> Deviens le champion en
                titre</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Dashboard',
    data () {
      return {
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
