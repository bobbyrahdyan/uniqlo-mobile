import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@apollo/client";
import { rupiahFormat } from "../helpers";
import { GET_PRODUCTS } from "../config/queries";

function ProductScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    setProducts(data?.readAllProducts);
  }, [data]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Detail", item.id)}
    >
      <View style={{ aspectRatio: 1 / 1 }}>
        <Image style={{ flex: 1 }} source={{ uri: item.mainImg }} />
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
        <View style={{ marginTop: "auto" }}>
          <Text
            style={{
              textAlign: "center",
              backgroundColor: "#9f875d",
              alignSelf: "flex-start",
              borderRadius: 10,
              paddingHorizontal: 8,
              paddingVertical: 3,
              fontSize: 11,
              fontWeight: "bold",
              color: "white",
              marginTop: 10,
            }}
          >
            {item.Category.name}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            {rupiahFormat(item.price)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#9f875d" />
    </View>
  ) : !error ? (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        style={styles.cards}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={false}
        onRefresh={() => refetch()}
      />
    </View>
  ) : (
    <Text>Error</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "snow",
  },
  cards: {
    flex: 1,
  },
  card: {
    width: "46%",
    margin: 8,
    backgroundColor: "white",
    shadowColor: "silver",
    elevation: 3,
    borderRadius: 5,
  },
});

export default ProductScreen;
