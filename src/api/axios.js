import axios from 'axios'

const createApi = () => axios.create({
    baseURL: 'https://07bc2abb3aaa347c.mokky.dev',
    headers: {
        'Content-Type': 'application/json'
    }
})

const classicApi = createApi()

export const getProductById = async (id) => {
    const response = await classicApi.get(`/products/${id}`); 
    return response.data;
}

export { classicApi }