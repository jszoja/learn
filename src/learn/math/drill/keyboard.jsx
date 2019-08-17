const Fab = require('@material-ui/core/Fab').default;
const PropTypes = require('prop-types');
const React = require('react');
const { Backspace, KeyboardReturn } = require('@material-ui/icons');

const buttonStyle = {
  margin: '5px',
  fontSize: '2em',
};

const buttonIconStyle = {
  color: 'white',
};

// eslint-disable-next-line react/prefer-stateless-function
class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    const buttons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'back', 'enter', 'nothing'];
    this.click = buttons.reduce((acc, item) => {
      acc[item] = this.onClick.bind(this, item);
      return acc;
    }, {});

    if (props.largeKeyboard) {
      buttonIconStyle.height = '80px';
      buttonIconStyle.width = '80px';
    }
  }

  onClick(value) {
    if (value === 'test') {
      return;
    }
    const { keyPress } = this.props;
    keyPress(value);
  }

  render() {
    const {
      onscreenKeyboard,
    } = this.props;

    if (!onscreenKeyboard) {
      return null;
    }

    const layout = [
      [
        '1', // key
        ['1', 'One', 1, '1'],
        ['2', 'Two', 2, '2'],
        ['3', 'Three', 3, '3'],
        [<Backspace />, 'Backspace', 'back', '4'],
      ],
      [
        '2', // key
        ['4', 'Four', 4, '5'],
        ['5', 'Five', 5, '6'],
        ['6', 'Six', 6, '7'],
        [' ', 'nothing1', 'Nothing1', '8'],
      ],
      [
        '3', // key
        ['7', 'Seven', 7, '9'],
        ['8', 'Eight', 8, '10'],
        ['9', 'Nine', 9, '11'],
        [' ', 'nothing2', 'Nothing2', '12'],
      ],
      [
        '4', // key
        [' ', 'nothing3', 'Nothing3', '13'],
        ['0', 'Zero', 0, '14'],
        [' ', 'nothing4', 'Nothing4', '15'],
        [<KeyboardReturn />, 'Enter', 'enter', '16'],
      ],
    ];

    return (
      <div>
        {
          layout.map(lay => (
            <div key={lay[0]}>
              {
                lay.slice(1).map((item) => {
                  const [content, key] = item;
                  return (
                    <Fab
                      key={key}
                      onClick={() => this.onClick(key)}
                      style={buttonStyle}
                    >
                      {content}
                    </Fab>
                  );
                })
              }
            </div>
          ))
        }
      </div>
    );
  }
}

Keyboard.propTypes = {
  keyPress: PropTypes.func.isRequired,
  onscreenKeyboard: PropTypes.bool.isRequired,
  largeKeyboard: PropTypes.bool.isRequired,
};

module.exports = Keyboard;
