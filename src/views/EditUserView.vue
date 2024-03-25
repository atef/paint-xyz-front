<script setup>
  import { ref, onMounted } from 'vue'
  import router from '@/router'

  import apiService from '@/services/apiService.js'
  import UserForm from '@/components/UserForm.vue'

  const props = defineProps({
    currentUserId: {
      required: true
    },
    userId: {
      required: true
    }
  })

  const loggedinUser = ref(null)
  const user = ref(null) 
  
  onMounted (() => {
    // get logged in user from server to set its role of the actions they can take on the paint
    apiService.getUser(props.currentUserId)
      .then((response) => {
        loggedinUser.value = response.data
        if (!loggedinUser.value.isActive) {
          loggedinUser.value = null
        } else {
          // If Logged in user is Active get all users
          apiService.getUser(props.userId)
            .then((response) => {
              user.value = response.data
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

  const updateUser = (userData) => {
    // Update db via a PUT api call
    
    apiService.putUser(props.userId, userData.name, userData.role, userData.isActive)
    .then((response) => {
      // redirect back to teh list of Users
      router.push({ name : 'users-list', params : { currentUserId: loggedinUser.value.id}})
    })
    .catch((error) => {
        console.log(error)
    })

  }
</script>

<template>
  <div v-if="loggedinUser && user" >
    <div class="breadcrumb-wrapper">
      <div class="breadcrumb">
        <router-link :to="{ name : 'dashboard', params : { currentUserId : loggedinUser.id}}" >Dashboard</router-link> > 
        <router-link :to="{ name : 'users-list', params : { currentUserId : loggedinUser.id}}" >All Users</router-link> > 
        Edit User
      </div>

      <div class="loggedin-user">Logged in User: {{ loggedinUser.name }}</div>

      <router-link :to="{ name : 'login'}" >
        <button>Change User</button>
      </router-link>
    </div>

    <h2>Edit User</h2>

    <div  class="form-wrapper">

      <UserForm @user-submitted="updateUser" :user="user"></UserForm>

    </div>
  </div>
  <!-- Display a message if no valid user found -->
  <div v-else>
      <h1>Oops</h1>    
      <p>You must be a logged in user to view the content of this page. <router-link :to="{ name : 'login'}" >Login</router-link></p>
  </div>

</template>


<style scoped>
  .form-wrapper {
    display: flex;
    justify-content: center;
  }

</style>