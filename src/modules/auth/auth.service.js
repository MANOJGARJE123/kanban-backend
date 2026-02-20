import bcrypt from 'bcrypt';
import { createUser as createUserRepo, findUserByEmail as findUserByEmailRepo } from './auth.repository.js';
import { generateJwtToken } from '../../utils/jwt.js';


export const register = async (data) => {
    const existingUser = await findUserByEmailRepo(data.email);

    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const result = await createUserRepo(data.email, hashedPassword);

    return {
        id: result.rows[0].id,
        message: "User registered successfully"
    };
};

export const login = async (data) => {
    const user = await findUserByEmailRepo(data.email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password_hash);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    } 

    const token = generateJwtToken({ id: user.id, email: user.email});

    return {
        token,
        user: {
            id: user.id,
            email: user.email
        }
    };
};

