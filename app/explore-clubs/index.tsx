import { View, Text, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ClubCard from '@/components/Clubs/ClubCard';
import Buttontext from '@/components/Shared/Button';
import Colors from '@/data/Colors';
import { AuthContext } from '@/context/Authcontext';

type CLUB = {
  id: number;
  name: string;
  club_logo: string;
  about: string;
  createdon: string;
};

const ExploreClubs = () => {
  const [clubList, setClubList] = useState<CLUB[]>([]);
  const { user } = useContext(AuthContext);
  const [followedClubs, setFollowedClubs] = useState<any[]>([]);
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    GetAllClubs();
  }, []);

  const GetAllClubs = async () => {
    setLoading(true);
    try {
      console.log("Fetching clubs from:", process.env.EXPO_PUBLIC_HOST_URL + '/clubs');
      const result = await axios.get(process.env.EXPO_PUBLIC_HOST_URL + '/clubs');

      if (result.data && Array.isArray(result.data)) {
        console.log("Clubs API Response:", result.data);
        setClubList(result.data);
      } else {
        console.warn("Unexpected response format for clubs:", result.data);
        setClubList([]);
      }

      if (user?.email) {
        await GetUserFollowedClub();
      }
    } catch (error) {
      console.error("Error fetching clubs: ", error);
    }
    setLoading(false);

  };

  const GetUserFollowedClub = async () => {
    try {
      if (!user?.email) {
        console.warn("User email not found, skipping followed clubs fetch.");
        return;
      }

      console.log("Fetching followed clubs for:", user.email);
      const result = await axios.get(
        `${process.env.EXPO_PUBLIC_HOST_URL}/clubfollower?u_email=${user.email}`
      );

      if (result.data && Array.isArray(result.data)) {
        console.log("Followed Clubs Data:", result.data);
        setFollowedClubs(result.data);
      } else {
        console.warn("Unexpected response format for followed clubs:", result.data);
        setFollowedClubs([]);
      }
    } catch (error) {
      console.error("Error fetching followed clubs:", error);
    }
  };

  const onAddCLubBtnClick = () => {
    console.log("Add Club button clicked");
  };

  const isFollowed = (clubId: number) => {
    return followedClubs.some((item) => item.club_id === clubId);
  };

  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          alignItems: 'center',
          borderStyle: 'dashed',
          borderWidth: 1,
          margin: 5,
          borderRadius: 15,
        }}
      >
        <Text style={{ fontSize: 17, color: Colors.GRAY }}>Create New Club</Text>
        <Buttontext text="+ Add" onPress={onAddCLubBtnClick} loading={false} />
      </View>

      {clubList.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16, color: Colors.GRAY }}>
          No clubs available.
        </Text>
      ) : (
        <FlatList
          onRefresh={GetAllClubs}
          refreshing={loading}
          data={clubList}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => <ClubCard refreshData={GetAllClubs} {...item} isFollowed={isFollowed(item.id)} />}
        />
      )}
    </View>
  );
};

export default ExploreClubs;
