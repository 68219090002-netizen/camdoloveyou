// ฟังก์ชันเปลี่ยนหน้า
function showLogin() {
    document.getElementById('register-box').style.display = 'none';
    document.getElementById('login-box').style.display = 'block';
  }
  
  function showRegister() {
    document.getElementById('register-box').style.display = 'block';
    document.getElementById('login-box').style.display = 'none';
  }
  
  // เข้ารหัสรหัสผ่านด้วย SHA-256
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
  
  // สมัครสมาชิก
  async function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
  
    if (username === '' || password === '') {
      document.getElementById('register-message').innerHTML = '<div class="error">Please fill all fields.</div>';
      return;
    }
  
    if (password.length < 8) {
      document.getElementById('register-message').innerHTML = '<div class="error">Password must be at least 8 characters.</div>';
      return;
    }
  
    const hashedPassword = await hashPassword(password);
  
    localStorage.setItem('username', username);
    localStorage.setItem('password', hashedPassword);
  
    document.getElementById('register-message').innerHTML = '<div class="message">Registered successfully!</div>';
  
    document.getElementById('reg-username').value = '';
    document.getElementById('reg-password').value = '';
  
    // หลังสมัครสำเร็จ โชว์ Login ทันที
    showLogin();
  }
  
  // เข้าสู่ระบบ
  async function login() {
    const inputUsername = document.getElementById('login-username').value;
    const inputPassword = document.getElementById('login-password').value;
  
    const savedUsername = localStorage.getItem('username');
    const savedHashedPassword = localStorage.getItem('password');
  
    const hashedInputPassword = await hashPassword(inputPassword);
  
    if (inputUsername === savedUsername && hashedInputPassword === savedHashedPassword) {
      // ล็อกอินสำเร็จ — ยกตัวอย่าง redirect ไป popcat
      window.location.href = "https://www.tiktok.com/@thanak0rn_29/video/7529475245762317576?is_from_webapp=1&sender_device=pc";
    } else {
      document.getElementById('login-message').innerHTML = '<div class="error">Invalid username or password!</div>';
    }
  
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
  }

