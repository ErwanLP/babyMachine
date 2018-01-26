<template>
    <div class="form-group">
        <label for="selectPlayerOne">Joueur </label>
        <select v-model="playerObject.player" class="form-control" id="selectPlayerOne">
            <option v-for="(user) in users" :key="user._id" :value="user">{{user.firstName}} {{user.lastName}}</option>
        </select>
        Player : {{playerObject}}
    </div>
</template>

<script>

    import axios from '@/utils/axios'

    export default {
        name: 'Player',
        props: ['playerObject'],
        data () {
            return {
                users: []
            }
        },
        created () {
            axios.get('/api/users/')
                    .then(response => {
                        this.users = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
