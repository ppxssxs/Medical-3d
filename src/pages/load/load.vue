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
            <div class="upload_box">
                <el-upload class="upload-demo" drag action="none" multiple  :limit="1"
                    :on-change="loadSuccess" :auto-upload="false" :show-file-list="true">
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        拖拽文件或 <em>点击上传</em>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip">
                        </div>
                    </template>
                </el-upload>
            </div>
            <article>支持.nii、.nii.gz文件上传</article>
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

const loadSuccess = (file, fileList) => {
    addFileObject(fileList)
    console.log(fileObject.value)
    ElMessage.success('上传成功')
}
async function confirmUpload() {
    const fileList = getFileObject();
    const formData = new FormData();
    console.log(fileObject.value);
    fileList.forEach((val, index) => {
        formData.append("files", val[0].raw);
        console.log(val)
        console.log(val[0].raw)
        //console.log(val[0].raw)
    });
    console.log(formData);
    // const headers = {
    //     "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7TMYhSONfkAM2z3a",
    //     "token": 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjZGY3ODE3MWIyNzQxZGQ4ZjE2ZDFkNGFjOTI1MmI5In0.eyJqdGkiOiI0eC1PeXFQa2JGR1pFVkpyY2FVY3R3IiwiaWF0IjoxNjg5MjQ0OTY5LCJleHAiOjE2ODkzMzEzNjksIm5iZiI6MTY4OTI0NDkwOSwic3ViIjoiWU9VUl9TVUJKRUNUIiwiYXVkIjoiWU9VUl9BVURJRU5DRSIsImVtYWlsIjoiaXdrakBmb3htYWlsLmNvbSJ9.NGJvQ2QRjwhTZs2IHau8JoozNEpcdVIo26UX20KmLU7fjPf7FJvIe8O66a33ndxSNDdzkyH_-jpAl7q5h9io5FF3GLl8TgpUvmg1Zph7oK_uKn7sQpqpBWyi60PrH-F5897nFl8wHSTTAUPbiMOrJ6fEN-7UiS5OyRemP00ing09XHXvvWMdPrKYPWzXhp_OKEXSUmTPbMvxpDpiw0JJbCgwpdnsj3DoaoMZed4P322qAQrR-V5y67nItqMrc6kLLjhGnqD7c2S62HGM6wiKsoR4c70dyAvF48tXhBYEk7UXeptFIq-rlkJ64n_gWvHbGmeh_U_ipMpWs4ZEh17bRw'
    // }
    const header = {
        "content-type": "multipart/form-data",
        "token": 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjZGY3ODE3MWIyNzQxZGQ4ZjE2ZDFkNGFjOTI1MmI5In0.eyJqdGkiOiJVcFpxQzVjWVd0X1REZlVLQWRVRGRRIiwiaWF0IjoxNjg5MjQ2OTc5LCJleHAiOjE2ODkzMzMzNzksIm5iZiI6MTY4OTI0NjkxOSwic3ViIjoiWU9VUl9TVUJKRUNUIiwiYXVkIjoiWU9VUl9BVURJRU5DRSIsImVtYWlsIjoiaXdrakBmb3htYWlsLmNvbSJ9.JneiA0unh2SXdt7Ak386sP-Hjxvr_JNHSrOoUExnREje3lrdIKgsxqHBDGuJp-v3Wa-A4PxTyIJOm6lcJipYXXrf1lFGbAOVxQjd_jpG2SJSSNaqZ_kC8fikS2F7VgFKlY81BokuD1k1XN8CjPMl8tb3EwsambPjHPUD3Ih9mIwyXU77WQqkvEVBpTi3q93zo-ZcactDIbsNNNEVZSnudU9lAkTROJCJqkHsYmzzK70rqrRn-62xkrp0uA2UrbReCIf1K5F0mVH9t7qXavWnl0l6A2-m0iPdX8h5T_028tEoldTWs9Z1QqFqp10CIIfEOs_eqGyeRLAWWGT3dexQ-A'
    }
    // await fetch('/api/file/uploadNii', {
    //     method: 'post',
    //     body:formData,
    //     mode: 'cors',
    //     headers: {
    //         "content-type": "multipart/form-data",
    //         "token": 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjZGY3ODE3MWIyNzQxZGQ4ZjE2ZDFkNGFjOTI1MmI5In0.eyJqdGkiOiJVM3Q3T1MwOXQ5RENlNjJycXlCd1F3IiwiaWF0IjoxNjg5MjQ4Nzc5LCJleHAiOjE2ODkzMzUxNzksIm5iZiI6MTY4OTI0ODcxOSwic3ViIjoiWU9VUl9TVUJKRUNUIiwiYXVkIjoiWU9VUl9BVURJRU5DRSIsImVtYWlsIjoiaXdrakBmb3htYWlsLmNvbSJ9.EaKlhDDiEKFv7fe7QF_I-fUAjfbY-k_G2WvstRGIVdqKAqmzILQoyYbfA84ZzeMKwReERCx9NHRt9qrLVljXxFN6kIWkzfIj4tcOfAEgzpFrkB0aYZz5pql2ldBWMhSk8J0Y74PTA0rP6xQX51uhvIi6MewG1wOiJnueLYfBpsynwpR9Bb_uxjkjFQmMUWRCeiAnVDK6UcMNhuCRI1xwNhkysCNtxAjkvvoPyNZktU-Z4Qrc-V9Cp9HURqNAcrG-Q5-WHt20cBX_UWVNf9Lyo_TPFgbYmIiGHpq79YeWwTytAPeqmP7agH-p7z96OnWYi2NyYmBAm_ekcG6Ok9LF2w'
    //     },
    // }).then((res) => {
    //     console.log(res)
    // })
    axios.post('/api/file/uploadNii', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "token": 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjZGY3ODE3MWIyNzQxZGQ4ZjE2ZDFkNGFjOTI1MmI5In0.eyJqdGkiOiI0blozaUp3WGVsVlVTbEc0elV3NW9nIiwiaWF0IjoxNjg5MjU1MzM5LCJleHAiOjE2ODkzNDE3MzksIm5iZiI6MTY4OTI1NTI3OSwic3ViIjoiWU9VUl9TVUJKRUNUIiwiYXVkIjoiWU9VUl9BVURJRU5DRSIsImVtYWlsIjoiaXdrakBmb3htYWlsLmNvbSJ9.BDEXlRdLBijczLjYL-cscoz_nJYTVp_XZswNC0xIQd2PafC6GKf2JZ3Ytz73bbeSVZ0dXN0UAeut5UD0BVlxlhH3YDkthlG0KUJKtBH7GKAh2oE1QdzcDvscMfYyoI-FJg-CVKFkaMMWcG_wO90Ltm_ifGwSNdyvweG5wLyNdCiSlPluth_gHIqhqrUvz0Su_pz5Cpuink8Q_7nBvHnawR44jdF1051Y9a0TDX4hRhfnE8AWHMhhByAiesWS2Y8kPx0PEXvyJlYDYomiHVo_HQ-LAbgIMmImm50aub1gE6m9x5-GaKKGJdS3Wx6fTF2nKEYIV18W7itus-4EDXGF_w'
        }
    }).then((res) => {
        console.log(res)
    })

    // const { data: res } = await axios({
    //     url: "http://10.33.127.120:5000/upload_file",
    //     method: 'post',
    //     data: formData

    // })
    //console.log(res);
    // .then((res) => {
    //     console.log(res)
    // })

    //uploadNii(formData);
    //console.log(res)
    // const url = 

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
        left: 30%;
        top: 25%;
        width: 40%;
        height: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: linear-gradient(130deg, #3498db, #8e44ad);
        border-radius: 10px;
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

        .upload_box {
            width: 60%;
            position: relative;

            :deep(.el-upload-list) {
                position: absolute;
                bottom: 0;
                width: 90%;
                left: 5%;

                span {
                    color: black;
                }

                svg {
                    path {
                        fill: black;
                    }
                }
            }
        }

        div {
            padding: 5px 0;
        }
    }
}
</style>