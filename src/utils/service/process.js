import { readData } from '../firebase';

// Gọi hàm này để lấy xem đang là thí sinh mấy khi, sau khi login thì sẽ chuyển đến phần của thí sinh đó
export async function getSteps() {
    const index = await readData('process/index');
    return index;
}

// Gọi hàm này để lấy số giây đếm ngược
export async function getStepsSeconds() {
    const process = await readData('process');
    const index = process.index;
    const steps = process.steps;

    return steps[index];
    // {
    //     isProcessing: false,         // Nếu là true thì chưa bắt đầu đếm ngược, gọi liên tục vì có thể sẽ tạm dừng thời gian
    //     remainingTime: 60
    // }
}
