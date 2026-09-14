import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://dccvrvderxpfgifppgtz.supabase.co';

const SUPABASE_ANON_KEY =
    'sb_publishable_aXS3_OxV_xUZnVrhBJGL9Q_akui7CTX';

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false
        }
    }
);

export function getUser() {
    try {
        return JSON.parse(
            localStorage.getItem('quidditchUser') || 'null'
        );
    } catch {
        return null;
    }
}

export function setUser(user) {
    localStorage.setItem(
        'quidditchUser',
        JSON.stringify(user)
    );
}

export function logout() {
    localStorage.removeItem('quidditchUser');
    window.location.href = 'index.html';
}

export function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }[char]));
}

export async function login(username, password, allowedRoles) {
    const { data, error } = await supabase.rpc('login_player', {
        p_username: username,
        p_password: password
    });

    if (error) {
        console.error('Ошибка Supabase:', error);
        throw new Error(error.message);
    }

    const user = Array.isArray(data) ? data[0] : data;

    if (!user) {
        throw new Error('Неверный логин или пароль.');
    }

    if (!allowedRoles.includes(user.role)) {
        throw new Error(
            'У этой учётной записи нет доступа к этому разделу.'
        );
    }

    setUser(user);

    return user;
}
