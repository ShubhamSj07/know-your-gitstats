import React, { useState } from "react";
import { Form, Button, Input, Row, Col } from "antd";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import Logo from "./Logo";
import styles from "./SearchForm.module.scss";

const SearchForm = ({ displaySpan }) => {
  const [user, setUser] = useState("");
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log("Finish:", values);
    const { username } = values;

    if (!username) {
      return;
    }

    setUser(username);
  };

  if (user) {
    router.push(`/user/${user}`);
  }

  return (
    <Row justify="center" align="middle" className={styles.search__container}>
      <Col lg={displaySpan ? 12 : 24}>
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
          className={styles.search__form}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Please enter github username!" },
            ]}
          >
            <Input
              placeholder="Enter github username.."
              className={styles.search__form__input}
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                className={styles.search__form__searchBtn}
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                <FaSearch />
              </Button>
            )}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SearchForm;
