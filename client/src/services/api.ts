import axios from "axios"

export const ApiService = {
    async getCity(text: string) {
        const response = await axios.get('https://suggest-maps.yandex.ru/v1/suggest?apikey=a2c96df1-8d73-4807-99b8-c9326424e1d9&results=5&strict_bounds=0&types=locality&text=Россия, ' + text)
        return await response.data
    }
}