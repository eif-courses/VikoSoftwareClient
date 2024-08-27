export default defineEventHandler(async (event) => {
    try {
        const response = await fetch('http://localhost:5296/user')
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
        return null
    }
})