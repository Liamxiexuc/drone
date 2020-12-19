import { post } from './axios';

export const addInstructions = (instructions) => {
    const url = '/partOne';
    const data = {
        instructions
    };
    return post(url, data).then((reponse) => reponse.data);
}