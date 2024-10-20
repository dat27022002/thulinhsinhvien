import React, { useState } from 'react';

import cx from 'classnames';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const CustomInput = ({
    name,
    type = 'text',
    placeholder = '',
    rightText,
    required,
    register,
    rules,
    label,
    error,
    disabled = false,
    className,
}) => {
    const [visibilePassword, setVisiblePassword] = useState(false);

    const changeVisiblePassord = () => setVisiblePassword(!visibilePassword);

    return (
        <div className={cx({ [className]: className })}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <div className={cx('relative')}>
                    <input
                        autoComplete={name}
                        id={name}
                        type={visibilePassword && type === 'password' ? 'text' : type}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        {...register(name, rules)}
                        className={cx(
                            'block w-full rounded-md border border-primary-200',
                            'px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500',
                            'sm:text-sm',
                            error && '!border-red-500',
                        )}
                    />

                    {type === 'password' && (
                        <div
                            className={cx('absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer')}
                            onClick={changeVisiblePassord}
                        >
                            {visibilePassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
                        </div>
                    )}

                    {rightText && (
                        <div className={cx('absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer')}>
                            {rightText}
                        </div>
                    )}
                </div>
                {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
            </div>
        </div>
    );
};

export default CustomInput;
