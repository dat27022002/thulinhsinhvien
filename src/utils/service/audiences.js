import { readData, updateDataWithTransaction, writeData } from '../firebase';

// Gọi hàm này để kiểm tra xem tài khoản tồn tại không
export async function login(username, password) {
    try {
        const account = await readData(`accounts/${username}`);
        if (account && account.password == password) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Xảy ra lỗi trong quá trình đăng nhập ', error);
        return false;
    }
}

// Gọi hàm này để gửi kết quả lên server -> option là LIKE / DISLIKE
export async function sendVoting(username, thisinh, option) {
    try {
        // Đọc thông tin bình chọn hiện tại của khán giả (là một mảng)
        let voteData = await readData(`accounts/${username}/vote`);
        const thisinhData = await readData(`examiness/${thisinh}`);

        // Nếu voteData chưa có, khởi tạo là một mảng trống
        if (!voteData) {
            voteData = [];
        }

        // Kiểm tra xem thí sinh đã được bình chọn chưa
        if (voteData.includes(thisinh)) {
            console.log(`${username} đã bình chọn cho thí sinh ${thisinh}.`);
            return { success: false, message: `Bạn đã bình chọn cho thí sinh ${thisinh} rồi.` };
        }

        // Nếu option là "LIKE", thêm thí sinh vào mảng bình chọn
        if (option === 'LIKE') {
            voteData.push(thisinh);
            await writeData(`audiences/${username}/vote`, voteData);

            // Sử dụng transaction để đảm bảo cập nhật an toàn
            await updateDataWithTransaction(`examiness/${thisinh}/sinhvien/vote`, (currentVotes) => {
                return (currentVotes || 0) + 1;
            });
            await updateDataWithTransaction(`examiness/${thisinh}/totalPoints`, (currentPoint) => {
                return (currentPoint || 0) + 0.5;
            });

            return { success: true, message: 'Bình chọn thành công!' };
        } else if (option === 'DISLIKE') {
            // Sử dụng transaction để cập nhật số lượng không bình chọn
            await updateDataWithTransaction(`examiness/${thisinh}/sinhvien/noVote`, (currentNoVotes) => {
                return (currentNoVotes || 0) + 1;
            });
            await updateDataWithTransaction(`examiness/${thisinh}/totalPoints`, (currentPoint) => {
                return (currentPoint || 0) - 0.5;
            });

            return { success: true, message: 'Bình chọn thành công!' };
        } else {
            return { success: false, message: 'Lựa chọn không hợp lệ.' };
        }
    } catch (error) {
        console.error(`Lỗi khi xử lý bình chọn của ${username}:`, error);
        return { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại sau.' };
    }
}
