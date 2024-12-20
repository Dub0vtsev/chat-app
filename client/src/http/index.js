import axios from "axios"

const $host = axios.create({
    withCredentials: true
})

export { $host };