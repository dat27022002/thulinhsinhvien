import classNames from 'classnames/bind';
import React from 'react';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ children, className, medium, large, onClick, type = 'button', ...props }) {
    return (
        <button
            className={cx(
                'rounded-lg bg-color-white px-[11px] py-[5px] text-primary',
                'hover:bg-primary hover:text-color-white',
                'border border-solid border-primary',
                'transition-all duration-300',
                medium && '!rounded-xl !px-[15px] !py-[13px] !text-[16px]',
                large && '!rounded-xl !px-[21px] !py-[17px] !text-[18px]',
                'button2',
                {
                    [className]: !!className,
                },
            )}
            onClick={onClick}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
