import { Card, Select, Table, Space, Button, DatePicker, Typography } from "antd";
import ChartFactory from "./ChartFactory";

const { Text } = Typography;
const { RangePicker } = DatePicker;

const VIEW_OPTIONS = [
  { value: "table", label: "Таблица" },
  { value: "line", label: "Линейный" },
  { value: "column", label: "Столбчатый" },
  { value: "pie", label: "Круговой" },
];

export default function DashboardBlock({
  title,
  view,
  onViewChange,
  table,
  chart,
  dateFilter, 
  topFilters = false,
}) {
  const columns = (table?.columns || []).map((c, idx) => ({
    title: c,
    dataIndex: `c${idx}`,
    key: `c${idx}`,
    ellipsis: true,
  }));

  const dataSource = (table?.rows || []).map((r, i) => {
    const rowObj = { key: i };
    r.forEach((cell, idx) => (rowObj[`c${idx}`] = cell));
    return rowObj;
  });

  return (
    <Card
      className="blockCard"
      size="small"
      title={<Text strong style={{ fontSize: 13 }}>{title}</Text>}
      extra={
        <Select
          value={view}
          options={VIEW_OPTIONS}
          onChange={onViewChange}
          style={{ width: 160 }}
          size="small"
        />
      }
      bodyStyle={{ height: "100%", padding: 12, position: "relative" }}
    >
      {dateFilter && !dateFilter.hidden && (
        <div className="filtersLeft">
          <Space direction="vertical" size={8} style={{ width: "100%" }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Выберите дату/период
            </Text>

            <RangePicker
              value={dateFilter.value}
              onChange={dateFilter.onChange}
              size="small"
              style={{ width: "100%" }}
              placeholder={["с", "по"]}
              allowClear
            />

            <Text type="secondary" style={{ fontSize: 12 }}>
              Выберите тип оборудования
            </Text>

            <Select
              size="small"
              defaultValue="Выбрать участок"
              options={[
                { value: "Выбрать участок", label: "Выбрать участок" },
                { value: "A", label: "Участок A" },
                { value: "B", label: "Участок B" },
                { value: "C", label: "Участок C" },
              ]}
            />

            <Button type="primary" size="small" onClick={dateFilter.onApply} block>
              Применить
            </Button>
          </Space>
        </div>
      )}

      {topFilters && (
        <div className="filtersTop">
          <Space size={8}>
            <Select
              size="small"
              defaultValue="Участок..."
              options={[
                { value: "Участок...", label: "Участок..." },
                { value: "A", label: "Участок A" },
                { value: "B", label: "Участок B" },
                { value: "C", label: "Участок C" },
              ]}
              style={{ width: 170 }}
            />
            <Select
              size="small"
              defaultValue="2025"
              options={[
                { value: "2025", label: "2025" },
                { value: "2024", label: "2024" },
                { value: "2023", label: "2023" },
              ]}
              style={{ width: 90 }}
            />
          </Space>
        </div>
      )}

      {view === "table" ? (
        <div className="contentArea">
          <Table
            size="small"
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered
            scroll={false}
          />

          {dateFilter?.showHint && <div className="centerHint">ВЫБЕРИТЕ ДАТУ</div>}
        </div>
      ) : (
        <div className="contentArea">
          <ChartFactory view={view} chart={chart} title={title} />
        </div>
      )}
    </Card>
  );
}
