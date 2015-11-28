import React from 'react-native';
import {
    Component,
    StyleSheet,
    ToolbarAndroid,
    View,
    Text,
    TextInput,
    TouchableNativeFeedback,
} from 'react-native';

export default class MainView extends Component {
    constructor() {
        super();

        this.state = {
            number: 0
        }
    }

    _onBurgerClicked() {
        this.props.onNavigationIconClicked();
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:'#555'}}>
                <ToolbarAndroid
                    navIcon={require('./menu-burger.png')}
                    onIconClicked={this._onBurgerClicked.bind(this)}
                    title="DevFest 2015"
                    titleColor="#eee"
                    style={styles.toolbar}/>

                <View style={styles.contentWrapper}>
                    <Text style={styles.caption}>Select Amount:</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('#fff', false)}
                            onPress={this._decrement.bind(this)}>
                            <View style={styles.button}>
                                <Text>-</Text>
                            </View>
                        </TouchableNativeFeedback>

                        <TextInput style={styles.textInput} keyboardType="numeric" textAlign="center">
                            {this.state.number}
                        </TextInput>

                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('#fff', false)}
                            onPress={this._increment.bind(this)}>
                            <View style={styles.button}>
                                <Text>+</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
        );
    }

    _decrement() {
        this.setState({
            number: this.state.number - 1
        });
    }

    _increment() {
        this.setState({
            number: this.state.number + 1
        });
    }
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#444',
        height: 56,
    },
    contentWrapper: {
        flex: 1,
        padding: 16,
    },
    caption: {
        textAlign: 'center',
        fontSize: 20,
        color: '#eee',
    },
    button: {
        backgroundColor: '#aaa',
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        margin: 10
    }
});
