import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
export const supabase=createClient('https://dccvrvderxpfgifppgtz.supabase.co','sb_publishable_aXS3_OxV_xUZnVrhBJGL9Q_akui7CTX',{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
export const getUser=()=>{try{return JSON.parse(localStorage.getItem('quidditchUser')||'null')}catch{return null}};
export const setUser=u=>localStorage.setItem('quidditchUser',JSON.stringify(u));
export const logout=()=>{localStorage.removeItem('quidditchUser');location.href='index.html'};
export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
export async function login(username,password,roles){const {data,error}=await supabase.rpc('login_player',{p_username:username,p_password:password});if(error)throw error;const u=Array.isArray(data)?data[0]:data;if(!u)throw Error('Неверный логин или пароль');if(!roles.includes(u.role))throw Error('Нет доступа к этому разделу');setUser(u);return u}