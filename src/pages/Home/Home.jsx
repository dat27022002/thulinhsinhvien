import React, { useEffect, useState } from 'react';
import cx from 'classnames';

import Button from '~/components/Button';
import Modal from '~/components/Modal';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // Địa chỉ server

// Danh sách sinh viên mẫu
const students = ['Sinh viên 1', 'Sinh viên 2'];

const Home = () => {
    const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
    const [seconds, setSeconds] = useState(30);
    const [process, setProcess] = useState(0);
    const [isModal, setIsModal] = useState(false);
    const [vote, setVote] = useState(true);

    //dunction gọi để chờ bắt đầu bình chọn
    const waitStart = () => {
        // Nhận tin nhắn từ server
        socket.on('message', (msg) => {
            startTimer();
        });

        // Dọn dẹp khi component unmount
        return () => {
            socket.off('message');
        };
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
        setVote(vote);
        setProcess(2);
        closeModal();
    };

    useEffect(() => {
        let interval;

        if ((process === 1 || process === 2) && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
        } else if (seconds === 0) {
            // Khi bộ đếm kết thúc, chuyển sang sinh viên tiếp theo
            if (currentStudentIndex < students.length - 1) {
                setCurrentStudentIndex((pre) => pre + 1);
                setSeconds(30); // Reset lại thời gian
                setProcess(0);
            } else {
                setProcess(0); // Dừng lại khi đã qua hết sinh viên
            }
        }

        return () => clearInterval(interval);
    }, [process, seconds, currentStudentIndex]);

    //nếu hết thời gian thì tự động gửi không bình chọn
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
                        <Button
                            large
                            onClick={openModal}
                            className={cx('w-[200px]', process === 2 && !vote && 'hidden')}
                        >
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
                            <Button medium onClick={() => handelVote(vote)}>
                                Có
                            </Button>
                            <Button medium onClick={closeModal}>
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
