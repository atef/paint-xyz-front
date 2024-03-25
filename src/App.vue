<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <div class="page-wrapper">
      <header>
          <h1>Paint Status App</h1>
      </header>

      <RouterView />
  </div>

</template>

<style>

* {
    box-sizing: border-box;
    font-family: Arial;
  }

  body {
    margin: auto;
    max-width: 1200px;
  }

  .page-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  header {
    width: 100%;
    line-height: 1.5;
  }

  .full-width {
    width: 100%;
  }


  button, .button {
    background-color: black;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    outline: 0;
    padding: 12px 16px;
  }
  .btn-small {
      border-radius: 0;
      padding: 4px 8px;
      font-size: 0.8rem;
  }
  .disabled-button {
      background-color: #d8d8d8;
      cursor: not-allowed;
  }
  
  h1 {
    border-bottom: 1px solid black;
    margin: 0;
    margin-top: 16px;
    padding: 16px;
  }
  
  .breadcrumb-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F3F3F3;
    padding: 24px;
    width: 100%;
  }
  .breadcrumb {
    font-style: italic;
  }
  .loggedin-user {
    font-weight: bold;
  }
</style>
