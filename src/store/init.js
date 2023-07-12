import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { Niivue } from "@niivue/niivue";
import { useRouter } from 'vue-router';


export const useInitStore = defineStore("init", () => {
    const $router = useRouter()
    const currentIndex = ref(-1)
    function returnIndex() {
        currentIndex.value = -1
        sessionStorage.setItem('currentIndex', currentIndex)
        $router.push('/')
    }
    return {
        currentIndex,
        returnIndex,
    }
})