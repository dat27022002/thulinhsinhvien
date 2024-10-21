import { writeData } from './firebase';

export async function startVote() {
    await writeData('process/steps/0/isProcessing', true);
}

export async function pauseVote() {
    await writeData('process/steps/0/isProcessing', false);
}
