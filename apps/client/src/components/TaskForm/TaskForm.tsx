import React from 'react';
import { Form, Input, Select, InputNumber, AutoComplete, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { TaskStatus, taskStatusLabel, Task } from '../../types/task';

import useTeams from '../../hooks/useTeams';

interface TaskFormProps {
  initialValues?: Task;
  teamView: boolean;
  onFormFinish: (task: Store) => void;
  type: 'Add' | 'Edit';
}

function TaskForm({ initialValues, teamView, onFormFinish, type }: TaskFormProps) {
  const { team } = useTeams();
  const [form] = Form.useForm();
  let preFilledValues = {};
  if (initialValues) {
    const { title, description, status, estimatedHours, assignee } = initialValues;
    preFilledValues = {
      assignee: assignee?.email,
      title,
      description,
      status: status.label,
      estimatedHours,
    };
  }
  const users = team.users.map((user) => ({ value: user.username ? user.username : user.email }));

  const handleFinish = (values: Store) => {
    const newValues = { ...values };
    const teamMember = team.users.find(
      (user) => newValues.assignee === user.email || newValues.assignee === user.username,
    );
    if (teamMember) {
      newValues.assignee = teamMember.id;
    } else {
      newValues.assignee = undefined;
    }
    // If editing the form, status is prefilled with the label.
    // If not editted, then we need to convert to the key
    if (!Object.values(TaskStatus).includes(newValues.status)) {
      const index = Object.values(taskStatusLabel).indexOf(newValues.status);
      newValues.status = Object.keys(taskStatusLabel)[index];
    }
    onFormFinish(newValues);
    form.resetFields();
  };
  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      layout='horizontal'
      initialValues={preFilledValues || undefined}
      onFinish={handleFinish}
    >
      <Form.Item label='Title' name='title'>
        <Input />
      </Form.Item>
      <Form.Item label='Description' name='description'>
        <Input.TextArea />
      </Form.Item>
      {teamView ? (
        <Form.Item label='Assignee' name='assignee'>
          <AutoComplete
            placeholder='Type a name here'
            filterOption={(inputValue, option) =>
              option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            options={users}
          />
        </Form.Item>
      ) : null}
      <Form.Item label='Hours' name='estimatedHours'>
        <InputNumber />
      </Form.Item>
      <Form.Item label='Select' name='status'>
        <Select>
          {Object.values(TaskStatus).map((status) => (
            <Select.Option key={status} value={status}>
              {taskStatusLabel[status]}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          {`${type} Task`}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TaskForm;
