import {CategoriesResponse} from "~/data/categories";
import {useBaseUrl} from "~/composables/useBaseUrl";
export default defineEventHandler(async (event) => {
    const url = `${useBaseUrl}/admin/categories`; // Update with your actual API URL
    try {
        return await $fetch<CategoriesResponse>(url);
    } catch (error) {
        return { categories: [] }; // Handle errors as needed
    }
});