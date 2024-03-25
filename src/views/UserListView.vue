<script setup>
  import { ref, onMounted } from 'vue'
  import router from '@/router'

  import apiService from '@/services/apiService.js'
  import UserCard from '@/components/UserCard.vue'

  const props = defineProps({
    currentUserId: {
      required: true
    }
  })


  const users = ref(null)
  const loggedinUser = ref(null)

  onMounted (() => {
    // get logged in user from server to set its role of the actions they can take on the paint
    apiService.getUser(props.currentUserId)
      .then((response) => {
        loggedinUser.value = response.data
        if (!loggedinUser.value.isActive) {
          loggedinUser.value = null
        } else {
          // If Logged in user is Active get all users
          apiService.getUsers()
            .then((response) => {
              users.value = response.data
            })
            .catch((error) => {
              console.log(error)
            })
          }
      })
      .catch((error) => {
        console.log(error)
      })
  })
	
  function editUser(userId) {
    router.push({ name : 'edit-user', params : { currentUserId: loggedinUser.value.id, userId: userId}})
  }

</script>


<template>
  <div v-if="loggedinUser">

    <div class="breadcrumb-wrapper">
      <div class="breadcrumb">
        <router-link :to="{ name : 'dashboard', params : { currentUserId : loggedinUser.id}}" >Dashboard</router-link> > All Users
      </div>
      
      <div class="loggedin-user">Logged in User: {{ loggedinUser.name }}</div>

      <router-link :to="{ name : 'login'}" >
        <button>Change User</button>
      </router-link>
    </div>

    <h2>All Users</h2>   
    
    <div class="users">
      <UserCard 
        v-for="user in users" :key="user.id" 
        :user="user" 
        actionLabel="Edit Permissions"
        @trigger-action-for-user="editUser" 
      />
    </div>
  </div>
  <!-- Display a message if no valid user found-->
  <div v-else>
      <h1>Oops</h1>    
      <p>You must be a logged in user to view the content of this page. <router-link :to="{ name : 'login'}" >Login</router-link></p>
  </div>

</template>


<style scoped>
	.users {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
  }
</style>