import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';

describe('SendForgotPasswordEmail', () => {
    it('should be able to recover password using email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider);

        await fakeUsersRepository.create({
            name: 'User Example',
            email: 'user@example.com',
            password: '123456',
        })

        await sendForgotPasswordEmail.execute({
            email: 'user@example.com'
        });

        expect(sendMail).toHaveBeenCalled();

    });
})
