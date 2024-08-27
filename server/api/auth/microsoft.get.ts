import {useBaseUrl} from "~/composables/useBaseUrl";

export default defineEventHandler(async (event) => {
    try {
        const response = await fetch(`${useBaseUrl}/auth/microsoft`)
        const data = await response.text()
        return data
    } catch (error) {
        console.error(error)
        return null
    }
})