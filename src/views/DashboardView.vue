<script setup>
	import { ref, onMounted } from 'vue'

  import apiService from '@/services/apiService.js'

  const props = defineProps({
    currentUserId: {
      required: true
    }
  })

  const loggedinUser = ref(null)
  
  onMounted (() => {
    apiService.getUser(props.currentUserId)
      .then((response) => {
        loggedinUser.value = response.data
        // If the fetched user is not Active. Reset the user constant to Null to deny access
        if (!loggedinUser.value.isActive) loggedinUser.value = null
      })
      .catch((error) => {
          console.log(error)
      })
  })
</script>


<template> 
  <div v-if="loggedinUser">
    <div class="breadcrumb-wrapper">
      <div class="breadcrumb">Dashboard</div>

      <div class="loggedin-user">Logged in User: {{ loggedinUser.name }}</div>

      <router-link :to="{ name : 'login'}" >
        <button>Change User</button>
      </router-link>
    </div>

    <div class="grid-wrap">
      <h2>{{ loggedinUser.name }}, welcome to your dashboard</h2>
      <router-link :to="{ name : 'paints-list', params : { userId : loggedinUser.id}}"  class="full-width">
        <button class="btn-dashboard btn-orange">Paint Availability Status</button>
      </router-link>
      
      <router-link 
        :to="{ name : 'users-list', params : { currentUserId : loggedinUser.id}}"
        class="full-width" 
        v-if="loggedinUser.role==='Administrator'">
        <button class="btn-dashboard btn-green" >Manage Users</button>
      </router-link>
        
    </div>
  </div>

  <!-- Display a message if no valid user found-->
  <div v-else>
    <h1>Oops</h1>    
    <p>You must be a logged in user to view the content of this page. <router-link :to="{ name : 'login'}" >Login</router-link></p>
  </div>
</template>


<style scoped>
  .btn-dashboard {
    width: 100%;
    padding: 32px;
    margin: 32px;
    border-radius: 16px;
    transition: all 0.3s;
  }
  .btn-orange {
    background-color: orange;
    
  }
  .btn-orange:hover {
    background-color: darkorange;
  }
  .btn-green {
    background-color: green;
  }
  .btn-green:hover {
    background-color: darkgreen;
  }
  
</style>