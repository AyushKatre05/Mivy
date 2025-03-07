import { View, Text, Image } from "react-native";
import React, { useContext, useState } from "react";
import Colors from "@/data/Colors";
import Buttontext from "../Shared/Button";
import { AuthContext } from "@/context/Authcontext";
import axios from "axios";

type CLUB = {
  id: number;
  name: string;
  club_logo: string;
  about: string;
  createdon: string;
  isFollowed: boolean;
  refreshData:()=>void;
};

const ClubCard = (club: CLUB) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(club.isFollowed); // Local state

  const onFollowBtnClick = async () => {
    if (!user?.email) {
      console.warn("User not logged in!");
      return;
    }

    try {
      setLoading(true);

      if (isFollowing) {
        // Unfollow logic
        const result = await axios.delete(
          `${process.env.EXPO_PUBLIC_HOST_URL}/clubfollower?u_email=${user.email}&club_id=${club.id}`
        );
        console.log("Unfollowed:", result.data);
      } else {
        // Follow logic
        const result = await axios.post(
          `${process.env.EXPO_PUBLIC_HOST_URL}/clubfollower`,
          {
            u_email: user.email,
            clubId: club.id,
          }
        );
        console.log("Followed:", result.data);
      }

      setIsFollowing(!isFollowing); // Toggle follow state after success
    } catch (error) {
      console.error("Error following/unfollowing club:", error);
    } finally {
      club.refreshData();
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: Colors.WHITE,
        margin: 10,
        display: "flex",
        alignItems: "center",
        borderRadius: 15,
      }}
    >
      <Image
        style={{ width: 80, height: 80, borderRadius: 99 }}
        source={{ uri: club.club_logo }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{club.name}</Text>
      <Text numberOfLines={2} style={{ color: Colors.GRAY }}>{club.about}</Text>

      <Buttontext
        text={isFollowing ? "Unfollow" : "Follow"}
        onPress={onFollowBtnClick}
        loading={loading}
      />
    </View>
  );
};

export default ClubCard;
