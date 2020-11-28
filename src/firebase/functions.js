import * as ImagePicker from "expo-image-picker";
import { firebase } from "./config";

export const fetchCandidatesList = (setList) => {
  firebase
    .database()
    .ref("candidate/")
    .on("value", (snapshot) => {
      const result = snapshot.val();

      result && setList(result);
    });
};

export const fetchCandidate = (id, setImage, setDescription) => {
  firebase
    .database()
    .ref("candidate/" + id)
    .on("value", async (snapshot) => {
      const description = await snapshot.val().description;
      const image = await snapshot.val().image;

      image && setImage(image);
      description && setDescription(description);
    });
};

export const pickImage = async (userId) => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [5, 3],
  });

  return handleImagePicked(pickerResult, userId);
};

const handleImagePicked = async (pickerResult) => {
  try {
    if (!pickerResult.cancelled) {
      return pickerResult.uri;
    }
  } catch (e) {
    console.log(e);
    alert("Upload failed, sorry :(");
  } finally {
  }
};

export async function uploadImageAsync(uri, userId) {
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
    .child("images" + userId + Math.random().toPrecision(5) * 100000);
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

export const uploadInfo = async (
  userId,
  name,
  shortDescription,
  description,
  imageUri
) => {
  const image = await uploadImageAsync(imageUri, userId);

  firebase
    .database()
    .ref("candidate/" + userId + name)
    .set({
      userId,
      name,
      shortDescription,
      description,
      image,
    });
};
