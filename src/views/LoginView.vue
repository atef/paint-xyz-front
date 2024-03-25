<script setup>
	import { ref, onMounted } from 'vue'
  import router from '@/router'

  import apiService from '@/services/apiService.js'
	import UserCard from '@/components/UserCard.vue'

	
	const users = ref(null)

  onMounted (() => {
    apiService.getActiveUsers()
      .then((response) => {
        users.value = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  })
	
  // The login function will simply load the dashboard view and pass the current userId as a logged in user
  const login = (userId) => {
    router.push({ name : 'dashboard', params : { currentUserId : userId}})
  }

</script>


<template>
	<h2>Login</h2>   
	<p>Click on the user of your choosing, to experience the app as if you are loging in as that user!</p>
	
	<div class="users">
		<UserCard 
      v-for="user in users" 
      :key="user.id" 
      :user="user"
      actionLabel="Login"
      @trigger-action-for-user="login" 
    />
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