import cx from 'classnames';

export default function Wrapper({ children }) {
    return (
        <div className="w-full">
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
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
