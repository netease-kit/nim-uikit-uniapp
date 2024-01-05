<template>
   <div class="empty-wrapper">
    <image class="empty-img"
      src="../static/empty.png" />
    <div class="empty-text">{{ text }}</div>
  </div>
 </template>
   

   <script lang="ts" setup>
   import { defineProps } from 'vue'
   const props = defineProps<{
     text: string
   }>()
   
   </script>
 <style lang="scss" scoped>
 .empty-wrapper {
  margin: 75px 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .empty-img {
    display: block;
    width: 125px;
    height: 100px;
  }

  .empty-text {
    display: block;
    color: #A6ADB6;
    margin: 10px;
  }
}
 
 </style>
   