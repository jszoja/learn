require('bootstrap/dist/css/bootstrap.min.css');
const styles = require('./index.scss');
const React = require('react');
const TextField = require('material-ui/TextField').default;
const DoneIcon = require('material-ui/svg-icons/action/done').default;
const FloatingActionButton = require('material-ui/FloatingActionButton').default;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      lower: 0,
      upper: 20,
      answer: ''
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.reset = this.reset.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  getRandom() {
    return Math.round(Math.random() * this.state.upper);
  }

  componentWillMount() {
    this.reset();
  }

  reset() {
    this.setState({
      left: this.getRandom(),
      right: this.getRandom()
    })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  checkAnswer() {
    const actual = parseInt(this.state.answer, 10);
    const expected = this.state.left + this.state.right;
    const correct = actual === expected;
    const answer = '';
    this.setState({
      result: `${actual} is ${correct ? 'correct' : 'wrong'}`,
      correct,
      answer,
    });
    if(correct) {
      this.reset();
    }
  }

  handleKeyPress = (event) => {
    if(event.key == 'Enter') {
      this.checkAnswer();
    }
  }

  render() {
    const numberStyle = {
      fontSize: 'xx-large',
      margin: '15px'
    };
    const checkStyle = {
      margin: '15px'
    };
    const textStyle = {
      border: 'medium solid black',
      height: '80px',
      width: '80px',
      textAlign: 'center'
    };
    const resultStyle = {
      fontSize: 'xx-large',
      color: this.state.correct ? 'darkgreen' : 'red'
    }
    return (
      <div>
        <div>
          <h1>Add the numbers</h1>
          <span style={numberStyle}>{this.state.left}</span>
          <span style={numberStyle}>{'+'}</span>
          <span style={numberStyle}>{this.state.right}</span>
          <span style={numberStyle}>{'='}</span>
          <TextField
            name='answer'
            hintText=''
            autoFocus={true}
            value={this.state.answer}
            type='number'
            style={textStyle}
            onChange={this.onChange}
            onKeyPress={this.handleKeyPress}
          />
          <FloatingActionButton
            onClick={this.checkAnswer}
            title='Check Answer'
            style={checkStyle}
          >
            <DoneIcon />
          </FloatingActionButton>
        </div>
        {!!this.state.result &&
          <div style={resultStyle}>{this.state.result}</div>
        }
      </div>
    )
  }
}

module.exports = App;
