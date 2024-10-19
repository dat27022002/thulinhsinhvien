import React, { useEffect, useState } from 'react';
import cx from 'classnames';

import Button from '~/components/Button';
import Modal from '~/components/Modal';

// Danh sách sinh viên mẫu
const students = ['Sinh viên 1', 'Sinh viên 2'];

const Home = () => {
    const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
    const [seconds, setSeconds] = useState(30);
    const [process, setProcess] = useState(0);
    const [isModal, setIsModal] = useState(false);

    const result = { choose: 20, notChoose: 35 };

    useEffect(() => {
        let interval;

        if (process === 1 && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
        } else if (seconds === 0) {
            // Khi bộ đếm kết thúc, chuyển sang sinh viên tiếp theo
            if (currentStudentIndex < students.length - 1) {
                setSeconds(30); // Reset lại thời gian
                setProcess(2);
            } else {
                setProcess(2); // Dừng lại khi đã qua hết sinh viên
            }
        }

        return () => clearInterval(interval);
    }, [process, seconds, currentStudentIndex]);

    const startTimer = () => {
        setProcess(1);
        setSeconds(30); // Reset thời gian khi bắt đầu
    };

    const showNextStudent = () => {
        if (currentStudentIndex < students.length - 1) {
            setCurrentStudentIndex((pre) => pre + 1);
            setProcess(0);
        }
    };

    const openModal = () => {
        setIsModal(true);
    };

    const closeModal = () => {
        setIsModal(false);
    };

    return (
        <div className={cx('flex justify-center ')}>
            <div className={cx('mt-16')}>
                <div
                    className={cx(
                        'flex  items-center w-[800px]',
                        process === 1 ? 'justify-between ' : 'justify-center',
                    )}
                >
                    <div
                        className={cx(
                            'w-[500px] py-4 flex justify-center font-medium rounded-lg  bg-primary-200',
                            'border border-solid border-primary-500',
                        )}
                    >
                        Thí Sinh {currentStudentIndex + 1}: {students[currentStudentIndex]}
                    </div>
                    {process === 1 && (
                        <div
                            className={cx(
                                'border border-solid border-primary-200 ',
                                'rounded-full flex justify-center items-center h-24 w-24 bg-primary-200',
                                'font-semibold text-[24px]',
                                seconds <= 10 && 'bg-red-400',
                            )}
                        >
                            {seconds} S
                        </div>
                    )}
                </div>

                <div className={cx('h-[calc(100vh-160px)]  flex items-center justify-center')}>
                    <div className={cx('flex gap-28', process !== 1 && 'hidden')}>
                        <Button large onClick={openModal}>
                            Bình chọn
                        </Button>
                        <Button large>Không bình chọn</Button>
                    </div>

                    <div className={cx('flex flex-col gap-8', process !== 0 && 'hidden')}>
                        <div>Chưa đến thời gian bình chọn cho thí sinh</div>
                        <Button large onClick={startTimer}>
                            Bắt đầu
                        </Button>
                    </div>
                    <div className={cx('flex flex-col gap-8 items-center', process !== 2 && 'hidden')}>
                        <div className={cx('flex gap-28 items-end')}>
                            <div className={cx('flex flex-col items-center')}>
                                <div className={cx('text-[24px] mb-2 font-medium')}>{result.choose}</div>
                                <div
                                    className={cx(
                                        'border border-solid border-primary-500 rounded-lg w-20 bg-primary-200',
                                    )}
                                    style={{ height: `${result.choose * 5}px` }}
                                ></div>
                                <div className={cx('mt-2 font-medium text-2xl')}>Bình chọn</div>
                            </div>
                            <div className={cx('flex flex-col items-center')}>
                                <div className={cx('text-[24px] mb-2 font-medium')}>{result.notChoose}</div>
                                <div
                                    className={cx(
                                        'border border-solid border-primary-500 rounded-lg w-20 bg-primary-200',
                                    )}
                                    style={{ height: `${result.notChoose * 5}px` }}
                                ></div>
                                <div className={cx('mt-2 font-medium text-2xl')}>Không bình chọn</div>
                            </div>
                        </div>
                        <Button large onClick={showNextStudent}>
                            Tiếp theo
                        </Button>
                    </div>
                </div>
            </div>
            {isModal && (
                <Modal>
                    <div className={cx('p-4')}>
                        <div>Bạn chắc chắn muốn bình chọn</div>
                        <div className={cx('flex justify-between mt-8')}>
                            <Button medium onClick={closeModal}>
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
