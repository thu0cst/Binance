# Display binance with chart


## Source API and Socket

Binance-api-postman
https://github.com/binance/binance-api-postman?fbclid=IwAR23DVezETXySmd8AqJEHcNSaX3CpiacE8FjU_imD_M2LX-PxnKvO9B9B2g

Websocket
https://binance-docs.github.io/apidocs/spot/en/?fbclid=IwAR1hI26DJKsl3pMXdhqwKMhNg6HkJ5O8bO5z8qd9e9GTsyzvpKAZ-I2nNiE#websocket-market-streams

## Package

- ant-design
- react-use-websocket
- react-query
- axios
- apex chart

## Luồng xử lý

### Call Api
1. Gọi api lấy data
2. Format và set data vào chart
3. Gọi lại api sau mỗi 1 phút
4. Set lại data và gán data mới vào chart

### Web socket
1. Kết nối socket
2. Lấy phản hồi từ socket khi có thay đổi
3. Thêm giá trị phản hồi vào data chart
