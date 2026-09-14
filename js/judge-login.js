import { login } from './supabase.js';

const form = document.querySelector('#loginForm');
const message = document.querySelector('#msg');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    message.textContent = 'Проверка данных…';
    message.className = '';

    const username = document
        .querySelector('#username')
        .value
        .trim();

    const password = document
        .querySelector('#password')
        .value;

    try {
        const user = await login(
            username,
            password,
            ['judge', 'admin']
        );

        console.log('Успешный вход:', user);

        window.location.href = 'judge.html';

    } catch (error) {
        console.error(error);

        message.textContent = error.message;
        message.className = 'error';
    }
});
