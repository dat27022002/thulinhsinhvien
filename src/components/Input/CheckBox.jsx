import classNames from 'classnames';
import React, { useEffect, useState, useRef } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import Button from '../Button';

const cx = classNames;

function CheckBox({ listOptions = [], register, setValue, watch, name, className, top, placeholder = '' }) {
    const [valueInput, setValueInput] = useState(placeholder);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = () => {
        if (watch) {
            const seletedValues = watch(name).join(', ');
            if (seletedValues === '') setValueInput(placeholder);
            else setValueInput(seletedValues);
        }
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false); // Đóng component khi click ra ngoài
        }
    };

    const handleCancel = () => {
        setValueInput(placeholder);
        if (setValue) {
            setValue(name, []);
        }
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div
                className={cx('relative', {
                    [className]: className,
                })}
                ref={ref}
            >
                <button
                    onClick={toggleDropdown}
                    className={cx(
                        'w-full min-w-[180px] appearance-none bg-white px-3 py-2',
                        'flex items-center justify-between',
                        'rounded-md border border-solid border-primary-200 hover:border-primary',
                        valueInput === placeholder && 'text-color-text-secondnary',
                    )}
                    type="button"
                >
                    <span>{valueInput}</span>
                    <MdOutlineArrowDropDown size={20} />
                </button>
                <div
                    className={cx(
                        'absolute left-0 w-full overflow-hidden rounded transition-all duration-300',
                        'z-20 border border-solid border-primary bg-white shadow-lg',
                        top ? 'bottom-8 origin-bottom' : 'origin-top-left',
                        isOpen ? 'scale-y-100' : 'scale-y-0',
                    )}
                >
                    <div className="py-1">
                        {listOptions.map((value, index) => (
                            <label
                                className={cx(
                                    'cursor-pointer text-ellipsis text-nowrap px-3 py-2 hover:bg-primary-200',
                                    'flex items-center gap-2',
                                )}
                                key={index}
                                htmlFor={`${name}-${index}`}
                            >
                                <input type="checkbox" id={`${name}-${index}`} {...register(name)} value={value} />
                                <div>{value}</div>
                            </label>
                        ))}
                    </div>
                    {
                        <div className={cx('mb-2 flex justify-between px-1')}>
                            <Button onClick={handleChange}>Áp dụng</Button>
                            {valueInput !== placeholder && <Button onClick={handleCancel}>Bỏ chọn</Button>}
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default CheckBox;
