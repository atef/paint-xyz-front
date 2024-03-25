<script setup>

  defineProps({
    user: {
      type: Object,
      required: true
    },
    actionLabel: {
      type: String,
      required: true
    }
  })

  const emit = defineEmits(['triggerActionForUser'])

  function buttonClicked(userId) {
    emit('triggerActionForUser', userId)
  }
</script>

<template>
  <div class="user">
    <h3>{{ user.name }}</h3>
    <p>Role: <strong>{{ user.role }}</strong><br >
    Is Active: <strong>{{ user.isActive ? 'Yes' : 'No' }}</strong></p>
    <button @click="buttonClicked(user.id)">{{ actionLabel }}</button>
  </div> 
</template>



<style scoped>
	.user {
    align-items: center;
    border-radius: 4px;
    box-shadow: 0px 2px 5px #888;
    display: flex;
    flex-direction: column;
    padding: 20px;
    position: relative;
    width: 32%;
  }  
</style>