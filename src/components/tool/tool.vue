<template>
    <div class="box">
        <div class="fuctionBox">
            <div class="fuctionBox_header">
                <!-- <div class="left">
            <img src="./imgs/top_arrow.png" alt="" style="width: 35px;height: 35px;">
          </div> -->
                <div class="center">功能区</div>
            </div>
            <el-divider />
            <div>
                <article>视图</article>
                <div class="my-2 items-center text-sm flex">
                    <el-radio-group v-model="viewvalue" class="ml-4" :change="changeView()" style="width: 95%;">
                        <el-radio v-for="(item, index) in viewoptions" :label="index + 3" style="width: 33%;">{{ item.label
                        }}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <el-divider />
            <div>
                <article>3D切面</article>
                <div class="my-2 items-center text-sm flex">
                    <el-radio-group v-model="planevalue" class="ml-4" :change="changeClipPlane()" :disabled="disabled">
                        <el-radio v-for="(item, index) in clipPlane_options" :label="item.value" style="width: 50%;">{{
                            item.label }}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <el-divider />

            <div class="flex1">
                <article>方向立方体</article>
                <el-switch v-model="value_OrientCube" :change="show_OrientCube()" :disabled="disabled" />
            </div>
            <div class="flex1">
                <article>3D十字线</article>
                <el-switch v-model="value_3DHair" :change="show_3DHair()" :disabled="disabled" />
            </div>
            <div class="flex1">
                <article>10cm标尺</article>
                <el-switch v-model="value_ruler" :change="show_ruler()" />
            </div>
            <div>
                <div class="flex1">
                    <article>绘图标注</article>
                    <el-switch v-model="ifdraw" :change="draw()" />
                </div>

                <div v-if="ifdraw" class="flex1">
                    <div class="drawO">
                        <div>颜色</div>
                        <el-select v-model="pen_color" class="m-2" placeholder="绘图颜色选择" size="small"
                            :change="setColorFill()">
                            <el-option v-for="item in pen_colors" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div class="drawO">
                        <div>透明度</div>
                        <el-input-number v-model="drawOpacity" :min="0" :max="1" size="small" controls-position="right"
                            :step="0.1" @change="setOpacity()" style="width: 75px;" />
                    </div>
                    <!-- <div>
                    <el-checkbox v-model="iffill" label="是否填充" size="default" style="width: 80px;" />
                </div> -->
                </div>
                <div class="flex1">
                    <article>拖拽</article>
                    <el-select v-model="rigthclick_option" class="m-2" placeholder="右键功能选择" size="default"
                        :change="changerigthclick()" style="width: 100px;">
                        <el-option v-for="item in rigthclick_options" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </div>
                <div class="flex1">
                    <article>材质</article>
                    <el-select v-model="colormap" class="m-2" placeholder="材质" size="default" :change="changeColorMap()"
                        style="width: 100px;">
                        <el-option v-for="item in colormaps" :key="item" :label="item" :value="item" />
                    </el-select>
                </div>
                <div class="flex1">
                    <div class="flex1">
                        <el-button type="primary" @click="saveImagePng">保存为png</el-button>
                    </div>
                    <div class="flex1">
                        <el-button type="primary" @click="saveImageNii">保存为Nii</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToolStore } from '../../store/tool'
import { storeToRefs } from "pinia";

const tool = useToolStore()
const {
    viewvalue,
    planevalue,
    value_OrientCube,
    value_3DHair,
    value_colorbar,
    disabled,
    value_ruler,
    rigthclick_option,
    ifdraw,
    iffill,
    pen_color,
    drawOpacity,
    colormaps,
    colormap
} = storeToRefs(tool)
const {
    nvInit,
    changeView,
    changeClipPlane,
    show_OrientCube,
    show_3DHair,
    show_colorbar,
    show_ruler,
    changerigthclick,
    draw,
    setColorFill,
    setOpacity,
    changeColorMap,
    saveImageNii,
    saveImagePng,
} = tool
const viewoptions = [
    // {
    //   //nv.sliceTypeAxial
    //   value: 0,
    //   label: '横断面',
    // },
    // {
    //   //nv.sliceTypeCoronal
    //   value: 1,
    //   label: '冠状面',
    // },
    // {
    //   //nv.sliceTypeSagittal
    //   value: 2,
    //   label: '矢状面',
    // },
    {
        value: 3,
        label: '三视图',
    },
    {
        //nv.sliceTypeRender
        value: 4,
        label: '3D视图',
    },

    {
        //nv.sliceTypeMultiplanar
        value: 5,
        label: '全部展示',
    },
]

//3D视图的切面选择
const clipPlane_options = [
    {
        value: 0,
        //arr: [2, 0, 0],
        label: '无',
    },
    {
        value: 1,
        //arr: [0, 0, 90],
        label: '横断面',
    },
    {
        value: 2,
        //arr: [0, 0, 0],
        label: '冠状面',
    },
    {
        value: 3,
        //arr: [0, 270, 0],
        label: '矢状面',
    },
]

//右键拖动功能选择
const rigthclick_options = [
    {
        value: 0,
        label: '无',
    },
    {
        value: 1,
        label: '对比',
    },
    {
        value: 2,
        label: '测量',
    },
    {
        value: 3,
        label: '平移',
    },
    {
        value: 4,
        label: '放缩',
    },
]

//绘图

//绘图颜色选择
const pen_colors = [
    {
        value: 0,
        label: '橡皮擦',
    },
    {
        value: 1,
        label: '红色',
    },
    {
        value: 2,
        label: '绿色',
    },
    {
        value: 3,
        label: '蓝色',
    },
    {
        value: 4,
        label: '黄色',
    },

    {
        value: 6,
        label: '紫色',
    },
    {
        value: 9,
        label: '棕色',
    },
]
// const colormaps = [
//     {
//         value: 'gray',
//         label: 'gray',
//     },
//     {
//         value: 'gold',
//         label: 'gold',
//     },
//     {
//         value: 'green',
//         label: 'green',
//     },
//     {
//         value: 'hotiron',
//         label: 'hotiron',
//     },
//     {
//         value: 'bronze',
//         label: 'bronze',
//     },
//     {
//         value: 'ROI_i256',
//         label: 'ROI_i256',
//     },
//     {
//         value: 'x_rain',
//         label: 'x_rain',
//     },
//     {
//         value: 'plasma',
//         label: 'plasma',
//     },
//     {
//         value: 'mako',
//         label: 'mako',
//     },
//     {
//         value: 'jet',
//         label: 'jet',
//     },
//     {
//         value: 'afni_blues_inv',
//         label: 'afni_blues_inv',
//     },
//     {
//         value: 'cubehelix',
//         label: 'cubehelix',
//     },

// ]


</script>

<style lang="less" scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.flex1 {
    .flex();
    justify-content: space-between;
    padding: 5px 2.5%;

    article {
        padding-left: 0;
    }
}

.sideBox {
    position: absolute;
    top: 0;
    height: 100vh;
    background-color: white;
}

.box {
    display: flex;
    justify-content: center;
    .sideBox();
    width: 20%;
    right: 0;
    overflow-y: hidden;
}


.fuctionBox {
    width: 95%;
    overflow-y: scroll;

    .fuctionBox_header {
        height: 7%;
        display: flex;
        //flex-direction: column;
        justify-content: center;
        align-items: center;

        .left {
            flex-shrink: 0;
        }

        .center {
            flex-grow: 1;
            text-align: center;
        }
    }

    :deep(.el-select) {
        .el-input {
            width: 100px;
        }
    }

    :deep(.el-radio) {
        margin: 0;
    }

    .drawO {
        padding: 10px 15px;
        .flex();
        flex-direction: column;

        div {
            width: 100%;
        }
    }
}

.fuctionBox::-webkit-scrollbar {
    display: none;
}

article {
    padding-left: 2.5%;
    font-size: 15px;
}
</style>