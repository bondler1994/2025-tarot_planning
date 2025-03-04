import { defineStore } from "pinia";
import { ref } from "vue";

export const useCardStore = defineStore('card', () => {
    const cardData = ref({
        id: null,
        name: '',
        is_upright: null,
        blessing_message: ''
    })

    function setCardData(data) {
        cardData.value = {...data}
    }

    return { cardData, setCardData }
})