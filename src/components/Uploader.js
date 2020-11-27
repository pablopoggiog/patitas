import * as ImagePicker from "expo-image-picker";
import { firebase } from "@/firebase/config";

export const pickImage = async () => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  handleImagePicked(pickerResult);
};

const handleImagePicked = async (pickerResult) => {
  try {
    if (!pickerResult.cancelled) {
      await uploadImageAsync(pickerResult.uri);
      console.log("done");
    }
  } catch (e) {
    console.log(e);
    alert("Upload failed, sorry :(");
  } finally {
  }
};

export async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child("images" + Math.random());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}
