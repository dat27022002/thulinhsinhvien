import classNames from 'classnames/bind';
import React from 'react';

const cx = classNames;

function Button({ children, className, medium, large, onClick, type = 'button', disabled, ...props }) {
    return (
        <button
            className={cx(
                'rounded-lg bg-primary-500 px-[11px] py-[5px] text-color-white font-semibold',
                medium && '!rounded-xl !px-[15px] !py-[13px] !text-[18px]',
                large && '!rounded-xl !px-[21px] !py-[17px] !text-[20px]',
                {
                    [className]: !!className,
                },
            )}
            onClick={onClick}
            type={type}
            {...props}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;
