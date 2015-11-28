import React from 'react-native';
import {
    Component,
    StyleSheet,
    ToolbarAndroid,
    View,
    Text,
    TouchableNativeFeedback,
    AppRegistry,
    Dimensions,
    TouchableOpacity,
    Image,
    Animated,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const padding = 16;
const boxSize = 40;

export default class Animations extends Component {
    constructor() {
        super();
        this.state = {
            x: new Animated.Value(0),
            onRight: false,
            imageScale: new Animated.Value(1),
            angle: new Animated.Value(0),
        };
    }

    _onBurgerClicked() {
        this.props.onNavigationIconClicked();
    }

    render() {
        var color = this.state.x.interpolate({
            inputRange: [0, SCREEN_WIDTH - boxSize - padding * 2, Number.MAX_VALUE],
            outputRange: ['rgb(111, 103, 253)', 'rgb(230, 179, 44)', 'rgb(230, 179, 44)']
        });

        var rotation = this.state.angle.interpolate({
            inputRange: [0, 180, 360],
            outputRange: ['0deg', '180deg', '360deg']
        });

        return (
            <View style={{flex:1, backgroundColor:'#555'}}>
                <ToolbarAndroid
                    navIcon={require('./menu-burger.png')}
                    onIconClicked={this._onBurgerClicked.bind(this)}
                    title="DevFest 2015"
                    titleColor="#eee"
                    style={styles.toolbar}/>

                <View style={styles.contentWrapper}>
                    <View>
                        <View style={{flex:1, justifyContent: 'center', alignContent:'center'}}>
                            <TouchableNativeFeedback
                                onPress={this._onPress.bind(this)}
                                background={TouchableNativeFeedback.Ripple('#fff', false)}>
                                <View style={styles.button}>
                                    <Text>Move</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <Animated.View style={[styles.colorContainer, {backgroundColor:color}]}/>
                            <Animated.View style={[styles.movingBox, {left:this.state.x}]}/>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                            <TouchableNativeFeedback
                                onPress={this._makeSmaller.bind(this)}
                                background={TouchableNativeFeedback.Ripple('#fff', false)}>
                                <View style={styles.button}>
                                    <Text>-</Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback
                                onPress={this._makeBigger.bind(this)}
                                background={TouchableNativeFeedback.Ripple('#fff', false)}>
                                <View style={styles.button}>
                                    <Text>+</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <Animated.Image
                                source={{uri: 'https://scontent-waw1-1.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/156362_536056099823245_1799153727_n.png?oh=3116a9aa5f9121900b0b585ddba55fae&oe=56E4B866'}}
                                style={{width: 50, height: 50, scaleX:this.state.imageScale, scaleY:this.state.imageScale, transform:[{rotate:rotation}]}}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    _onPress() {
        this.setState({
            onRight: !this.state.onRight
        });

        Animated.spring(
            this.state.x,
            {
                toValue: this.state.onRight ? SCREEN_WIDTH - boxSize - 2 * padding : 0,
                duration: 500
            }
        ).start();
    }

    _makeSmaller() {
        Animated.parallel([
            Animated.spring(
                this.state.imageScale,
                {
                    friction: 2,
                    toValue: this.state.imageScale._value / 1.2,
                    duration: 500
                }
            ),
            Animated.sequence([
                Animated.spring(
                    this.state.angle,
                    {
                        toValue: 360,
                        duration: 500
                    }
                ),
                Animated.spring(
                    this.state.angle,
                    {
                        toValue: 0,
                        duration: 1
                    }
                )
            ])
        ]).start();
    }

    _makeBigger() {
        Animated.parallel([
            Animated.spring(
                this.state.imageScale,
                {
                    friction: 2,
                    toValue: this.state.imageScale._value * 1.2,
                    duration: 500
                }
            ),
            Animated.sequence([
                Animated.spring(
                    this.state.angle,
                    {
                        toValue: 360,
                        duration: 500
                    }
                ),
                Animated.spring(
                    this.state.angle,
                    {
                        toValue: 0,
                        duration: 1
                    }
                )
            ])
        ]).start();
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
    textInput: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        margin: 10
    },
    button: {
        backgroundColor: '#aaa',
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    colorContainer: {
        height: 40,
        width: SCREEN_WIDTH - padding * 2,
        borderWidth: 1,
        marginBottom: 20,
    },
    movingBox: {
        width: 40,
        height: 40,
        backgroundColor: '#934CFD',
        marginBottom: 20
    }
});
