import React from 'react';
import cx from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomInput from '~/components/Input';

import Wrapper from './Wrapper';
import { login as loginService } from '~/utils/service/audiences';

const schema = z.object({
    username: z.string(),
    password: z.string(),
});

const Login = ({ setUsername }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        console.log(data);
        const res = await loginService(data.username, data.password);
        if (res) {
            console.log('login success');
        } else {
            console.log('login failed');
        }
        navigate('/');
    };

    return (
        <Wrapper>
            <form className="space-y-6 flex-1" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                    label="Tên đăng nhập"
                    name="username"
                    register={register}
                    error={errors.username?.message}
                />

                <CustomInput
                    label="Mật Khẩu"
                    name="password"
                    type="password"
                    register={register}
                    error={errors.password?.message}
                />

                <div>
                    <button
                        type="submit"
                        className={cx(
                            'flex w-full justify-center rounded-md border border-transparent bg-primary',
                            'px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-500',
                        )}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        Đăng nhập
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default Login;
