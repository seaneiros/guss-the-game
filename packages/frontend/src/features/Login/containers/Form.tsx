import { useRef }               from 'react';
import { useAuthContext }       from 'src/modules/Auth';

import Form                     from '../components/Form';

import type { LoginFormValues } from '../types';
import { FormFields }           from '../enums';


const LoginFormContainer = () => {
  const { loginWithPasswordIntent, loginStatus } = useAuthContext();

  const { current: signIn } = useRef(async (values: LoginFormValues) => {
    const [ login ] = loginWithPasswordIntent(values[FormFields.Name], values[FormFields.Password]);

    await login();
  });

  return (
    <section>
      <Form status={loginStatus} onSubmit={signIn} />
    </section>
  );
};

export default LoginFormContainer;