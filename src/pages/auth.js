import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient'; // Supabaseクライアントをインポート
import { useRouter } from 'next/router';

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // ログイン処理
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
      // ログインに成功した場合
      router.push('/dashboard'); // ダッシュボードページにリダイレクト
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ログイン</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: '5px', padding: '10px', width: '300px' }}
      />
      <br />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: '5px', padding: '10px', width: '300px' }}
      />
      <br />
      <button onClick={handleLogin} style={{ margin: '5px', padding: '10px' }}>
        ログイン
      </button>
    </div>
  );
}
