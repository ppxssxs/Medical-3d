<script setup>
import { NVImage } from '@niivue/niivue'
import { storeToRefs } from "pinia";
import tool from '../../components/tool/tool.vue'

import { useToolStore } from '../../store/tool.js'
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { uploadNii } from '../../utils/api'
import axios from 'axios';

onMounted(async () => {
  // const canvasEl = document.getElementById('gl')
  // let ctx = canvasEl.getContext('2d')
  nv.attachTo('gl')
  if (fileObject.value) {
    show()
  }
})

const router = useRouter()
const toolStore = useToolStore()
const { VolumeMsg, fileObject, viewvalue, colormaps, nvImgId } = storeToRefs(toolStore)
const { nvInit, getFileObject, changeColorMap } = toolStore

var nv = nvInit()
colormaps.value = nv.colormaps()
const describe = ref(false)
async function show() {
  const file = getFileObject()
  if (file[0]) {
    const formData = new FormData()
    console.log(file[0].raw)
    formData.append('file', file[0].raw)
    const url = await uploadNii(formData)
    // const url = await axios.post("/api/file/uploadNii", formData, {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //     'token': 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjZGY3ODE3MWIyNzQxZGQ4ZjE2ZDFkNGFjOTI1MmI5In0.eyJqdGkiOiJmRUhZektqekhuX0JRSmx2bXdFdWZRIiwiaWF0IjoxNjg4MzA1MjAzLCJleHAiOjE2ODgzOTE2MDMsIm5iZiI6MTY4ODMwNTE0Mywic3ViIjoiWU9VUl9TVUJKRUNUIiwiYXVkIjoiWU9VUl9BVURJRU5DRSIsImVtYWlsIjoiMjg0NjY1OTQxNUBxcS5jb20ifQ.BgYMBx4IR2h75Du-JA8WslaZlraeHwtA0QIrV5JyOTXP81hlnGGzSuCUqHOOu3gFX5rErC6s8sq6pgcD8aQq4YzKfRsW8l4RnBos5KGl_ZS-fpVOODv_kAXOfTnQFgcsxsMEoe7zfAkOogUDHSxycBzaMaETV5DXHzaLsestv-CLmRFnMSjpP3sN3uvFUyRpNPg5aYzPQjDXjpl2fnQk7G0QY5Sep8ia_tutIPOQjN-fOLhCMonZDCAgvlBS54-xLy26es4lQcp64HIto3JjwUK33ZghJX-W43T8IP8RdZehUBFQP2t9diuczOYEvy7RqUOa27kUH6Nf-u7TxOpiZg'
    //   }
    // })
    console.log(url)
    const nvImage = await NVImage.loadFromUrl({ url: "https://niivue.github.io/niivue-demo-images/mni152.nii.gz" })
    //const nvImage = await NVImage.loadFromFile({ file: file[0].raw })
    await nv.addVolume(nvImage)
    nvImgId.value = nvImage.id
    describe.value = true
  }
  else {
    const nvImage = await NVImage.loadFromUrl({ url: "https://niivue.github.io/niivue-demo-images/mni152.nii.gz" })
    console.log(nvImage)
    await nv.addVolume(nvImage)
    nvImgId.value = nvImage.id
    //changeColorMap(value, id)
    describe.value = true
  }
}
const viewRef = ref(null)

const preview = ref(5)

//双击画布的事件
const magnifyPlane = (e) => {
  preview.value = viewvalue.value
  //画布宽度
  const width = viewRef.value.clientWidth
  //画布高度
  const height = viewRef.value.clientHeight
  //鼠标距画布左侧的距离
  const locationX = e.pageX - viewRef.value.offsetLeft
  const locationY = e.pageY - viewRef.value.offsetTop
  let oneX, oneY
  switch (viewvalue.value) {
    case (3):
      //三视图时宽分成三分
      oneX = width / 3
      if (locationX <= oneX)
        viewvalue.value = 0
      else if (oneX < locationX && locationX <= oneX * 2)
        viewvalue.value = 1
      else
        viewvalue.value = 2
      nv.setSliceType(viewvalue.value)
      break
    // case (5):
    //   oneX = width / 2
    //   oneY = height / 2
    //   if (locationX <= oneX && locationY <= oneY)
    //     viewvalue.value = 1
    //   else if (oneX < locationX && locationY <= oneY)
    //     viewvalue.value = 2
    //   else if (locationX <= oneX && oneY < locationY)
    //     viewvalue.value = 0
    //   else
    //     viewvalue.value = 4
    //   nv.setSliceType(viewvalue.value)
    //   break
    default:
      break

  }
}

let oneplane = computed(() => {
  if (viewvalue.value == 3 || viewvalue.value == 5)
    return false
  return true
})

let allplane = computed(() => {
  if (viewvalue.value == 3)
    return false
  return true
})
let plane = computed(() => {
  switch (viewvalue.value) {
    case (0):
      return '横断面'
    case (1):
      return '冠状面'
    case (2):
      return '矢状面'
    case (4):
      return '3D视图'
    default:
      return ''
  }
})
const returnMuti = () => {
  viewvalue.value = preview.value
  nv.setSliceType(viewvalue.value)
}

let Comp = ref(true)
let flagComp = ref(true)

// 切换组件
const compChange = () => {
  flagComp.value = !flagComp.value
}


</script>

<template>
  <div class="root">
    <div class="show">
      <div class="flex showview">
        <div id="showcanvas" ref="viewRef" @dblclick="magnifyPlane($event)">
          <canvas id="gl">
          </canvas>
        </div>
      </div>
    </div>
    <div class="illustrate" v-if="describe">
      <div v-if="viewvalue == 5 || viewvalue == 4 ? false : true">
        <div v-if="!oneplane">
          双击视图放大
        </div>
        <div v-if="oneplane" @click="returnMuti">
          返回
        </div>
      </div>

    </div>
    <div class="msg">
      <article>圆点坐标(vox)：[{{ VolumeMsg.vox || "0 ,0 ,0" }}]</article>
      <article>现实距离(mm)：[{{ VolumeMsg.MM || "0 ,0 ,0" }}]</article>
      <article>灰度值(value)：{{ VolumeMsg.value || "0" }}</article>
    </div>
    <div v-if="describe">
      <div class="plane" v-if="!oneplane">
        <div v-if="!allplane">
          <article>横断面</article>
          <article>冠状面</article>
          <article>矢状面</article>
        </div>
        <div v-if="allplane">
          <div class="first">
            <article>冠状面</article>
            <article>矢状面</article>
          </div>
          <div class="second">
            <article>横断面</article>
            <article>3D视图</article>
          </div>
        </div>
      </div>
    </div>
    <div v-if="describe">
      <div class="plane" v-if="oneplane">
        <div>
          <article>
            {{ plane }}
          </article>
        </div>
      </div>
    </div>
    <tool />
  </div>
</template>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;

}

.root {
  width: 100%;
  position: relative;

  .show {
    width: 80%;

    .function {
      height: 10vh;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .nav_button {
        padding-left: 20px;
        margin-right: 20px;
      }

      .selectView {
        padding-left: 20px;
        width: 15%;
        height: 100%;
        .flex();
      }

      .setting {
        height: 40px;
        width: 40px;
        padding-right: 20px;
        margin-left: auto;
      }
    }
  }

  .illustrate {
    width: 15%;
    height: 3%;
    position: absolute;
    top: 5%;
    left: 32.5%;
    color: aliceblue;
    font-size: 20px;
    .flex();

  }

  .msg {
    position: absolute;
    top: 2%;
    left: 1%;
    color: aliceblue;
    width: 20%;

  }

  .showview {
    height: 100vh;
    background-color: black;
  }

  .plane {
    width: 64%;
    height: 5%;
    position: absolute;
    left: 8%;
    bottom: 5%;
    color: aliceblue;
    font-size: large;

    .first {
      position: absolute;
      bottom: 910%;
    }

    .second {
      position: absolute;
    }

    div {
      .flex();
      height: 100%;
      width: 100%;

      article {
        width: 35%;
        text-align: center;
        font-size: 20px;
      }
    }
  }
}

.comp {
  height: 50vh;
}

#showcanvas {
  width: 80%;
  height: 80%;

  // width: 40%;
  // height: 70%;
  #gl {
    //取消画布轮廓
    outline: none;
  }

}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slideone-enter-active,
.slideone-leave-active {
  transition: all 0.3s ease;
}

.slideone-enter-from,
.slideone-leave-to {
  transform: translateX(-100%);
}

.slidetwo-enter-active,
.slidetwo-leave-active {
  transition: all 0.3s ease;
}

.slidetwo-enter-from,
.slidetwo-leave-to {
  transform: translateY(-100%);
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
