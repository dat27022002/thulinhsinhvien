1. Ấn đăng nhập -> gọi hàm login (true / false) -> true -> lưu lại username

2. Gọi hàm process -> {
    {
        index,
        student: steps[index].thisinh,
        isProcessing: steps[index].isProcessing,
        remainingTime: steps[index].remainingTime,
    }
    index -> 0 - 5 []

    isProcessing -> false -> 200ms gọi lại 1 lần -> true -> đồng hồ bắt đầu đếm ngược từ remainingTime 
                                                 -> false -> đồng hồ dừng đếm -> gọi process -> cập nhật remainingTime
}

3. gửi bình chọn -> sendVoting(
    username: tên người dùng lúc đăng nhập,
    thisinh: process.student,
    option: LIKE || DISLIKE
)