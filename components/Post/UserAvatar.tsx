import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "@/data/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import moment from 'moment'

type USER_AVATAR = {
  name: string;
  image: string;
  date: string;
};

const UserAvatar = ({ name, image, date }: USER_AVATAR) => {
  return (
    <View style={{ display: "flex", flexDirection: "row", alignItems:'center', justifyContent:'space-between' }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 99,
          }}
        />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{name}</Text>
          <Text style={{ color: Colors.GRAY }}>{ moment(date).fromNow()}</Text>
        </View>
      </View>
        <FontAwesome name="ellipsis-v" size={24} color="black" />
    </View>
  );
};

export default UserAvatar;
