# Display binance (BTCUSDT) with chart

## Chức năng
1. Lấy dữ liệu từ API, hiển thị trên biểu đồ
- Biểu đồ có 2 dạng: Biểu đồ đường, Biểu đồ nến
- Biểu đồ có thể lấy dữ liệu với interval: 1 phút, 1 giờ, 1 ngày
- Gọi lại API mỗi 1 phút 
2. Kết nối với websocket, khi socket gửi về sự thay đổi, hiển thị trên bản đồ
- Biểu đồ có 2 dạng: Biểu đồ đường, Biểu đồ nến
- Biểu đồ hiển thị dữ liệu real time nhờ websocket

## Demo
[Video demo on Youtube](https://youtu.be/AhegnrlV_q4)

## Source API and Socket

Binance-api-postman
https://github.com/binance/binance-api-postman?fbclid=IwAR23DVezETXySmd8AqJEHcNSaX3CpiacE8FjU_imD_M2LX-PxnKvO9B9B2g

Websocket
https://binance-docs.github.io/apidocs/spot/en/?fbclid=IwAR1hI26DJKsl3pMXdhqwKMhNg6HkJ5O8bO5z8qd9e9GTsyzvpKAZ-I2nNiE#websocket-market-streams

## Package

- axios
- ant-design: Thư viện ui
- react-use-websocket: Thư viện dùng để kết nối websocket trong React
- react-query: Hooks để tìm nạp, lưu vào bộ nhớ đệm và cập nhật dữ liệu không đồng bộ trong React
- apex chart: Thư viện dùng để hiển thị biểu đồ

## Luồng xử lý

### Call Api
1. Gọi api lấy data
2. Xử lý dữ liệu thô
3. Hiển thị dữ liệu vào biểu đồ
4. Gọi lại api sau mỗi 1 phút
5. Cập nhập lại data và hiển thị data mới trên biểu đồ 

![image](https://user-images.githubusercontent.com/49446708/120992505-de21ee00-c7ac-11eb-8c8d-3108c6cd1a81.png)

### Web socket
1. Kết nối socket
2. Lấy phản hồi từ socket khi có thay đổi
3. Xử lý dữ liệu thô
4. Cập nhập lại data và hiển thị data mới trên biểu đồ

![image](https://user-images.githubusercontent.com/49446708/120992865-3658f000-c7ad-11eb-8338-bf92ec401dbe.png)

