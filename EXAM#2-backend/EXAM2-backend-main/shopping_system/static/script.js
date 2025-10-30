// === 產品資料（保留你的資料；會在渲染時自動規整 image_url 路徑） ===
const products = [
 {'name': 'T-Shirt',       'price': 25, 'gender': '男裝', 'category': '上衣',   'image_url': './static/img/T-Shirt.png'},  /* 改善路徑註解 */
  {'name': 'Blouse',        'price': 30, 'gender': '女裝', 'category': '上衣',   'image_url': './static/img/Blouse.png'},
  {'name': 'Jeans',         'price': 50, 'gender': '通用', 'category': '褲/裙子', 'image_url': './static/img/Jeans.png'},
  {'name': 'Skirt',         'price': 40, 'gender': '女裝', 'category': '褲/裙子', 'image_url': './static/img/Skirt.png'},
  {'name': 'Sneakers',      'price': 60, 'gender': '通用', 'category': '鞋子',   'image_url': './static/img/Sneakers.png'},
  {'name': 'Leather Shoes', 'price': 80, 'gender': '男裝', 'category': '鞋子',   'image_url': './static//img/LeatherShoes.png'},
  {'name': 'Baseball Cap',  'price': 20, 'gender': '通用', 'category': '帽子',   'image_url': './static/img/BaseballCap.png'},
  {'name': 'Sun Hat',       'price': 25, 'gender': '女裝', 'category': '帽子',   'image_url': './static/img/SunHat.png'},
  {'name': 'Running Shoes', 'price': 85, 'gender': '通用', 'category': '鞋子',   'image_url': './static/img/RunningShoes.png'},
  {'name': 'Dress',         'price': 75, 'gender': '女裝', 'category': '上衣',   'image_url': './static/img/Dress.png'}
];


(function showUsername() {
  const username = localStorage.getItem('username');
  if (!username) return;

  const div = document.createElement('div');
  div.style.position = 'fixed';
  div.style.top = '12px';
  div.style.left = '12px';
  div.style.background = '#f3f4f6';
  div.style.padding = '8px 12px';
  div.style.border = '1px solid #d1d5db';
  div.style.borderRadius = '6px';
  div.style.zIndex = '20';
  div.innerHTML = `使用者：<strong>${username}</strong> <button id="logout-btn" style="margin-left:10px;">登出</button>`;
  document.body.appendChild(div);

  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('username');
    location.href = './page_login.html'; // 回到登入頁
  });
})();


//以下請自行新增或修改程式碼

(function ensureOrderButton() {
  if (!document.getElementById('place-order')) {
    const wrap = document.createElement('div');
    wrap.className = 'footer-actions';
    wrap.style.position = 'fixed';
    wrap.style.left = '12px';
    wrap.style.bottom = '12px';
    wrap.style.background = '#fff';
    wrap.style.border = '1px solid #e5e7eb';
    wrap.style.borderRadius = '8px';
    wrap.style.padding = '10px 12px';
    wrap.style.boxShadow = '0 6px 18px rgba(0,0,0,.06)';
    wrap.style.zIndex = '20';

    const btn = document.createElement('button');
    btn.id = 'place-order';
    btn.textContent = '下單';
    btn.disabled = true;
    btn.style.background = '#2563eb';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.padding = '8px 14px';
    btn.style.borderRadius = '6px';
    btn.style.cursor = 'pointer';

    const span = document.createElement('span');
    span.id = 'cart-summary';
    span.style.marginLeft = '12px';
    span.style.color = '#475569';

    wrap.appendChild(btn);
    wrap.appendChild(span);
    document.body.appendChild(wrap);
  }
})();




// === 狀態：每列的勾選與數量 ===
const rowState = new Map(); 

// === 工具：規整圖片路徑 ../static/... -> ./static/... 且移除多餘斜線 ===
function normalizeImg(url = '') {
  return url.replace(/\/{2,}/g, '/').replace('../static', './static');
}

// === 工具：規整圖片路徑 ../static/... -> ./static/... 且移除多餘斜線 ===
function normalizeImg(url = '') {
  return url.replace(/\/{2,}/g, '/').replace('../static', './static');
}

// === 顯示登入使用者名稱 & 登出 ===
(function showUsername() {
  const username = localStorage.getItem('username') || 'Guest';
  const userEl = document.getElementById('current-user');
  if (userEl) userEl.textContent = username;

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('username');
      location.href = '/page_login';
    });
  }
})();



// === 渲染產品表格（含 checkbox、± 數量、單列總金額） ===
function display_products(products_to_display) {
  const tbody = document.querySelector('#products table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  for (let i = 0; i < products_to_display.length; i++) {
    const p = products_to_display[i];
    const key = `${p.name}-${i}`;
    if (!rowState.has(key)) rowState.set(key, { checked: false, qty: 0 });

    const state = rowState.get(key);
    const price = Number(p.price) || 0;
    const total = price * (state.qty || 0);

    const product_info = `
      <tr data-key="${key}">
        <td><input type="checkbox" class="row-check" ${state.checked ? 'checked' : ''}></td>
        <td><img src="${normalizeImg(p.image_url)}" alt="${p.name}" style="width:56px;height:56px;object-fit:cover;border:1px solid #e5e7eb;border-radius:6px;"></td>
        <td>${p.name}</td>
        <td data-price="${price}">${price.toLocaleString()}</td>
        <td>${p.gender}</td>
        <td>${p.category}</td>
        <td>
          <div class="qty" style="display:inline-flex;align-items:center;gap:6px;">
            <!-- 新增：按鈕依照勾選/數量狀態啟用 -->
            <button type="button" class="btn-dec" style="padding:2px 8px;" ${state.qty <= 1 ? 'disabled' : ''}>-</button>
            <input type="number" class="qty-input" min="0" value="${state.qty}" style="width:64px;" ${state.checked ? '' : 'disabled'}>
            <button type="button" class="btn-inc" style="padding:2px 8px;" ${state.checked ? '' : 'disabled'}>+</button>
          </div>
        </td>
        <td class="row-total">${total.toLocaleString()}</td>
      </tr>
    `;
    tbody.insertAdjacentHTML('beforeend', product_info);

    // 新增：初始化每列按鈕狀態
    const tr = tbody.querySelector(`tr[data-key="${key}"]`);
    updateQtyButtons(tr);  // 新增函數，控制 ± 與 input 狀態
  }

  refreshSummary();
}

// 新增函數：控制 ± 按鈕與 input 是否可用
function updateQtyButtons(tr) {
    const qtyInput = tr.querySelector('.qty-input');
    const btnDec = tr.querySelector('.btn-dec');
    const btnInc = tr.querySelector('.btn-inc');
    const qty = Number(qtyInput.value || 0);
    const checked = tr.querySelector('.row-check').checked;

    qtyInput.disabled = !checked;
    btnInc.disabled = !checked;
    btnDec.disabled = !checked || qty <= 1;
}

  if (chk.checked) {
    if (Number(qtyInput.value) === 0) qtyInput.value = 1;
    qtyInput.disabled = false;
    btnInc.disabled = false;
    btnDec.disabled = Number(qtyInput.value) <= 1;
  } else {
    qtyInput.value = 0;
    qtyInput.disabled = true;
    btnInc.disabled = true;
    btnDec.disabled = true;
  }


// === 事件委派：處理 checkbox、± 按鈕、數量輸入 ===
(function bindTableEvents() {
  const tbody = document.querySelector('#products table tbody');
  if (!tbody) return;

  tbody.addEventListener('click', (e) => {
    const tr = e.target.closest('tr');
    if (!tr) return;
    const key = tr.getAttribute('data-key');
    const st = rowState.get(key) || { checked: false, qty: 0 };

    if (e.target.classList.contains('row-check')) {
      st.checked = e.target.checked;
      rowState.set(key, st);
      updateQtyButtons(tr);
      refreshSummary();
      return;
    }

    if (e.target.classList.contains('btn-dec')) {
      const input = tr.querySelector('.qty-input');
      const v = Math.max(1, Number(input.value || 1) - 1);
      input.value = v;
      st.qty = v;
      rowState.set(key, st);
      updateQtyButtons(tr);
      updateRowTotal(tr);
      refreshSummary();
      return;
    }

    if (e.target.classList.contains('btn-inc')) {
      const input = tr.querySelector('.qty-input');
      const v = Number(input.value || 1) + 1;
      input.value = v;
      st.qty = v;
      rowState.set(key, st);
      updateQtyButtons(tr);
      updateRowTotal(tr);
      refreshSummary();
      return;
    }
  });

  tbody.addEventListener('input', (e) => {
    if (!e.target.classList.contains('qty-input')) return;
    const tr = e.target.closest('tr');
    const key = tr.getAttribute('data-key');
    const st = rowState.get(key) || { checked: false, qty: 0 };
    let v = Math.max(1, Number(e.target.value || 1));
    e.target.value = v;
    st.qty = v;
    rowState.set(key, st);
    updateQtyButtons(tr);
    updateRowTotal(tr);
    refreshSummary();
  });
})();

function updateRowTotal(tr) {
  const price = Number(tr.querySelector('[data-price]')?.dataset?.price || 0);
  const qty = Number(tr.querySelector('.qty-input')?.value || 0);
  const totalCell = tr.querySelector('.row-total');
  if (totalCell) totalCell.textContent = (price * qty).toLocaleString();
}

// === 合計 & 下單 ===
function refreshSummary() {
  const tbody = document.querySelector('#products table tbody');
  if (!tbody) return;



  let selectedCount = 0;
  let totalQty = 0;
  let totalPrice = 0;

  tbody.querySelectorAll('tr').forEach(tr => {
    const chk = tr.querySelector('.row-check');
    const qty = Number(tr.querySelector('.qty-input')?.value || 0);
    const price = Number(tr.querySelector('[data-price]')?.dataset?.price || 0);
    if (chk?.checked && qty > 0) {
      selectedCount += 1;
      totalQty += qty;
      totalPrice += qty * price;
    }
  });

  const btnOrder = document.getElementById('place-order');
  if (btnOrder) {
    btnOrder.disabled = !(selectedCount > 0 && totalQty > 0);
    btnOrder.style.opacity = btnOrder.disabled ? '0.5' : '1';
    btnOrder.style.cursor = btnOrder.disabled ? 'not-allowed' : 'pointer';
  }


  const summaryEl = document.getElementById('cart-summary');
  if (summaryEl) summaryEl.textContent =
    `已選 ${selectedCount} 項、總數量 ${totalQty}、總金額 $${totalPrice.toLocaleString()}`;
}

// 綁定下單按鈕
(function bindOrderButton() {
  const btnOrder = document.getElementById('place-order');
  if (!btnOrder) return;
  btnOrder.addEventListener('click', () => {
    const tbody = document.querySelector('#products table tbody');
    if (!tbody) return;

    const orderItems = [];
    tbody.querySelectorAll('tr').forEach(tr => {
      const chk = tr.querySelector('.row-check');
      if (!chk?.checked) return;

      const qty = Number(tr.querySelector('.qty-input')?.value || 0);
      if (qty <= 0) return;

      const name = tr.children[2]?.textContent?.trim() || '';
      const price = Number(tr.querySelector('[data-price]')?.dataset?.price || 0);
      orderItems.push({ name, price, qty, total: price * qty });
    });

    if (!orderItems.length) return;

    // 建立 alert 文字
    const now = new Date();
    const dateStr = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')}`;
    const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    let alertMsg = `${dateStr} ${timeStr}，已成功下單:\n\n`;
    let totalPrice = 0;
    orderItems.forEach(item => {
      alertMsg += ` ${item.name}:  ${item.price} NT/件 x${item.qty}  共 ${item.total} NT \n\n`;
      totalPrice += item.total;
    });
    alertMsg += `此單花費總金額: ${totalPrice} NT`;

    alert(alertMsg);

    console.log('下單內容：', orderItems);

    // 可用 fetch/axios 發送至後端寫入 DB
  });
})();

// === 首次渲染 ===
document.addEventListener('DOMContentLoaded', () => {
  display_products(products);})