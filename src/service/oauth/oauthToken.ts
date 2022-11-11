import {Authorization,ID,Role} from '../../model';
import {db} from '../../utils';

//send token to oauth users
const sendToken = async (id: ID) => {
    console.log(id);
    const auth = new Authorization(id.id, db);
    auth.setRole(Role.User);
    await auth.createToken();
    return auth.generateToken('120s');
}

export {sendToken};