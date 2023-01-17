import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@apollo/client";
import { rupiahFormat } from "../helpers";
import { GET_PRODUCTS_DETAIL } from "../config/queries";

export default function DetailScreen({ route }) {
  const [productDetail, setProductDetail] = useState("");
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS_DETAIL, {
    variables: { readDetailProductId: route.params },
  });

  useEffect(() => {
    refetch({ readDetailProductId: route.params });
  }, []);

  useEffect(() => {
    setProductDetail(data?.readDetailProduct);
  }, [data]);
  
  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#9f875d" />
    </View>
  ) : !error ? (
    productDetail && (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.img}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: productDetail.mainImg,
            }}
          />
        </View>
        <View
          style={{
            width: "100%",
            height: 100,
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 10,
          }}
        >
          {productDetail.Images.map((el, idx) => {
            return (
              <Image
                key={idx}
                style={{ width: 100, height: 100, marginHorizontal: 10 }}
                source={{
                  uri: el.imgUrl,
                }}
                resizeMode={"cover"}
              />
            );
          })}
        </View>
        <View style={{ padding: 10, backgroundColor: "white" }}>
          <View style={{}}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {productDetail.name}
            </Text>
            <Text style={{ marginTop: 10 }}>{productDetail.description}</Text>
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
              {productDetail.Category.name}
            </Text>
            <Text style={{ opacity: 0.5, marginTop: 10 }}>
              {productDetail.User.username}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {rupiahFormat(productDetail.price)}
            </Text>
          </View>
        </View>
      </ScrollView>
    )
  ) : (
    <Text>Error</Text>
  );
}

const styles = StyleSheet.create({
  img: {
    width: "100%",
    aspectRatio: 1 / 1,
  },
});
