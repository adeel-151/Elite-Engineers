const fs = require('fs');
const path = require('path');

async function runTest() {
  console.log('--- Starting Backend Test ---');
  
  // 1. Create or Login Admin
  console.log('1. Authenticating Admin...');
  let token = '';
  
  // Try to create admin
  let authRes = await fetch('http://localhost:5000/api/auth/setup-admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'testadmin@elite.com', password: 'password123' })
  });
  
  let authData = await authRes.json();
  
  if (authRes.status === 400 && authData.message === 'Admin already exists') {
    console.log('Admin exists, trying to login...');
    authRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'testadmin@elite.com', password: 'password123' })
    });
    authData = await authRes.json();
  }

  if (authData.token) {
    token = authData.token;
    console.log('✅ Admin Authenticated. Token received.');
  } else {
    console.log('❌ Auth Failed:', authData);
    return;
  }

  // 2. Create a dummy image file
  console.log('2. Creating dummy image for upload...');
  const imagePath = path.join(__dirname, 'dummy.png');
  const base64Img = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  fs.writeFileSync(imagePath, Buffer.from(base64Img, 'base64'));
  console.log('✅ Dummy image created.');

  // 3. Upload project with image
  console.log('3. Creating project with image upload...');
  const formData = new FormData();
  formData.append('title', 'Cloudinary Test Project');
  formData.append('category', 'Construction');
  formData.append('description', 'Testing if cloudinary upload works.');
  formData.append('location', 'Test City');
  
  const blob = new Blob([fs.readFileSync(imagePath)], { type: 'image/jpeg' });
  formData.append('images', blob, 'dummy.jpg');

  const projectRes = await fetch('http://localhost:5000/api/projects', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  const projectData = await projectRes.json();

  if (projectRes.status === 201) {
    console.log('✅ Project Created Successfully!');
    console.log('Images Array in DB:', projectData.data.project.images);
  } else {
    console.log('❌ Project Creation Failed:', projectData);
  }
  
  // Cleanup
  if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
}

runTest();
