import { post } from './axios';

export const sendInstructions = (droneNumber, instructions) => {
    const url = droneNumber === 1 ? '/partOne' : '/partTwo';
    const data = {
        instructions
    };
    return post(url, data).then((reponse) => reponse.data);
}