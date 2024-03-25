<script setup>
  import { reactive } from 'vue'


  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(['user-submitted'])
  
  const userInit = reactive ({
    name: '',
    role: '',
    isActive: false
  })
  
  userInit.name = props.user.name
  userInit.role = props.user.role
  userInit.isActive = props.user.isActive

  function onSubmit(){
    // Stringify the form data fo it is no longer reactive
    const userData = JSON.parse(JSON.stringify(userInit))

    //Emit the event
    emit ('user-submitted', userData)
  }
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="form-field">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="userInit.name">
    </div>

    <div class="form-field">
      <label for="role">Role:</label>
      <select id="role"  v-model="userInit.role">
        <option>Administrator</option>
        <option>General Manager</option>
        <option>Stock Manager</option>
        <option>Painter</option>
      </select>
    </div>
      
    <div class="form-field">
      <input type="checkbox" id="is-active"  v-model="userInit.isActive"><label for="is-active">Is Active</label>
    </div>
      
    <div class="form-field">
      <input class="button" type="submit" value="Submit" />
    </div>
  </form>
</template>


<style scoped>
  form {
    width: 800px;
  }
  .form-field {
    padding: 16px;
  }
  .form-field label {
    font-size: 18px;
    font-weight: bold;
  }
  .form-field input[type=text], .form-field select {
    font-size: 16px;
    min-height: 47px;
    padding: 6px 16px;
    border-radius: 4px;
    width: 100%;
    max-width: 100%;
    border: 1px solid #69727d;
    background-color: transparent;
    color: #1f2124;
    vertical-align: middle;
    flex-grow: 1;
  }
  .form-field input[type=checkbox] {
    min-height: 28px;
    border-radius: 4px;
    padding: 6px 16px;
    width: 28px;
  }
  .button {
    width: 100%;
    background-color: black;
    color: white;
  }
</style>