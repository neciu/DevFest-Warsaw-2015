import React from 'react-native';
import {
    AppRegistry,
    Component,
    StyleSheet,
    DrawerLayoutAndroid,
    View,
    Text,
    TouchableNativeFeedback,
} from 'react-native';
import MainView from './main-view.android';
import Animations from './animations.android';

class DevFestWarsaw2015 extends Component {
    constructor() {
        super();

        this.state = {
            mainViewSelected: true,
            animationsSelected: false,
            panResponderSelected: false,
        }
    }

    render() {
        return (
            <DrawerLayoutAndroid ref="drawer" renderNavigationView={this._renderNavigationView.bind(this)}>
                {this.state.mainViewSelected && <MainView onNavigationIconClicked={this._showDrawer.bind(this)}/>}
                {this.state.animationsSelected && <Animations onNavigationIconClicked={this._showDrawer.bind(this)}/>}
            </DrawerLayoutAndroid>
        );
    }

    _renderNavigationView() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <TouchableNativeFeedback onPress={this._selectMain.bind(this)}>
                    <View style={styles.drawerButton}>
                        <Text>
                            Buttons And TextInput
                        </Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={this._selectAnimations.bind(this)}>
                    <View style={styles.drawerButton}>
                        <Text>
                            Animations
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }

    _showDrawer() {
        this.refs.drawer.openDrawer();
    }

    _selectMain() {
        this.setState({
            mainViewSelected: true,
            animationsSelected: false,
            panResponderSelected: false,
        });
        this.refs.drawer.closeDrawer();
    }

    _selectAnimations() {
        this.setState({
            mainViewSelected: false,
            animationsSelected: true,
            panResponderSelected: false,
        });
        this.refs.drawer.closeDrawer();
    }

    _selectPanResponder() {
        this.setState({
            mainViewSelected: false,
            animationsSelected: false,
            panResponderSelected: true,
        });
        this.refs.drawer.closeDrawer();
    }
}

const styles = StyleSheet.create({
    drawerButton: {
        padding: 16
    }
});

AppRegistry.registerComponent('DevFestWarsaw2015', () => DevFestWarsaw2015);
