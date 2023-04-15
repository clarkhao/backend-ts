import {Authorization,ID,Role,TokenType} from '../../model';
import {db} from '../../utils';

//send token to oauth users
const sendToken = (id: ID) => {
    console.log(id);
    const auth = new Authorization(id.id, db);
    auth.setRole(Role.User);
    return auth.createToken().then(res => {
        if(typeof res === 'boolean' && res)
            return auth.generateToken('120s', 'API');
        else
            return Promise.reject(new Error('token generating errors'));
    });
}

export {sendToken};