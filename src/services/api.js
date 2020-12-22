import { post } from '../utils/axios';

export const sendInstructions = (droneNumber, instructions) => {
    const url = `/snapshots?droneNumber=${droneNumber}`;
    const data = {
        instructions,
    };
    return post(url, data).then((reponse) => reponse.data);
};
