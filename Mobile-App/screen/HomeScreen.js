import { View, TouchableOpacity, Text, ImageBackground } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{
        uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcms.qz.com%2Fwp-content%2Fuploads%2F2016%2F10%2Fgettyimages-164759083-cropped.jpg%3Fquality%3D75%26strip%3Dall%26w%3D1400&f=1&nofb=1",
      }}
      style={{ flex: 1, justifyContent: "center" }}
      blurRadius={3}
    >
      <View style={{ flex: 1 }}></View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            borderColor: "white",
            borderWidth: 4,
            borderRadius: 10,
            opacity: 0.9,
          }}
          onPress={() => navigation.navigate("ShowCase")}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 40 }}>
            Go To Product
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
