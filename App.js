import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { ActivityIndicator, View, StyleSheet, Image,
  TouchableOpacity,
  Text, Button} from 'react-native';
import { WebView } from 'react-native-webview';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';

export default function App() {
  
  // for navigation
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  // for progress bar
  const [progress, setProgress] = useState(0)
  const [isLoaded, setLoaded] = useState(false)

  //const javascript = `alert('Hello')`;

  const webviewRef = useRef(null)

  const backButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goBack()
  }
  
  const frontButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goForward()
  }

  const reloadButtonHandler = () => {
    webviewRef.current.reload();
  }

  // const loadingView = () => {
  //   <View style={styles.loadingView}>
  //     <ActivityIndicator size="large" color="blue"></ActivityIndicator>
  //   </View>
  // }

  return (
    <>
     
      {/* {
        !isLoaded ?
        <Progress.Bar 
          progress={progress} 
          width={null} 
          color='red'
          borderWidth={0}
          borderRadius={0}
          
        />
        : null
      } */}

      <Progress.Bar 
        progress={progress} 
        width={null} 
        //color='red'
        borderWidth={0}
        borderRadius={0}
        style={{marginTop: 40}}
      />
      
      <StatusBar barStyle='dark-content' />
      <WebView
        ref={(ref) => webviewRef.current = ref}
        // ref = {webviewRef}
        source={{ 
          uri: 'https://pikbooking.com/',
          // uri: 'https://pikbooking.com/',
          headers: { 'key': 'value'} 
        }}
        originWhitelist = {['*']}
        //injectedJavaScriptBeforeContentLoaded = { javascript }
        onLoadEnd = { ()=>setLoaded(true) }
        onLoadProgress={ ({nativeEvent})=> setProgress(nativeEvent.progress) }
        ref={webviewRef}
        onNavigationStateChange={navState => {
          setCanGoBack(navState.canGoBack)
          setCanGoForward(navState.canGoForward)
          setCurrentUrl(navState.url)
        }}
        onError={(event)=>alert(`Webview error ${event.nativeEvent.description}`)}
        // startInLoadingState
        // renderLoading={loadingView}
      />
      <View style={styles.tabBarContainer}>   
        <TouchableOpacity style={styles.btnClickContain} onPress={backButtonHandler}>
          <Icon name="arrow-back" size={20} type="ionicon" color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnClickContain} onPress={reloadButtonHandler}>
          <Icon name="refresh" size={20} type="ionicon" color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={frontButtonHandler}>
        <Icon name="arrow-forward" size={20} type="ionicon" color="white" />
        </TouchableOpacity>
      </View>
    </>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  tabBarContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black'
  },
  button: {
    color: 'white',
    fontSize: 15
  },
  loadingView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

