import FakeBCryptHashProvider from '../providers/HashProvider/fakes/FakeBCryptHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('CreateUsersService', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeBCryptHashProvider();
        const createUsersService = new CreateUsersService(fakeUsersRepository, fakeHashProvider);

        const user = await createUsersService.execute({
            email: 'user@example.com',
            name: 'User Example',
            password: '12345'
        })

        expect(user).toHaveProperty('id');

    });

    it('should not be able to create new user with an exist email', async() => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeBCryptHashProvider();
        const createUsersService = new CreateUsersService(fakeUsersRepository, fakeHashProvider);

        await createUsersService.execute({
            email: 'user@example.com',
            name: 'User Example',
            password: '12345'
        })

        expect(createUsersService.execute({
            email: 'user@example.com',
            name: 'User Example',
            password: '12345'
        })).rejects.toBeInstanceOf(AppError);

    })
})
