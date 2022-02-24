import * as React from 'react';
import { ImageBackground, ImageSourcePropType, Text, View } from 'react-native';
import { styles } from './style';
import { FormText } from '../../../components/form/TextField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useCallApi } from '../../../hook/useCallApi';
import { config } from '../../../config';
import { FormBtn } from '../../../components/form/SubmitBtn';
import { FormMessage } from '../../../components/form/FormMessage';
import backgroundImage from '../../../../assets/bg-login.jpg';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-native';
export interface LoginUserDto {
    username: string;
    password: string;
}

const defaultValues: LoginUserDto = { username: '', password: '' };

export const Login: React.FunctionComponent = () => {
    const { control, handleSubmit } = useForm<LoginUserDto>({ defaultValues });
    const { details, isLoading, makeRequest } = useCallApi<LoginUserDto, Record<string, unknown>>({ ...defaultValues });
    const handleOnLogin = (data: LoginUserDto) => makeRequest({ method: 'post', data, url: `${config.SERVER_URL}/auth/login` });

    return (
        <KeyboardAwareScrollView style={{ backgroundColor: 'red' }}>
            <View style={styles.container}>
                <ImageBackground source={backgroundImage as ImageSourcePropType} style={styles.bg}>
                    <View style={styles.wrapper}>
                        <View style={styles.formWrapper}>
                            <View style={styles.formContainer}>
                                <Text style={styles.formHeader}>Sign In</Text>
                                <FormMessage errorMessage={details.errorMessage} message={details.message} />
                                <FormText label="Username" name="username" error={details.username} control={control} />
                                <FormText label="Password" name="password" error={details.password} control={control} />

                                <FormBtn handleOnSubmit={handleSubmit(handleOnLogin)} isLoading={isLoading} label="Sign In" />
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </KeyboardAwareScrollView>
    );
};
