import * as FileSystem from 'expo-file-system';

  const downloadVideo = async (item) => {

    const videoUri = item.video;
    const fileUri = FileSystem.documentDirectory + 'downloaded_video.mp4';

    try {
      const downloadObject = FileSystem.createDownloadResumable(
        videoUri,
        fileUri,
        {},
        (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          console.log(`Downloading... ${Math.round(progress * 100)}%`);
        }
      );

      const { uri } = await downloadObject.downloadAsync();
      console.log('Download complete. File saved at:', uri);
    } catch (error) {
      console.error('Error downloading video:', error);
    }
  };

export default downloadVideo;

// import { View } from 'react-native'
// import React from 'react'


// export default function Download() {
//   return (
//     <View>

//     </View>
//   )
// }

