import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    TouchableHighlight,
    Modal,
    Linking,
    TouchableNativeFeedback,
    Platform,
    Image,
    CheckBox,
    BackHandler,
} from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons'
import {Font} from 'expo';
import GradientButton from 'react-native-gradient-buttons';
import onCheckBoxImage from '../../assets/images/icons/checked.png';
import offCheckBoxImage from '../../assets/images/icons/unchecked.png';
import {ToastAndroid} from 'react-native';
import styles from '../styles';
import EventScreen from './EventScreen';
import LoadingGIF from '../LoadingGIF';
 var Arr = [];
 var checkDict = {};
 var styleCheckBox = {};
 var url;
 let numColumns = 1;

class ScreenOne extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
        };
    }

    async componentDidMount(){
        await Font.loadAsync({
            'latoRegular':require('../../assets/fonts/Lato-Regular.ttf')
        }).then(()=>{
            this.setState({
                fontLoading:false,
            })
        }).then(()=>{
                this.setState({
                    isLoading:false,
                    refreshing: false,
                })
            })
            .catch(()=>{
                ToastAndroid.showWithGravityAndOffset(
                    "Unable to connect to internet",
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                    0,
                    40);
            })
            .then(()=>{
                checkDict = this.props.screenProps.checkDict;
            })
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            
            this.props.navigation.goBack(null);
            return true;
        
      });
    }

    render() {
        
        if(this.state.isLoading){
            return(
                <View style={{flex:1}}>
                    {/* <LoadingGIF/> */}
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <EventScreen 
            handleRefresh={this.props.screenProps.handleRefresh} 
            day='day1' 
            // event_type="others" 
            dataSource = {this.props.screenProps.dataSource} 
            handleClick={this.props.screenProps.handleClick} 
            checkDict={this.props.screenProps.checkDict}
             />
        );
    }
}
export default ScreenOne;