// Mock Data
let mockTables = [
    {
        id: "T01", name: "โต๊ะ 01", status: "unpaid",
        items: [
            { name: "นมชมพูเย็น", qty: 2, price: 45 },
            { name: "เซ็ตปังปิ้งเนยนม", qty: 1, price: 59 }
        ]
    },
    {
        id: "T03", name: "โต๊ะ 03", status: "unpaid",
        items: [
            { name: "ปังเย็นเครื่องแน่น", qty: 1, price: 89 },
            { name: "ของทอดทานเล่น", qty: 1, price: 79 }
        ]
    },
    {
        id: "T08", name: "โต๊ะ 08", status: "unpaid",
        items: [
            { name: "ปังปิ้งโอวัลตินภูเขาไฟ", qty: 2, price: 69 }
        ]
    }
];

let currentTableId = null;

const tablesGrid = document.getElementById("tables-grid");
const emptyBillMsg = document.getElementById("empty-bill-msg");
const billDetail = document.getElementById("bill-detail");
const billTableNo = document.getElementById("bill-table-no");
const billItems = document.getElementById("bill-items");
const billSubtotal = document.getElementById("bill-subtotal");
const billTotal = document.getElementById("bill-total");

function renderTables() {
    tablesGrid.innerHTML = "";
    
    if(mockTables.length === 0) {
        tablesGrid.innerHTML = "<p style='color: #64748b; grid-column: 1/-1;'>ไม่มีโต๊ะที่ค้างชำระเงินในขณะนี้</p>";
        return;
    }

    mockTables.forEach(table => {
        const div = document.createElement("div");
        div.className = `table-card ${table.id === currentTableId ? 'active' : ''}`;
        div.onclick = () => selectTable(table.id);
        
        let total = table.items.reduce((sum, item) => sum + (item.price * item.qty), 0);

        div.innerHTML = `
            <i class="fa-solid fa-utensils table-icon"></i>
            <div class="table-name">${table.name}</div>
            <div class="table-status">รอชำระ ${total} ฿</div>
        `;
        tablesGrid.appendChild(div);
    });
}

function selectTable(id) {
    currentTableId = id;
    renderTables(); // Update active state
    renderBill();
}

function renderBill() {
    const table = mockTables.find(t => t.id === currentTableId);
    
    if(!table) {
        emptyBillMsg.style.display = "flex";
        billDetail.style.display = "none";
        return;
    }

    emptyBillMsg.style.display = "none";
    billDetail.style.display = "flex";

    billTableNo.innerText = table.name;
    
    billItems.innerHTML = table.items.map(item => `
        <div class="bill-item">
            <span class="item-name">${item.name}</span>
            <span class="item-qty">x${item.qty}</span>
            <span class="item-price">${item.price * item.qty} ฿</span>
        </div>
    `).join("");

    const total = table.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    billSubtotal.innerText = total + " ฿";
    billTotal.innerText = total + " ฿";
}

function markAsPaid() {
    if(!currentTableId) return;

    // Remove table from mock data
    mockTables = mockTables.filter(t => t.id !== currentTableId);
    
    alert(`ชำระเงิน ${billTableNo.innerText} เรียบร้อยแล้ว!`);
    
    currentTableId = null;
    renderTables();
    renderBill();
}

// Global functions
window.markAsPaid = markAsPaid;
window.selectTable = selectTable;

// Init
renderTables();
