import { Button, Form, Input, Table } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";

export default function ObstetricauxTable() {
  const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    const data = [];
    for (let index = 0; index < 10; index++) {
      data.push({
        key: `${index}`,
        annee: ``,
        accouchementTerme: ``,
        accouchementPremature: ``,
        abrtSpontane: ``,
        abrtProvoque: ``,
        miu: ``,
        mortNes: ``,
        deces: ``,
      });
    }
    setDataSource(data);
  }, []);
  const columns = [
    {
      title: "Annee",
      dataIndex: "annee",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="annee">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Accouchement a terme",
      dataIndex: "accouchementTerme",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="accouchementTerme">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Accouchement premature",
      dataIndex: "accouchementPremature",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="accouchementPremature">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "ABRT spontane",
      dataIndex: "abrtSpontane",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="abrtSpontane">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "ABRT provoque",
      dataIndex: "abrtProvoque",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="abrtProvoque">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "MIU",
      dataIndex: "miu",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="miu">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Mort-nes",
      dataIndex: "mortNes",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="mortNes">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Deces neo-nataux",
      dataIndex: "deces",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="deces">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "",
      render: (_, record) => {
        return (
          <>
            <Button
              className="table-button"
              type="link"
              onClick={() => {
                setEditingRow(record.key);
                form.setFieldsValue({
                  annee: record.annee,
                  accouchementTerme: record.accouchementTerme,
                  accouchementPremature: record.accouchementPremature,
                  abrtSpontane: record.ABRTspontane,
                  abrtProvoque: record.ABRTprovoque,
                  miu: record.miu,
                  mortNes: record.mortNes,
                  deces: record.deces,
                });
              }}
            >
              Edit
            </Button>
            <Button className="table-button" type="link" htmlType="submit">
              Save
            </Button>
          </>
        );
      },
    },
  ];

  const onFinish = (values) => {
    const updatedDataSource = [...dataSource];
    updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
    setDataSource(updatedDataSource);
    setEditingRow(null);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Table columns={columns} dataSource={dataSource}></Table>;
    </Form>
  );
}
