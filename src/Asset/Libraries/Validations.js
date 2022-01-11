import React from "react";
import Snackbar from 'react-native-snackbar'

class Validations extends React.Component {

  static validateEmail = Email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(Email);
  }

  static validateName = Name => {
    var re = /^(?=.*[a-zA-Z])(?=.|[0-9])[a-zA-Z0-9._ ]+$/;
    return re.test(Name);
  }

  static validateClass = Class => {
    var re = /^[a-zA-Z0-9]*$/;
    return re.test(Class);
  }

  static validate_SC = special => {
    var nospecial = /^[^*|\":<>[\]{}`\\()';!@#&$%1234567890-=+.!,?~`]+$/;
    return nospecial.test(special);
  }

  // static snackBar = (text) => {
  //   Snackbar.show({
  //     text: text,
  //     duration: Snackbar.LENGTH_SHORT,
  //   },
  //     action: {
  //     text: 'UNDO',
  //     textColor: 'green',
  //     onPress: () => { /* Do something. */ },
  //   })
  // }

  static snackBar = (msg, actiontext) => {
    Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_INDEFINITE,
      action: {
        text: actiontext,
        textColor: 'green',
        onPress: () => { /* Do something. */ },
      },
    });
  }


}


export { Validations }
