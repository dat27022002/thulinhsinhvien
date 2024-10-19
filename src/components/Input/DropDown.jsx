import classNames from 'classnames';
import React, { useEffect, useState, useRef } from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import Button from '../Button';

import { removeDiacritics } from '~/utils/common';

const cx = classNames;

function DropDown({ listOptions = [], search = false, register, setValue, name, className, top, placeholder = '' }) {
    const [valueInput, setValueInput] = useState(placeholder);
    const [valueSearch, setValueSearch] = useState('');
    const [listOptionVisible, setListOptionVisible] = useState(listOptions);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (value) => {
        setValueInput(value);
        setValueSearch('');
        if (setValue) {
            setValue(name, value);
        }

        setIsOpen(false);
    };

    const handleChangeValueSearch = (e) => {
        setValueSearch(e.target.value);
    };

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false); // Đóng component khi click ra ngoài
            setValueSearch('');
        }
    };

    useEffect(() => {
        const newListOption = listOptions.filter((item) =>
            removeDiacritics(item).includes(removeDiacritics(valueSearch)),
        );
        setListOptionVisible(newListOption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueSearch]);

    const handleCancel = () => {
        setValueInput(placeholder);
        if (setValue) {
            setValue(name, '');
            setValueSearch('');
        }
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (setValue) {
            setValue(name, '');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <input
                {...register(name)}
                className={cx('hidden')}
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
            />
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
                    <ul className="py-1">
                        {search && (
                            <div className={cx('my-1 overflow-hidden rounded-lg px-1')}>
                                <input
                                    placeholder={'Search'}
                                    className={cx(
                                        'w-full px-2 py-1',
                                        'border border-solid border-primary-200',
                                        'focus:border-primary',
                                    )}
                                    value={valueSearch}
                                    onChange={handleChangeValueSearch}
                                />
                            </div>
                        )}

                        {listOptionVisible.map((value, index) => (
                            <li
                                className="cursor-pointer text-ellipsis text-nowrap px-3 py-2 hover:bg-primary-200"
                                key={index}
                                onClick={() => handleChange(value)}
                            >
                                {value}
                            </li>
                        ))}
                    </ul>
                    {valueInput !== placeholder && (
                        <Button className={cx('float-right my-1 mr-2')} onClick={handleCancel}>
                            Bỏ chọn
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}

export default DropDown;
