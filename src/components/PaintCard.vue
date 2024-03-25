<script setup>
  import apiService from '@/services/apiService.js'

  defineProps({
    paint: {
      type: Object,
      required: true
    },
    userRole: {
      type: String,
      required: true
    }
  })

  const emit = defineEmits(['orderPaint', 'usePaint'])

  function orderedButtonClicked(paintId) {
    emit('orderPaint', paintId)
  }
  function useButtonClicked(paintId) {
    emit('usePaint', paintId)
  }

</script>

<template>
  <div class="paint" :style="{borderLeft: '12px solid' + paint.colorCode}">
    <h2>{{ paint.name }}</h2>
    <div><p>Qty: {{ paint.inventory }} litres</p>
      <div class="paint-action" >
        <button 
          class="btn-small" 
          v-if="userRole==='Stock Manager'"
          @click="orderedButtonClicked(paint.id)">
          Order Paint
        </button> 
        <button 
          class="btn-small" 
          v-if="(userRole==='Stock Manager') || (userRole==='Painter')"
          :class="{'disabled-button' : paint.inventory == 0}" 
          :disabled="paint.inventory == 0" 
          @click="useButtonClicked(paint.id)">
          Use Paint
        </button>
      </div>
    </div>
  </div>
</template>



<style scoped>
.paint {
    align-items: center;
    margin: 16px;
    border-radius: 4px;
    background-color: #fffffe;
    box-shadow: 0px 2px 5px #888;
    display: flex;
    flex-direction: column;
    padding: 16px;
    position: relative;
    min-width: 32%;
  }

  .paint-action {
      display: flex;
      gap:8px;
  }
</style>