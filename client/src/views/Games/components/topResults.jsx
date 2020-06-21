import React, { Component } from "react";
import { Table, Button, Select } from "antd";
import Client from "../../../modules/Client/Client";

const { Option } = Select;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Kuba",
        value: "Kuba",
      },
      {
        text: "Kacper",
        value: "Kacper",
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Wynik",
    dataIndex: "result",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.result - b.result,
  },
  {
    title: "Data",
    dataIndex: "date",
    // filterMultiple: false,
    // onFilter: (value, record) => record.date.indexOf(value) === 0,
    // sorter: (a, b) => a.date.length - b.date.length,
    // sortDirections: ["descend", "ascend"],
  },
  {
    title: "minut",
    dataIndex: "time",
    filterMultiple: false,
    // onFilter: (value, record) => record.date.indexOf(value) === 0,
    // sorter: (a, b) => a.date.length - b.date.length,
    // sortDirections: ["descend", "ascend"],
  },
];

class TopResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      gameTimes: [
        { name: "5 min", time: 5 },
        { name: "3 min", time: 3 },
        { name: "1 min", time: 1 },
      ],
      time: null,
      refresh: 0,
    };
  }

  belongsToSetTime(result) {
    console.log("result.tim " + result.time + " state.time " + this.state.time);
    return result.time === this.state.time;
  }

  async getData() {
    console.log("proba pobrania danych");
    try {
      const doc = await Client.Services.ScoreService.get();

      if (this.state.time) {
        const filteredData = doc.data.filter((result) =>
          this.belongsToSetTime(result)
        );
        const data = filteredData.map((result) => {
          return {
            name: result.user.name,
            result: result.resultGood - result.resultWrong,
            date: new Date(Date.parse(result.date)).toLocaleDateString("pl-PL"),
            time: result.time,
          };
        });
        this.setState({ data });
      } else {
        const data = doc.data.map((result) => {
          return {
            name: result.user.name,
            result: result.resultGood - result.resultWrong,
            date: new Date(Date.parse(result.date)).toLocaleDateString("pl-PL"),
            time: result.time,
          };
        });
        this.setState({ data });
      }
    } catch {
      console.log("nie udalo się pobrać listy wyników");
    }
  }

  async componentDidMount() {
    console.log("lista zamontowana");
    await this.getData();
  }

  onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  selectTime = (value, key) => {
    console.log(key.key);
    this.setState({ time: key.key });
    this.getData();
  };

  refresh = () => {
    this.setState({ refresh: this.state.refresh + 1 });
  };

  render() {
    const gameTimes = this.state.gameTimes.map((time) => (
      <Option value={time.name} key={time.time}>
        {time.name}
      </Option>
    ));

    return (
      <>
        <div className="choose">
          <Select
            placeholder="Dla jakiego czasu pokazć wyniki"
            onChange={(value, key) => this.selectTime(value, key)}
          >
            {gameTimes}
          </Select>
        </div>
        {this.state.time ? (
          <h3>NAJLEPSZE dla {this.state.time} minut</h3>
        ) : (
          <h3>Wszystkie wyniki</h3>
        )}
        <Table
          columns={columns}
          dataSource={this.state.data}
          onChange={this.onChange}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15"],
          }}
        />
        <button className="btn btnRefresh" onClick={() => this.getData()}>
          Odśwież
        </button>
      </>
    );
  }
}

export default TopResults;
