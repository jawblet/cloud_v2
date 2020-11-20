import { useHistory } from 'react-router-dom';
import axios from 'axios'; 

export default function useDelete(id) {
    let history = useHistory();

    const deleteUser = async () => {
        try {
            await axios({
                method: 'DELETE',
                url: `users/${id}`
            }).then(res => {
                console.log(res);
                history.push('/');
            })
        } catch(err) {
            console.log(err);
        }
    }

    return {
        deleteUser
    }
}