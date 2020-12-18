import { post } from './axios';

export const addInstructions = (instructions) => {
    const url = '';
    const data = {
        instructions
    };
    return post(url, data).then((reponse) => reponse.data);
}