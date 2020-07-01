import React, { useState, useEffect, onChangeText } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Picker,
} from "react-native";
import Constants from "expo-constants";
import { Rating } from "react-native-elements";
import apiAvaliacao from "../services/apiAvaliacao";

function Avaliacao({ navigation }) {
  const [descricao, onChangeText] = useState("");
  const [genero, onChangeGenero] = useState("outro");
  const [avaliacao, onChangeAvaliacao] = useState(3);
  const [preco, onChangePreco] = useState(2);
  const DOLAR_IMAGE = require("../img/dolar.png");

  async function finalizarAvaliacao(
    id,
    idUser,
    avaliacao,
    preco,
    descricao,
    genero
  ) {
    await apiAvaliacao.post("/api/avaliacao", {
      descricao: descricao,
      nota: avaliacao,
      valor: preco,
      userId: idUser,
      genero: genero,
      mecanicaId: id,
    });
    navigation.navigate("Main");
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.info}>Descrição:</Text>
        <TextInput
          style={styles.avaliaInput}
          onChangeText={(text) => onChangeText(text)}
        />

        <Text style={styles.info}>Genêro:</Text>
        <Picker
          selectedValue={genero}
          style={styles.avaliaInput}
          onValueChange={(text) => onChangeGenero(text)}
        >
          <Picker.Item label="feminino" value="feminino" />
          <Picker.Item label="masculino" value="masculino" />
          <Picker.Item label="outro" value="outro" />
        </Picker>
        <Rating
          style={styles.aval}
          showRating
          startingValue={3}
          fractions={1}
          onFinishRating={onChangeAvaliacao}
          style={{ paddingVertical: 10 }}
        />
        <Rating
          style={styles.dolar}
          type="custom"
          showRating
          startingValue={2}
          ratingImage={DOLAR_IMAGE}
          ratingColor="green"
          ratingCount={3}
          fractions={1}
          imageSize={30}
          onFinishRating={onChangePreco}
          style={{ paddingVertical: 10 }}
        />
      </View>
      <>
        <Button
          onPress={() =>
            finalizarAvaliacao(
              navigation.getParam("id"),
              navigation.getParam("idUser"),
              avaliacao,
              preco,
              descricao,
              genero
            )
          }
          title="Finalizar"
        />
      </>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "white",
  },
  info: {
    color: "#4F4F4F",
    fontSize: 16,
    marginTop: 10,
    width: 340,
    alignSelf: "center",
  },
  avaliaInput: {
    height: 50,
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: 25,
    paddingHorizontal: 10,
    fontSize: 16,
    shadowColor: "#000", //sombra ios
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2, //sombra android
  },
});

export default Avaliacao;
