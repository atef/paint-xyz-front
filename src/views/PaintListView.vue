<script setup>
	import { ref, onMounted } from 'vue'

  import apiService from '@/services/apiService.js'
  import PaintCard from '@/components/PaintCard.vue'

  const props = defineProps({
    currentUserId: {
      required: true
    }
  })

  const loggedinUser = ref(null)

  const swimLanes = ref([
          {id:1, name: 'Available', paints: []}, 
          {id:2, name: 'Running Low', paints: []},
          {id:3, name: 'Out of Stock', paints: []}
        ])

  function getPaints() {
    apiService.getPaints()
    .then((response) => {
        const allPaints = response.data

        swimLanes.value[0].paints = allPaints.filter(paint => paint.inventory > 10)
        swimLanes.value[1].paints = allPaints.filter(paint => paint.inventory  <= 10 && paint.inventory > 0)
        swimLanes.value[2].paints = allPaints.filter(paint => paint.inventory == 0)
    })
    .catch((error) => {
        console.log(error)
    })
  }

  onMounted (() => {
    // get logged in user from server to set its role of the actions they can take on the paint
    apiService.getUser(props.currentUserId)
      .then((response) => {
        loggedinUser.value = response.data
        if (!loggedinUser.value.isActive) {
          loggedinUser.value = null
        } else {
          // If Logged in user is Active get all paints
          getPaints()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  })
  
  function orderPaint(paintId) {
    apiService.putPaints(paintId, 'Order')
    .then(() => {
      getPaints()
    })
    .catch((error) => {
        console.log(error)
    })
  }

  function usePaint(paintId) {
    apiService.putPaints(paintId, 'Use')
    .then(() => {
       getPaints()
    })
    .catch((error) => {
        console.log(error)
    })
  }

</script>

<template>

  <div v-if="loggedinUser">
    <div class="breadcrumb-wrapper">
      <div class="breadcrumb">
        <router-link :to="{ name : 'dashboard', params : { currentUserId : loggedinUser.id}}" >Dashboard</router-link> > Paints
      </div>

      <div class="loggedin-user">Logged in User: {{ loggedinUser.name }}</div>

      <router-link :to="{ name : 'login'}" >
        <button>Change User</button>
      </router-link>
    </div>

    <h2>Paints</h2>
    <p>Notes: </p>
    <ul>
      <li>Any paint with a quantity larger then 10 litres is considered <em><strong>Available</strong></em>. </li>
      <li>Any paint with a quantity smaller then 10 litres but more then 0 is considered <em><strong>Running Low</strong></em>. </li>
      <li>Any paint with a quantity equals 0 is considered <em><strong>Out of Stock</strong></em>. </li>
    </ul>


    <div class="kanban-board">
      <!-- Loop through all swimlanes of the Kanban board -->
      <div class="swim-lane"
        v-for="swimLane in swimLanes"
        :key="swimLane.id"
        >
        <div class="header">
            <h3>{{ swimLane.name }}</h3>
        </div>
        
        <!-- Display the different paints in the curren swimlane and pass the userRole to determine the actions a user can take -->
        <div class="paint-list-container">
          <PaintCard  
            v-for="paint in swimLane.paints"  :key="paint.id" 
            :paint="paint" 
            :user-role="loggedinUser.role"
            @order-paint="orderPaint" 
            @use-paint="usePaint" />
        </div>
      </div>
    </div>
  </div>
  <!-- Display a message if no valid user found-->
  <div v-else>
      <h1>Oops</h1>    
      <p>You must be a logged in user to view the content of this page. <router-link :to="{ name : 'login'}" >Login</router-link></p>
  </div>

</template>

<style scoped>
  .kanban-board {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .swim-lane {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 16px;
    padding: 0 16px ;
    background-color: #f6f6f6;
    border-bottom: 1px solid #aaa;
    box-shadow: 0px 2px 5px #ddd;
    margin-top:16px;
  }
  .header {
    align-content: center;
    padding-right: 16px;
    border-right: 1px solid #ddd;
    min-width: 20%;
  }
  
  .paint-list-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  </style>