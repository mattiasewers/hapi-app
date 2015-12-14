import React from 'react';
import axios from 'axios';
//MUI
import {FlatButton, TextField, CircularProgress} from 'material-ui';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import '../../styles/home.styl';

class Component extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      data: []
    }
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  componentWillMount() {

    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      primary1Color: Colors.red500,
      primary2Color: Colors.red700,
      primary3Color: Colors.lightBlack,
      accent1Color: Colors.indigo500,
      accent2Color: Colors.grey100,
      accent3Color: Colors.grey500,
      textColor: Colors.darkBlack,
    });

    this.setState({muiTheme: newMuiTheme});

    axios.get('/todos')
      .then( (res) => {
        console.log(res.data);
        this.setState({
          data: res.data
        });
      })
      .catch( (response) => {
        console.log(response);
      });
  }

  handleClick(e){
    e.preventDefault();
    axios.post('/todos', {
        name: this.refs.text.getValue()
      })
      .then( (res) => {
        console.log(res.data);
        this.setState({
          data: [
            {
              name: res.data.name,
              _id: res.data._id
            },
            ...this.state.data,
          ]
        });
        this.refs.text.clearValue();
      })
      .catch( (res) => {
      console.log(res);
      });
  }

  handleRemove(id){
    console.log(id);
    axios.delete(`/todos/${id}`)
      .then( (res) => {
        let indexof;
    		this.state.data.map((obj, index) => {
    			if(obj._id === res.data._id){
    				indexof = index;
    			}
    		});
        this.setState(state => {
            state.data.splice(indexof, 1);
            return {data: state.data};
        });
      })
      .catch( (res) => {

      });
  }

  renderList(){
    let data = this.state.data;
    if(data.length !== 0){
      let list = data.map( (i) => <div style={{width: '100%'}} key={i._id}> <li style={{display: 'inline-block', padding: '1em'}} key={i._id}>{i.name}</li> <FlatButton label="remove" secondary={true} onTouchTap={this.handleRemove.bind(this, i._id)}/> </div>);
       return list;
    } else {
      return <CircularProgress mode="indeterminate" />
    }
  }

  render() {
    let data = this.state.data;

      return (
          <section className="todo">
            <h2>Add todo</h2>
            <form method="post" onSubmit={this.handleClick.bind(this)}>
              <TextField
                hintText="Add todo" ref="text"
                underlineFocusStyle={{borderColor: Colors.indigo500}} />
              <FlatButton label="add" primary={true} onTouchTap={this.handleClick.bind(this)} />
            </form>
              {this.renderList()}
          </section>
      );
  }
};

Component.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Component;
