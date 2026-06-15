const fs = require('fs');
const path = 'c:\\Users\\Michael\\Downloads\\website-structure-design\\lib\\mock-data.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace avatars
content = content.replace(/\/api\/placeholder\/64\/64/g, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80');
content = content.replace(/\/api\/placeholder\/48\/48/g, 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80');

// Replace images for specific experiences
content = content.replace(/id: 'exp1',([\s\S]*?)images: \['\/api\/placeholder\/800\/600', '\/api\/placeholder\/800\/600'\]/, `id: 'exp1',$1images: ['/exp1.png', 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=800&q=80']`);

content = content.replace(/id: 'exp2',([\s\S]*?)images: \['\/api\/placeholder\/800\/600', '\/api\/placeholder\/800\/600'\]/, `id: 'exp2',$1images: ['/exp2.png', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80']`);

content = content.replace(/id: 'exp3',([\s\S]*?)images: \['\/api\/placeholder\/800\/600', '\/api\/placeholder\/800\/600'\]/, `id: 'exp3',$1images: ['/exp3.png', 'https://images.unsplash.com/photo-1556206079-747a7a424d3d?auto=format&fit=crop&w=800&q=80']`);

content = content.replace(/id: 'exp4',([\s\S]*?)images: \['\/api\/placeholder\/800\/600', '\/api\/placeholder\/800\/600'\]/, `id: 'exp4',$1images: ['https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80']`);

content = content.replace(/id: 'exp5',([\s\S]*?)images: \['\/api\/placeholder\/800\/600', '\/api\/placeholder\/800\/600'\]/, `id: 'exp5',$1images: ['https://images.unsplash.com/photo-1504609774528-69473fb4f0fd?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80']`);

content = content.replace(/id: 'exp6',([\s\S]*?)images: \['\/api\/placeholder\/800\/600', '\/api\/placeholder\/800\/600'\]/, `id: 'exp6',$1images: ['https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80']`);

// Replace all remaining
content = content.replace(/\/api\/placeholder\/800\/600/g, 'https://images.unsplash.com/photo-1504280390467-339e1455d35d?auto=format&fit=crop&w=800&q=80');

fs.writeFileSync(path, content);
console.log('Mock data updated successfully');
