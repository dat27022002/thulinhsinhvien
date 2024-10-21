import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import Button from '~/components/Button';
import Modal from '~/components/Modal';
import { sendVoting } from '~/utils/service/audiences';

// Danh sách sinh viên mẫu
const students = ['Sinh viên 1', 'Sinh viên 2'];

const Home = () => {
    const [process, setProcess] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isProcessing, setIsProcessing] = useState(true);
    const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
    const [students, setStudents] = useState([]); // Giả định bạn có danh sách sinh viên
    const [isModal, setIsModal] = useState(false);
    const [vote, setVote] = useState(true);

    const [cookies] = useCookies();
    const navigate = useNavigate();

    //dunction gọi để chờ bắt đầu bình chọn
    const waitStart = () => {
        // // Nhận tin nhắn từ server
        // socket.on('message', (msg) => {
        //     startTimer();
        // });
        // // Dọn dẹp khi component unmount
        // return () => {
        //     socket.off('message');
        // };
    };

    const startTimer = () => {
        setProcess(1);
        setSeconds(30); // Reset thời gian khi bắt đầu
    };

    const openModal = () => {
        setIsModal(true);
    };

    const closeModal = () => {
        setIsModal(false);
    };

    //hàm sử lý khi bình chọn hoặc không bình chọn
    const handelVote = async (vote) => {
        /**
         *
         * đoạn này dùng để gửi bình chọn tới server
         */
        await sendVoting();
        setVote(vote);
        setProcess(2);
        closeModal();
    };

    useEffect(() => {
        waitStart(); // Lần đầu gọi để lấy dữ liệu

        const intervalId = setInterval(async () => {
            const processData = await getProcess();
            setProcess(processData.index);
            setIsProcessing(processData.isProcessing);
            if (processData.isProcessing) {
                setSeconds(processData.remainingTime);
            } else {
                clearInterval(intervalId); // Dừng interval khi không còn xử lý
            }
        }, 250);

        // Cleanup interval khi component unmounts
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (seconds === 0) {
            /**
             *
             * call API gửi lựa chọn không bình chọn
             */
            setVote(false);
        }
    }, [seconds]);

    //gọi socket chờ bắt đầu
    useEffect(() => {
        waitStart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (!cookies['isUser']) navigate('/login');
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
                        Thí Sinh {currentStudentIndex + 1}: {students[currentStudentIndex]}
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
                        <Button large onClick={isModal} className={cx('w-[200px]', process === 2 && !vote && 'hidden')}>
                            Bình chọn
                        </Button>
                        <Button large className={cx('w-[200px] !bg-red-400 ', process === 2 && vote && 'hidden')}>
                            Không bình chọn
                        </Button>
                    </div>

                    <div className={cx('flex flex-col gap-8', process !== 0 && 'hidden')}>
                        <div>Chưa đến thời gian bình chọn cho thí sinh</div>
                    </div>

                    <div className={cx('flex flex-col gap-8', process !== 2 && 'hidden')}>
                        <div>Cảm ơn bạn đã lựa chọn</div>
                    </div>
                </div>
            </div>
            {isModal && (
                <Modal>
                    <div className={cx('p-4')}>
                        <div>Bạn chắc chắn với lựa chọn của mình</div>
                        <div className={cx('flex justify-between mt-8')}>
                            <Button medium onClick={() => {}}>
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
