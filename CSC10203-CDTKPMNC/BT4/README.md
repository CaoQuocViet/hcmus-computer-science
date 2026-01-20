# Lập trình chức năng Tra cứu nhân viên với Dịch vụ Dữ liệu

BT4/
├── data_service.js   # Dịch vụ Dữ liệu (REST API) - port 3580
├── server.js         # Server chính gọi Dịch vụ - port 3579
└── package.json

Cách chạy:
cd BT4
npm install

# Terminal 1: Chạy Dịch vụ Dữ liệu
npm run data

# Terminal 2: Chạy Server chính
npm start