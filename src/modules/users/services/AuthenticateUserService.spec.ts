import FakeBCryptHashProvider from '../providers/HashProvider/fakes/FakeBCryptHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUserService', () => {
    it('should be able to authenticate user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeBCryptHashProvider();
        const authenticateUsersService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
        const createUsersService = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUsersService.execute({
            name: 'User Example',
            email: 'user@example.com',
            password: '12345'
        })

        const response = await authenticateUsersService.execute({
            email: 'user@example.com',
            password: '12345'
        })

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    })
})
