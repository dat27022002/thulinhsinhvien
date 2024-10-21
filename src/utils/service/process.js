import { readData } from '../firebase';


// Lấy tiến trình cuộc thi 
export async function getProcess() {
    const process = await readData('process');
    const index = process.index;
    const steps = process.steps;

    return {
        index,
        student: steps[index].thisinh,
        isProcessing: steps[index].isProcessing,
        remainingTime: steps[index].remainingTime,
    };
}
