import React from "react";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      mListCalc: [],
      operations: [
        { name: "Addition" }, { name: "Subtruction" }, { name: "Multiplication" }
      ]
    };
  }
  addRow = () => {
    this.state.mListCalc.push({ "symbol": "+", value: 0, "status": true })
    this.setState(this.state.mListCalc)
  }
  disable = (index) => {
    this.state.mListCalc[index].status = !this.state.mListCalc[index].status
    this.setState(this.state.mListCalc, () => { })
    var sum = 0
    this.state.mListCalc.forEach((item) => {
      if (item.status)
        sum = item.symbol == "-" ? sum - parseFloat(item.value) : sum + parseFloat(item.value)
    })
    this.setState({ sum })
  }
  delete = (index) => {
    delete this.state.mListCalc[index]
    this.setState(this.state.mListCalc, () => { })
    var sum = 0
    this.state.mListCalc.forEach((item) => {
      if (item.status)
        sum = item.symbol == "-" ? sum - parseFloat(item.value) : sum + parseFloat(item.value)
    })
    this.setState({ sum })
  }
  setResult = (value, index) => {
    try {
      this.state.mListCalc[index].value = value
      this.setState(this.state.mListCalc, () => { })
      var sum = 0
      this.state.mListCalc.forEach((item) => {
        if (item.status)
          sum = item.symbol == "-" ? sum - parseFloat(item.value) : sum + parseFloat(item.value)
      })
      this.setState({ sum })
    } catch (e) {
      alert(JSON.stringify(e))
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-header">
                <h3>Calculator</h3>
              </div>
              <div className="card-body">
                <div className="addbutton">
                  <button type="button" className="btn btn-primary" onClick={this.addRow}>Add Row</button>
                </div>
                <div className="m-3">
                  {this.state.mListCalc.map((item, index) => {
                    return <ul><li> <div className="operation mt-2">
                      <select name="" id="" onChange={(val) => {
                        this.state.mListCalc[index].symbol = val.target.value
                        this.setState(this.state.mListCalc, () => {
                          this.setResult(this.state.mListCalc[index].value, index)
                        })
                      }}>
                        <option value="+">+</option>
                        <option value="-">-</option>
                      </select>
                      <input type="text" onChange={(val) => {
                        this.setResult(val.target.value, index)
                      }} value={this.setState.number} className="ml-1 mr-1" placeholder="Enter Number" />
                      <button className="mr-1 btn btn-danger" onClick={() => this.delete(index)}>Delete</button>
                      <button className="btn btn-warning" onClick={() => this.disable(index)}>{this.state.mListCalc[index].status ? "Disbale" : "Enable"}</button>
                    </div></li></ul>
                  })}
                </div>
                <div className="result">
                  <p>Result: {this.state.sum}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;