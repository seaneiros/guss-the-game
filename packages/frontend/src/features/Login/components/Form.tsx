import { useBem }               from '@seaneiros/react-bem';

import { Button, Form, Input }  from 'antd';

import type {
  IAjaxStatus,
  ICommonProps }                from 'src/types';
import type { LoginFormValues } from '../types';
import { FormFields }           from '../enums';

import './Form.scss';


const LoginForm = (props: ILoginFormProps) => {
  const { status, onSubmit } = props;

  const bem = useBem({ block: 'form' }, props);

  return (
    <Form
      className={bem.block()}
      name="signIn"
      initialValues={{
        [FormFields.Name]: '',
        [FormFields.Password]: '',
      }}
      onFinish={onSubmit}
    >
      <Form.Item
        label="Username"
        name={FormFields.Name}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name={FormFields.Password}
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button
          type="primary"
          htmlType="submit"
          loading={status.request}
          block
        >
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;


/* HELPERS */

interface ILoginFormProps extends ICommonProps {
  status: IAjaxStatus;
  onSubmit(values: LoginFormValues): void;
}