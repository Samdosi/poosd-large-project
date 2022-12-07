import {
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
} from "react-native";
import { React, useState, useEffect } from "react";

import MessageBox from "../src/components/MessageBox";

import Input from "../src/components/Input";

import axios from "axios";

import io from "socket.io-client";

//add search bar for the chat.

function ChatScreen({ navigation, route }) {
  const profileId = route.params.userId;

  const token = route.params.paramKey;

  const [matched, setMatched] = useState([]);

  const [unmatched, setUnmatched] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const [profilePicture, setProfilePicture] = useState();

  const baseURL = "https://only-hands.herokuapp.com";

  const requestMatchInfo = async () => {
    const payload = {
      headers: {
        "x-access-token": token,
      },
    };

    try {
      const response = await axios.get(
        baseURL + "/api/match?searchQuery=" + searchValue,
        payload
      );

      const data = response.data.matches;

      let m = [];

      let u = [];

      data?.forEach((e) => {
        if (e.isComplete) m.push(e);
        else u.push(e);
      });

      setMatched(m);

      setUnmatched(u);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    requestMatchInfo();
  }, [searchValue]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainView}>
        <Text style={styles.title}>Messages</Text>

        <View style={styles.heading}>

          <View style={styles.searchBox}>
            <Input
              placeholder="Enter the name"
              iconName={"magnify"}
              color="white"
              placeholderColor="white"
              value={searchValue}
              onChangeText={setSearchValue}
              
            />
          </View>

        </View>
        
        

        <ScrollView contentContainerStyle = {{backgroundColor:'#35373b',paddingBottom:150}} >
          {matched.map((c) => {
            console.log(c);
            return (
              <MessageBox
                name={c.firstName+" " + c.lastName}
                profileID={c.profileId}
                profileSelfID={profileId}
                token={token }
                matchID={c.matchId}
                status={true}
                online={c.online}
                profilePicture={c.image}
                navigation={navigation}
              />
            );
          })}
          {unmatched.map((c) => {
            return (
              <MessageBox
                name={c.firstName + " " + c.lastName}
                status={false}
                online={c.online}
                profilePicture={c.image}
                navigation={navigation}
              />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading:{
    marginTop: -5,
    //borderBottomWidth:2,
    marginBottom:0
    //bottom:15
    
  },
  

  safeArea: {
    backgroundColor: "#35373b",
    flex: 1,

  },

  title: {
    color: "#ff405b",
    fontStyle: "bold",
    fontSize: 30,
    marginLeft: 10,
    marginTop: -10,
    marginBottom:-15
  },

  searchBox: {
    margin: 10,
    marginTop:-5
    
  },

  mainView: {
    backgroundColor: "rgb(37, 37, 37)",
    //marginTop: 20,
    paddingTop:15,
    borderTopWidth:1
  },

  text: {
    color: "white",
    fontSize: 20,
  },
});

export default ChatScreen;
