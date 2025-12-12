import { Button, Container, Input } from '@/components';
import { useAuthStore } from '@/store/useAuthStore';
import { Ban, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

type Inputs = {
    id: string;
    name: string;
    password: string;
    repeatPassword: string;
};

const passwordRules = [
    { label: 'Минимум 8 символов', test: (val: string) => val.length >= 8 },
    { label: 'Хотя бы одна заглавная буква (A–Z)', test: (val: string) => /[A-Z]/.test(val) },
    { label: 'Хотя бы одна строчная буква (a–z)', test: (val: string) => /[a-z]/.test(val) },
];

export const RegisterPage: FC = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.setUser);
    const currentUser = useAuthStore((state) => state.user);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (currentUser) {
            toast('Current user is active', {
                icon: <Ban color="red" />,
                position: 'top-right',
            });
            return false;
        }
        user({ id: crypto.randomUUID(), name: data.name });
        navigate('/');
    };
    const password = watch('password', '');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <section>
            <Container>
                <div className="h-[500px] flex gap-6 flex-col justify-center items-center">
                    <h1 className="text-gray-700 text-3xl font-bold">Registration</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2 w-[500px]">
                        <Input
                            placeholder="Введите имя"
                            autoComplete="username"
                            {...register('name', {
                                required: 'Имя обязательно для заполнения',
                                pattern: {
                                    value: /^[A-Za-z]+$/i,
                                    message: 'Имя должно содержать только латинские буквы',
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Максимум 20 символов',
                                },
                                minLength: {
                                    value: 3,
                                    message: 'Минимум 3 символа',
                                },
                            })}
                        />
                        {errors.name && <p color="error">{errors.name.message}</p>}

                        <div className="flex gap-1">
                            <Input
                                type={isPasswordVisible ? 'text' : 'password'}
                                placeholder="Введите пароль"
                                autoComplete="new-password"
                                {...register('password', {
                                    required: 'Пароль обязателен',
                                    validate: (val) => {
                                        for (const rule of passwordRules) {
                                            if (!rule.test(val)) return 'Пароль не соответствует требованиям';
                                        }
                                        return true;
                                    },
                                })}
                            />
                            {!isPasswordVisible ? (
                                <Button onClick={() => setIsPasswordVisible(true)}>
                                    <EyeIcon />
                                </Button>
                            ) : (
                                <Button onClick={() => setIsPasswordVisible(false)}>
                                    <EyeOffIcon />
                                </Button>
                            )}
                        </div>

                        {errors.password && <p color="error">{errors.password.message}</p>}

                        <ul>
                            {passwordRules.map((rule) => (
                                <li key={rule.label} style={{ color: rule.test(password) ? 'green' : 'red' }}>
                                    {rule.test(password) ? '✅' : '❌'} {rule.label}
                                </li>
                            ))}
                        </ul>

                        <Input
                            type="password"
                            autoComplete="pass"
                            placeholder="Повторите пароль"
                            {...register('repeatPassword', {
                                required: 'Повторите пароль',
                                validate: (value) => value === password || 'Пароли не совпадают',
                            })}
                        />
                        {errors.repeatPassword && <p color="error">{errors.repeatPassword.message}</p>}

                        <Button>Регистрация</Button>
                    </form>
                </div>
            </Container>
        </section>
    );
};
