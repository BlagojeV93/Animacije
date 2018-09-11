/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Animated, Text } from 'react-native';


export default class ClapButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            claps: []
        }
        this.clap = this.clap.bind(this);
        this.keepClapping = this.keepClapping.bind(this);
        this.stopClapping = this.stopClapping.bind(this);
    }

    animationComplete(countNum) {
        const claps = this.state.claps;
        claps.splice(claps.indexOf(countNum), 1);
        this.setState({ claps })
    }

    clap() {
        let count = this.state.count;
        let claps = this.state.claps;
        count++;
        claps.push(count)
        this.setState({ count })
    }

    keepClapping() {
        this.clapTimer = setInterval(() => this.clap(), 150)
    }

    stopClapping(){
        if(this.clapTimer){
            clearInterval(this.clapTimer)
        }
    }

    renderClaps() {
        return this.state.claps.map(countNum => <ClapBubble key={countNum} count={countNum} animationComplete={this.animationComplete.bind(this)} />)
    }

    render() {

        let clapIcon = this.state.count > 0 ?
            <Image source={require('../img/clapping.png')} style={{ height: 25, width: 25 }} /> :
            <Image source={require('../img/clap.png')} style={{ height: 25, width: 25 }} />
        return (
            <View style={styles.container}>
            <View style={styles.percentageCont}><Text>KRUG</Text></View>
                <TouchableOpacity
                    onPress={this.clap}
                    onPressIn={this.keepClapping}
                    onPressOut={this.stopClapping}
                    activeOpacity={0.7}
                    style={styles.ClapButton}>
                    {clapIcon}
                </TouchableOpacity>
                {this.renderClaps()}
            </View>
        );
    }
}

class ClapBubble extends Component {

    state = {
        yPosition: new Animated.Value(0),
        xPosition: new Animated.Value(0),
        opacity: new Animated.Value(0)
    }


    componentDidMount() {
        Animated.parallel([
            Animated.timing(
                this.state.yPosition, { toValue: -120, duration: 500 }
            ),
            Animated.timing(
                this.state.xPosition, { toValue: 50, duration: 500 }
            ),
            Animated.timing(
                this.state.opacity, { toValue: 1, duration: 500 }
            )
        ]).start(() => {
            setTimeout(() => {
                this.props.animationComplete(this.props.count);
            }, 500)
        });
    }

    render() {
        let animationStyle = {
            transform: [{translateX: this.state.xPosition, translateY: this.state.yPosition }],
            opacity: this.state.opacity
        }
        return (
            <Animated.View style={[styles.clapBubble, animationStyle]}>
                <Text style={styles.clapText}>+{this.props.count}</Text>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    ClapButton: {
        position: 'absolute',
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        bottom: 20,
        right: 20,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    clapBubble: {
        position: 'absolute',
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#15a872',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    clapText: {
        color: 'white',
        fontSize: 14
    },
    percentageCont: {
        borderRadius: 30,
        width: 60,
        height: 60,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
