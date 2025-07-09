# UserRoleSwitcher - Optimasi & Panduan Penggunaan

UserRoleSwitcher adalah komponen development tool yang memungkinkan developer untuk dengan mudah beralih antar role (Investor, Petani, Admin, User) untuk testing berbagai fitur aplikasi Vridix.

## ✨ Fitur Utama

### 1. **Toggle Show/Hide**

- **Tombol Toggle**: Tombol kecil di pojok kanan atas (🔄) untuk menampilkan/menyembunyikan switcher
- **Keyboard Shortcut**: `Ctrl+Shift+R` untuk toggle cepat
- **Persistence**: State visibility tersimpan di localStorage
- **Auto-Hide**: Otomatis tersembunyi di production, hanya muncul di development

### 2. **Drag & Drop**

- **Draggable**: Bisa dipindahkan dengan drag mouse
- **Smart Positioning**: Tidak bisa keluar dari viewport
- **Visual Feedback**: Scale effect saat dragging

### 3. **Expand/Collapse**

- **Mode Compact**: Tampilan ringkas dengan role buttons saja
- **Mode Expanded**: Tampilan lengkap dengan description dan quick actions
- **Auto-Collapse**: Otomatis collapse setelah switch role

### 4. **Quick Actions**

- **Reset**: Hapus semua data localStorage dan reload page
- **Copy**: Copy data user saat ini ke clipboard
- **Visual Feedback**: Toast notification untuk setiap action

### 5. **Role Management**

- **4 Role**: Investor, Petani, Admin, User
- **Visual Indicators**: Icon, badge active, dan styling berbeda
- **Smooth Transition**: Animasi dan feedback yang smooth

## 🎯 Cara Penggunaan

### Menampilkan/Menyembunyikan

```javascript
// Keyboard shortcut
Ctrl + Shift + R;

// Atau klik tombol toggle di pojok kanan atas
// Tombol akan selalu terlihat (semi-transparan) bahkan saat switcher hidden
```

### Memindahkan Posisi

```javascript
// Drag dari area header (bagian atas widget)
// Jangan drag dari area content/tombol
```

### Switch Role

```javascript
// Klik tombol role yang diinginkan
// Auto-collapse setelah switch
// Toast notification akan muncul
```

### Quick Actions

```javascript
// Reset: Hapus semua data localStorage
// Copy: Copy data user ke clipboard
```

## 🔧 Konfigurasi

### Environment Detection

```javascript
// Otomatis muncul di development
const isDev = import.meta.env.DEV || window.location.hostname === "localhost";

// Atau manual enable via localStorage
localStorage.setItem("vridix_show_role_switcher", "true");
```

### Posisi Default

```javascript
// Default: bottom-right (16px dari kanan & bawah)
const [position, setPosition] = useState({ x: 16, y: 16 });
```

## 📱 Responsive Design

### Mobile Friendly

- **Touch Support**: Bisa di-drag di mobile
- **Responsive Width**: Mengikuti ukuran viewport
- **Max Width**: `calc(100vw - 32px)`
- **Max Height**: `calc(100vh - 32px)`

### Breakpoints

```css
/* Mobile */
@media (max-width: 768px) {
  width: w-64; /* 256px */
}

/* Desktop */
@media (min-width: 769px) {
  width: w-80 (expanded); /* 320px */
}
```

## 🎨 Styling & Theming

### Color Scheme

```javascript
// Dark theme default
bg - gray - 900; // Background utama
border - gray - 600; // Border
text - white; // Text primary
text - gray - 400; // Text secondary

// Active role
bg - green - 600; // Active background
border - green - 500; // Active border
text - white; // Active text

// Hover states
hover: bg - gray - 700;
hover: border - gray - 500;
hover: text - white;
```

### Animations

```javascript
// Transitions
transition-all duration-300 // Smooth transitions
hover:scale-105 // Hover scale effect
cursor-grabbing scale-105 // Dragging effect

// Spinning icon
animate-spin // Loading/active indicator
```

## 🔄 State Management

### Local State

```javascript
const [isVisible, setIsVisible] = useState(false); // Visibility
const [isExpanded, setIsExpanded] = useState(false); // Expand state
const [isDragging, setIsDragging] = useState(false); // Drag state
const [position, setPosition] = useState({ x: 16, y: 16 }); // Position
```

### Persistence

```javascript
// Visibility state
localStorage.setItem("vridix_show_role_switcher", "true/false");

// Position bisa ditambahkan jika diperlukan
localStorage.setItem("vridix_switcher_position", JSON.stringify(position));
```

## 🧪 Testing

### Manual Testing

1. **Visibility Toggle**

   - Klik tombol toggle
   - Gunakan keyboard shortcut
   - Cek persistence setelah reload

2. **Drag Functionality**

   - Drag ke berbagai posisi
   - Cek boundary detection
   - Test di mobile

3. **Role Switching**

   - Switch ke semua role
   - Cek data persistence
   - Verify route protection

4. **Quick Actions**
   - Test reset functionality
   - Test copy to clipboard
   - Verify toast notifications

### Automated Testing

```javascript
// Component testing
import { render, screen, fireEvent } from "@testing-library/react";
import UserRoleSwitcher from "./UserRoleSwitcher";

// Test visibility toggle
test("should toggle visibility", () => {
  render(<UserRoleSwitcher />);
  const toggleBtn = screen.getByTitle("Toggle Role Switcher");
  fireEvent.click(toggleBtn);
  // Assert visibility changes
});

// Test role switching
test("should switch roles", () => {
  render(<UserRoleSwitcher />);
  const investorBtn = screen.getByText("Investor");
  fireEvent.click(investorBtn);
  // Assert role change
});
```

## 🚀 Performance

### Optimizations

1. **useCallback**: Memoize toggle function
2. **Conditional Rendering**: Hanya render jika visible
3. **Event Cleanup**: Proper cleanup event listeners
4. **Debounced Drag**: Smooth drag performance

### Bundle Size

- **Lightweight**: ~3KB gzipped
- **Tree Shaking**: Unused code elimination
- **Lazy Loading**: Bisa di-lazy load jika diperlukan

## 🔒 Security

### Production Safety

```javascript
// Otomatis hidden di production
const isDev = import.meta.env.DEV || window.location.hostname === "localhost";
const showSwitcher =
  localStorage.getItem("vridix_show_role_switcher") === "true";
setIsVisible(isDev || showSwitcher);
```

### Data Protection

- **No Sensitive Data**: Hanya mock data untuk testing
- **Client-side Only**: Tidak mengirim data ke server
- **Temporary State**: Data hilang setelah refresh (kecuali localStorage)

## 🛠️ Troubleshooting

### Common Issues

1. **Switcher Tidak Muncul**

   ```javascript
   // Cek environment
   console.log("DEV:", import.meta.env.DEV);
   console.log("Hostname:", window.location.hostname);

   // Manual enable
   localStorage.setItem("vridix_show_role_switcher", "true");
   ```

2. **Drag Tidak Berfungsi**

   ```javascript
   // Pastikan drag dari header, bukan content
   onMouseDown = { handleMouseDown }; // Hanya di container utama
   ```

3. **Keyboard Shortcut Tidak Bekerja**
   ```javascript
   // Cek event listener
   useEffect(() => {
     const handleKeyPress = (e) => {
       if (e.ctrlKey && e.shiftKey && e.key === "R") {
         e.preventDefault();
         toggleSwitcher();
       }
     };
     window.addEventListener("keydown", handleKeyPress);
     return () => window.removeEventListener("keydown", handleKeyPress);
   }, [toggleSwitcher]);
   ```

## 🔄 Future Enhancements

### Planned Features

1. **Position Persistence**: Save position to localStorage
2. **Custom Themes**: Multiple color schemes
3. **Role Presets**: Custom role configurations
4. **Export/Import**: Save/load role configurations
5. **Keyboard Navigation**: Arrow keys navigation
6. **Accessibility**: ARIA labels, screen reader support

### API Integration

```javascript
// Future: Real API integration
const switchToRole = async (roleData) => {
  try {
    await apiService.switchRole(roleData);
    updateUser(roleData);
    showToast(`Successfully switched to ${roleData.role}!`, "success");
  } catch (error) {
    showToast(`Failed to switch role: ${error.message}`, "error");
  }
};
```

## 📋 Checklist Penggunaan

### Pre-Development

- [ ] Pastikan environment development
- [ ] Cek UserRoleSwitcher terintegrasi di App.jsx
- [ ] Verify AuthContext berfungsi normal

### During Development

- [ ] Gunakan keyboard shortcut untuk toggle cepat
- [ ] Switch role sesuai fitur yang sedang dikembangkan
- [ ] Manfaatkan quick actions untuk reset/copy data

### Testing

- [ ] Test semua role dan route protection
- [ ] Cek responsive design di berbagai device
- [ ] Verify drag functionality
- [ ] Test keyboard shortcuts

### Production

- [ ] Pastikan switcher hidden di production
- [ ] Remove debug console.log
- [ ] Verify no sensitive data exposure

---

**UserRoleSwitcher** adalah tool yang sangat powerful untuk development dan testing aplikasi Vridix. Dengan fitur toggle hide/show, drag & drop, dan quick actions, developer dapat dengan mudah menguji berbagai skenario dan role dalam aplikasi.
