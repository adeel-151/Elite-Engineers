const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/Admin.jsx',
  'src/components/admin/ProjectForm.jsx',
  'src/components/admin/ProjectGrid.jsx',
  'src/components/admin/GalleryManager.jsx',
  'src/components/admin/InquiriesViewer.jsx',
  'src/components/admin/ServicesManager.jsx',
  'src/components/admin/TeamManager.jsx',
  'src/components/admin/ClientsManager.jsx',
  'src/components/admin/FaqManager.jsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, 'frontend', file);
  if (!fs.existsSync(filePath)) return;
  
  let c = fs.readFileSync(filePath, 'utf8');
  
  // Light/Dark mode fixes
  c = c.replace(/\bbg-primary\b/g, 'bg-gray-50 dark:bg-primary');
  c = c.replace(/\bbg-secondary\b/g, 'bg-white dark:bg-secondary');
  c = c.replace(/\bborder-gray-800\b/g, 'border-gray-200 dark:border-gray-800');
  c = c.replace(/\bborder-gray-700\b/g, 'border-gray-300 dark:border-gray-700');
  c = c.replace(/\btext-gray-400\b/g, 'text-gray-500 dark:text-gray-400');
  c = c.replace(/\bbg-gray-800\b/g, 'bg-gray-100 dark:bg-gray-800');
  
  // Text white replacements (excluding specific cases)
  c = c.replace(/text-white/g, 'text-gray-900 dark:text-white');
  c = c.replace(/bg-accent text-gray-900 dark:text-white/g, 'bg-accent text-white');
  c = c.replace(/bg-red-500 text-gray-900 dark:text-white/g, 'bg-red-500 text-white');
  c = c.replace(/text-gray-900 dark:text-white placeholder-gray-500/g, 'text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500');

  // Fix buttons border radius (remove rounded-full)
  c = c.replace(/ rounded-full/g, '');
  c = c.replace(/file:rounded-full /g, '');
  
  // Restore avatar in TeamManager
  c = c.replace(/w-24 h-24 overflow-hidden/g, 'w-24 h-24 rounded-full overflow-hidden');

  fs.writeFileSync(filePath, c);
});
console.log('Done');
