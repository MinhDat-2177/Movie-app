import { api } from "../../api/axios";


export const loginUser = async (username, password) => {
    try {
      const response = await api.post('/auth/login', {
        username, // sử dụng tham số truyền vào
        password, // sử dụng tham số truyền vào
        expiresInMins: 30 // tùy chọn, mặc định là 60 nếu không được cung cấp
      });
  
      console.log(response.data); // Hiển thị dữ liệu từ phản hồi
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error.message);
    }
  };