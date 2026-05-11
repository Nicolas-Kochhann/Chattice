import { test, suite } from 'node:test';
import { strict as assert } from 'node:assert';
import { AuthService } from "../../src/modules/auth/auth.service.js";
import { MockRepository } from '../../src/modules/users/repositories/mock.repository.js';
import { EmailAlreadyExistsError } from '../../src/modules/auth/auth.errors.js';

suite('AuthService', () => {

    test('AuthService - registryUser success', async () => {
        const authService = new AuthService(new MockRepository());

        const { user, token, refreshToken } = await authService.registryUser({ name: 'John', email: 'john@example.com', password: 'password123' });
        assert(user !== null);
        assert(user.name === 'John');
        assert(user.email === 'john@example.com');
        assert(user.passwordHash !== 'password123'); // Should be hashed
        
        assert(token !== null);
        assert(typeof token === 'string');

        assert(refreshToken !== null);
        assert(typeof refreshToken === 'string');
    });


    test('AuthService - registryUser duplicate email', async () => {
        const authService = new AuthService(new MockRepository());

        // Register first user
        await authService.registryUser({ name: 'John', email: 'john@example.com', password: 'password123' });

        // Try to register with same email
        try {
            await authService.registryUser({ name: 'Jane', email: 'john@example.com', password: 'password456' });
            assert(false, 'Should have thrown EmailAlreadyExistsError');
        } catch (error) {
            assert(error instanceof EmailAlreadyExistsError);
        }
    });
    
});
