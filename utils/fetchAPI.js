import axios from 'axios';

export const baseUrl = "https://bayut.p.rapidapi.com"



export const fetchApi = async (url) => {
    const { data } = await axios.get((url),{
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': '4d5a63c976msh5d40d1b76a0d2a0p1d6330jsna077de190722'
          }
    });
    return data;
}

