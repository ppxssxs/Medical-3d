<template>
  <div class="box">
    <div class="center">
      <div class="X" @click="returnIndex">
        <svg t="1689138728285" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="3770" width="16" height="16">
          <path
            d="M119.233957 66.85913l837.898911 837.898911-52.368365 52.368365-837.898911-837.898911 52.368365-52.368365Z"
            fill="#fff" p-id="3771"></path>
          <path
            d="M957.140461 119.233957l-837.898911 837.898911-52.368365-52.368365 837.898911-837.898911 52.368365 52.368365Z"
            fill="#fff" p-id="3772"></path>
        </svg>
      </div>
      <div class="content">
        <div>

        </div>


      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script setup>
import { useInitStore } from '../../store/init.js'

const init = useInitStore()
const { returnIndex } = init

</script>

<style lang="less" scoped>
.box {
  position: absolute;
  width: 103.5%;
  height: 100%;
  top: 0;
  left: -3.5%;

  .X {
    position: absolute;
    top: -20px;
    right: -20px;
    z-index: 200;
  }

  .X:hover {
    svg {
      transform: scale(1.3);
    }
  }

  .center {
    z-index: 100;
    position: absolute;
    left: 10%;
    top: 10%;
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(130deg, #87CEFA, #ADD8E6);
    border-radius: 10px;
    box-shadow: 0 14px 28px #00000040, 0 10px 10px rgba(0, 0, 0, 0.22);

    .content {
      height: 90%;
      width: 95%;
      background-color: aliceblue;
      border-radius: 10px;
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

    }
  }

  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>