import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useContext, useState } from "react";
import Colors from "@/data/Colors";
import DropDownPicker from "react-native-dropdown-picker";
import Buttontext from "../Shared/Button";
import * as ImagePicker from 'expo-image-picker';
import { upload } from "cloudinary-react-native";
import { cld, options } from "@/configs/CloudinaryConfig";
import axios from "axios";
import { AuthContext } from "@/context/Authcontext";
import { useRouter } from "expo-router";

const WritePost = () => {
  const [item, setItem] = useState([
    { label: "Public", value: "Public" },
    { label: "ABC Club", value: "ABC Club" },
  ]);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [content,setContent] = useState<string|null>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const {user} = useContext(AuthContext);
  const [loading,setLoading] = useState(false);
  const router = useRouter();
    const pickImage = async () => {
          // No permissions request is necessary for launching the image library
          let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsEditing: true,
              aspect: [4, 4],
              quality: 0.5,
          });
  
          console.log(result);
  
          if (!result.canceled) {
              setSelectedImage(result.assets[0].uri);
          }
      };

  const onPostBtnClick = async()=>{

    if(!content){
      ToastAndroid.show('Please Enter Content',ToastAndroid.BOTTOM);
      return;
    }
    setLoading(true);
    let uploadImageUrl = '';
    if(selectedImage){
      const resultData:any = await new Promise(async(resolve,reject)=>{
        await upload(cld,{
          file:selectedImage,
          options:options,
          callback:(error:any,resposnse:any)=>{
            if(error){
              reject(error)
            }
            else{
              resolve(resposnse)
            }
          }
        })
      })
      uploadImageUrl = resultData&&resultData?.url
    }
    const result = await axios.post(process.env.EXPO_PUBLIC_HOST_URL+'/post',{
      content:content,
      imageUrl : uploadImageUrl,
      visibleIn : value,
      email : user?.email
    });
     console.log(result);
     setLoading(false);
     router.replace('/(tabs)/Home')
  }

  return (
    <View>
      <TextInput
        placeholder="Write your Post here..."
        style={styles.textInput}
        multiline={true}
        numberOfLines={5}
        maxLength={100}
        onChangeText={(value)=>setContent(value)}
      />
      <TouchableOpacity onPress={pickImage}>
        {
            selectedImage? <Image
            style={styles.image}
            source={{uri:selectedImage}}
          />:
          <Image
          style={styles.image}
          source={require("./../../assets/images/image.png")}
          />
        }
      </TouchableOpacity>
      <View style={{ marginTop: 15 }}>
        <DropDownPicker
          style={{ elevation: 1, borderWidth: 0 }}
          items={item}
          open={open}
          value={value}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItem}
        />
      </View>
      <Buttontext text="Post" onPress={()=>onPostBtnClick()} loading={loading}/>
    </View>
  );
};

export default WritePost;

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    height: 140,
    marginTop: 10,
    borderRadius: 15,
    textAlignVertical: "top",
    elevation: 7,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginTop: 15,
    borderWidth: 0.4,
  },
});
