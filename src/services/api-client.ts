import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'b93336ccc82a4f3392c801fbb43c9797'
    }
})