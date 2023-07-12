<template>
    <div class="box">
        <div class="mask"></div>
        <div class="upload">
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
            <el-upload class="upload-demo" drag action="none" :multiple="false" :limit="1" :on-change="loadSuccess"
                :auto-upload="false" :show-file-list="true" accept=".nii, .nii.gz" :before-upload="beforeUpload">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    拖拽文件或 <em>点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                    </div>
                </template>
            </el-upload>
            <div>
                <el-button type="primary" @click="confirmUpload()">打开图片</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus"
import { useToolStore } from '../../store/tool.js'
import { useInitStore } from '../../store/init.js'
import { storeToRefs } from "pinia";
import { uploadNii } from '../../utils/api'
import axios from 'axios';

const fileStore = useToolStore()
const init = useInitStore()

const { fileObject } = storeToRefs(fileStore)
const { addFileObject, getFileObject } = fileStore;

const { returnIndex } = init

const beforeUpload = (file) => {
    const flist = file.name.split('.')
    let typ = flist[flist.length - 1]
    if (typ == 'gz')
        typ = flist[flist.length - 2] + flist[flist.length - 1]
    const isNii = typ === 'nii.gz' || typ === 'nii'
    console.log(isNii)
    if (!isNii) {
        ElMessage.warning('只能上传nii或者nii.gz文件')
    }
    return isNii
}

const loadSuccess = (file) => {
    addFileObject(file)
    console.log(file)
    console.log(fileObject.value)
    ElMessage.success('上传成功')
}
async function confirmUpload() {
    const file = getFileObject()
    if (file[0]) {
        const formData = new FormData()
        console.log(file[0].raw)
        formData.append('file', file[0].raw)
        const url = await uploadNii(formData)
        console.log(url)
        // axios.post("/api/file/uploadNii", formData).then((responce) => {
        //     console.log(responce.data)
        // });
    }


}
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

    .mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .upload {
        position: absolute;
        left: 18.5%;
        top: 30%;
        width: 60%;
        height: 40%;
    }
}
</style>