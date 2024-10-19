import cx from 'classnames';

export default function Wrapper({ children }) {
    return (
        <div className="w-full ">
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
                <div
                    className={cx(
                        'animate-blob absolute left-2 top-20 h-[500px] w-[500px] rounded-full bg-primary-200',
                        'opacity-70 mix-blend-multiply blur-[150px] filter',
                    )}
                ></div>
                <div
                    className={cx(
                        'animate-blob animation-delay-2000 absolute right-32 top-20 h-[500px] w-[500px] rounded-full',
                        'bg-primary-200 opacity-70 mix-blend-multiply blur-[150px] filter',
                    )}
                ></div>
                <div
                    className={cx(
                        'animate-blob animation-delay-4000 absolute bottom-10 left-32 hidden h-[500px] w-[500px] rounded-full',
                        'bg-primary-200 opacity-70 mix-blend-multiply blur-[150px] filter xl:block',
                    )}
                ></div>
                <div
                    className={cx(
                        'animate-blob animation-delay-4000 absolute bottom-10 right-52 h-[500px] w-[500px] rounded-full',
                        'bg-primary-200 opacity-70 mix-blend-multiply blur-[150px] filter',
                    )}
                ></div>
                <div
                    className={cx(
                        'relative flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8',
                        'max-sm:w-full',
                    )}
                >
                    <div className={cx('mt-8 overflow-hidden bg-white/60  sm:flex sm:rounded-lg sm:shadow')}>
                        <div className="sm:w-full  ">
                            <div className="h-full px-4 py-8 sm:px-10 w-[400px] ">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
