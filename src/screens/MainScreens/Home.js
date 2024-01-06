import * as React from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const handleDownload = async () => {
    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        FileSystem.documentDirectory + '/big_buck_bunny.mp4'
      );

      const { uri } = await downloadResumable.downloadAsync();
      Alert.alert('Download complete!', `File saved at: ${uri}`);
    } catch (error) {
      console.error('Error downloading video:', error);
      Alert.alert('Error', 'Failed to download video.');
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
        <Button title="Download" onPress={handleDownload} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
