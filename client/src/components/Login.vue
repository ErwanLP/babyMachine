<template>
    <div class="container">
        <div class="card center-card">
            <div class="card-body">
                <div class="form-group row">
                    <div class="col-sm-6">
                        <h5 class="card-title">Connexion</h5>
                    </div>
                    <div class="col-sm-6" style="text-align: right">
                        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#modalSignIn">
                            Inscription
                        </button>
                    </div>
                </div>
                <hr>
                <form>
                    <div class="form-group">
                        <label for="inputCredentialsEmail">Email</label>
                        <input type="text" v-model="credentials.email"
                               class="form-control"
                               v-bind:class="{  'is-invalid': !credentials.email }"
                               id="inputCredentialsEmail">
                    </div>
                    <div class="form-group">
                        <label for="inputCredentialsPassword">Mot de passe</label>
                        <input type="password"
                               v-model="credentials.password"
                               v-bind:class="{  'is-invalid': !credentials.password }"
                               class="form-control" id="inputCredentialsPassword">
                    </div>
                    <hr>
                    <div class="form-group row" style="text-align: center">
                        <div class="col-sm-12">
                            <button v-on:click="logIn()" class="btn btn-primary">Connexion</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="modal fade" id="modalSignIn" tabindex="-1" role="dialog" aria-labelledby="modalSignIn"
             aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Inscription</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <UserEdit :login-state="true"></UserEdit>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import router from '@/router'
    import UserEdit from '@/components/UserEdit'
    import axios from './../utils/axios'

    export default {
        name: 'Login',
        components: {UserEdit},

        data () {
            return {
                credentials: {
                    email: null,
                    password: null
                }
            }
        },
        created () {

        },
        methods: {
            logIn () {
                if (this.credentials.email && this.credentials.password) {
                    axios.post('api/users/login', this.credentials)
                        .then((response) => {
                            this.$store.commit('users/login', response.data)
                            router.push({path: '/'})
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
