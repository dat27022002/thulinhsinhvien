import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import Button from '~/components/Button';
import Modal from '~/components/Modal';
import { sendVoting, startVote, pauseVote } from '~/utils/service/audiences';
import { getProcess } from '~/utils/service/process';

const Home = ({ username }) => {
    const [process, setProcess] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isProcessing, setIsProcessing] = useState(true);
    const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
    const [currentStudent, setCurrentStudent] = useState('');
    const [isModal, setIsModal] = useState(false);
    const [vote, setVote] = useState(true);
    const [selected, setSelected] = useState(false);

    const navigate = useNavigate();

    const openModal = () => {
        setIsModal(true);
    };

    const closeModal = () => {
        setIsModal(false);
    };

    //hàm sử lý khi bình chọn hoặc không bình chọn
    const handelVote = async (vote) => {
        const option = vote ? 'LIKE' : 'DISLIKE';
        await sendVoting(username, currentStudent, option);
        toast.success('lựa chọn thành công');
        setVote(vote);
        setSelected(false);
        setProcess(2);
        closeModal();
    };

    //liên tục gọi process để chờ bắt đầu
    useEffect(() => {
        console.log('hello', isProcessing);
        if (isProcessing) {
            const intervalId = setInterval(async () => {
                const processData = await getProcess();
                // console.log('process', processData);
                setCurrentStudentIndex(processData.index);
                setCurrentStudent(processData.student);
                if (processData.isProcessing) {
                    setIsProcessing(false); //cờ lệnh để ngừng gọi process()
                    setProcess(1);
                    clearInterval(intervalId); // Dừng interval khi không còn xử lý
                } else {
                    setSeconds(processData.remainingTime);
                }
            }, 1000);
        }

        // Cleanup interval khi component unmounts
        // return () => clearInterval(intervalId);
    }, [isProcessing]);

    //xử lý đêm thời gian
    useEffect(() => {
        let interval;

        if ((process === 1 || process === 2) && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
        } else if (seconds === 0) {
            // Khi bộ đếm kết thúc, chuyển sang sinh viên tiếp theo
            if (currentStudentIndex < 6) {
                setIsProcessing(true);
                setSeconds(10);
                setProcess(0);
            } else {
                setProcess(0); // Dừng lại khi đã qua hết sinh viên
            }
        }

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [process, seconds, currentStudentIndex]);

    useEffect(() => {
        if (seconds === 0) {
            sendVoting(username, currentStudent, 'DISLIKE');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds]);

    //nếu chưa đăng nhập thì quay lại trang đăng nhập
    useEffect(() => {
        if (!username) navigate('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //enable  button
    useEffect(() => {
        setSelected(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('flex justify-center pt-20 h-screen')}>
            <div className={cx('mt-16 flex-1 flex flex-col justify-between')}>
                <div className={cx('w-full px-4 flex flex-col items-center gap-4 ')}>
                    <div
                        className={cx(
                            'w-full py-4 flex justify-center font-medium rounded-lg bg-primary-200 flex-1',
                            'border border-solid border-primary-500',
                        )}
                    >
                        Thí Sinh {currentStudentIndex}: {currentStudent}
                    </div>
                    {process !== 0 && (
                        <div
                            className={cx(
                                'border border-solid border-primary-500',
                                'rounded-full flex justify-center items-center h-24 w-24 bg-primary-200',
                                'font-semibold text-[24px]',
                                seconds <= 10 && 'bg-red-400',
                            )}
                        >
                            {seconds} S
                        </div>
                    )}
                </div>

                <div className={cx(' flex flex-col items-center  flex-1 mt-20')}>
                    <div
                        className={cx(
                            'flex gap-8  flex-col items-center mb-4',
                            process !== 1 && process !== 2 && 'hidden',
                        )}
                    >
                        <Button
                            large
                            onClick={openModal}
                            className={cx('w-[200px]', process === 2 && !vote && 'hidden', !selected && 'opacity-60')}
                            disabled={!selected}
                        >
                            Bình chọn
                        </Button>
                        <Button
                            large
                            onClick={openModal}
                            className={cx(
                                'w-[200px] !bg-red-400 ',
                                process === 2 && vote && 'hidden',
                                !selected && 'opacity-60',
                            )}
                            disabled={!selected}
                        >
                            Không bình chọn
                        </Button>
                    </div>

                    <div className={cx('flex flex-col gap-8', process !== 0 && 'hidden')}>
                        <div>Chưa đến thời gian bình chọn cho thí sinh</div>
                    </div>

                    <div className={cx('flex flex-col gap-8', process !== 2 && 'hidden')}>
                        <div>Cảm ơn bạn đã lựa chọn</div>
                    </div>

                    {/* <div className={cx('flex gap-4 mt-8')}>
                        <Button onClick={startVote}>Có</Button>
                        <Button onClick={pauseVote}>Không</Button>
                    </div> */}
                </div>
            </div>

            {isModal && (
                <Modal>
                    <div className={cx('p-4')}>
                        <div>Bạn chắc chắn với lựa chọn của mình</div>
                        <div className={cx('flex justify-between mt-8')}>
                            <Button
                                medium
                                onClick={() => {
                                    handelVote(vote);
                                }}
                            >
                                Có
                            </Button>
                            <Button medium onClick={() => setIsModal(false)}>
                                Không
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Home;
