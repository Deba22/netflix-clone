import axios from 'axios';

const instance=axios.create({
    baseURL:"http://api.themoviedb.org:8088/3/"
});

export default instance;