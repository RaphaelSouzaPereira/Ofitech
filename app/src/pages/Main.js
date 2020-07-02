import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Rating, Tooltip } from "react-native-elements";
import api from "../services/api";
import Icon from 'react-native-vector-icons/FontAwesome';


function Main({ navigation }) {
  const [mecanicas, setMecanicas] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [servicos, setServicos] = useState("");
  const [avaliacao, onChangeAvaliacao] = useState(0);
  const [preco, onChangePreco] = useState(0);
  const DOLAR_IMAGE = require("../img/dolar.png");

  useEffect(() => {
    //função que vai carregar a posição inicial do mapa
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }
    loadInitialPosition();
  }, []);

  async function loadMecanicas() {
    const { latitude, longitude } = currentRegion;
    let response;
    if (servicos !== "" && avaliacao !== 0 && preco !== 0) {
      console.log('entrei no servico avaliacao preco');
      response = await api.get("/search", {
        params: {
          latitude,
          longitude,
          servicos,
          avaliacao,
          preco,
        },
      });
    } else if (servicos !== "" && avaliacao == 0 && preco !== 0) {
      console.log('entrei no servico sem avaliacao preco');
      response = await api.get("/search", {
        params: {
          latitude,
          longitude,
          servicos,
          preco,
        },
      });
    } else if (servicos !== "" && avaliacao !== 0 && preco == 0) {
      console.log('entrei no servico avaliacao sem preco');
      response = await api.get("/search", {
        params: {
          latitude,
          longitude,
          servicos,
          avaliacao,
        },
      });
    } else if (servicos == "" && avaliacao !== 0 && preco !== 0) {
      console.log('entrei no sem servico avaliacao preco');
      response = await api.get("/search", {
        params: {
          latitude,
          longitude,
          avaliacao,
          preco,
        },
      });
    } else if (servicos !== "" && avaliacao == 0 && preco == 0) {
      console.log('entrei no servico sem avaliacao sem preco');
      response = await api.get("/search", {
        params: {
          latitude,
          longitude,
          servicos,
        },
      });
    } else if (servicos == "" && avaliacao !== 0 && preco == 0) {
      console.log('entrei no sem servico avaliacao sem preco');
      response = await api.get("/search", {
        params: {
          latitude,
          longitude,
          avaliacao,
        },
      });
    } else if (servicos == "" && avaliacao == 0 && preco !== 0) {
      console.log('entrei no sem servico sem avaliacao preco');
      response = await api.get("/search", {
        params: {
          latitude,
          longitude,
          preco,
        },
      });
    } else {
      console.log('entrei no sem servico sem avaliacao sem preco');
      response = await api.get("/search", {
        params: {
          latitude,
          longitude,
        },
      });
    }
    setMecanicas(response.data.mecanicas);
    onChangeAvaliacao(0);
    onChangePreco(0);
    setServicos("");
  }

  //Preenche o estado da regiao toda vez que o usuario mexer no mapa
  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  //só vai carregar alguma coisa quando for possivel pegar a localização do usuario
  if (!currentRegion) {
    return null;
  }

  return (
    //visualização do mapa
    //Formilario de pesquisa
    <>
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
        style={styles.map}
      >
        {mecanicas.map((mec) => (
          <Marker
            key={mec._id}
            coordinate={{
              longitude: mec.location.coordinates[0],
              latitude: mec.location.coordinates[1],
            }}
          >
            <Image style={styles.icon} source={require("../img/icon3.png")} />
            <Callout
              onPress={() => {
                //navegação para a pasta de dados da mecanica
                navigation.navigate("Mecanica", {
                  id: mec._id,
                  name: mec.name,
                  telefone: mec.telefone,
                  endereco: mec.endereco,
                  email: mec.email,
                  servicos: mec.servicos,
                  idUser: "useridteste",
                  genero: "feminino",
                  avaliacaoMedia: mec.avaliacao,
                  precoMedia: mec.preco,
                }); //passar aqui o parametro que vai linkar a mecanica especifica
              }}
            >
            <View style={styles.callout}>
                <Text style={styles.mecName}>{mec.name}</Text>
                <Text style={styles.mecServicos}>
                  {mec.servicos.join(", ")}
                </Text>
                <Text style={styles.mecTel}>{mec.telefone}</Text>
              </View>
            <View>
            </View>  
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          placeholderTextColor="#999"
          autoCapitalize="words" //Primeira letra de cada palavra em caixa alta
          autoCorrect={false}
          value={servicos}
          onChangeText={(text) => setServicos(text)}
        />
        <TouchableOpacity onPress={loadMecanicas} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.viewFiltro}>
       <Rating
          showRating
          startingValue={0}
          fractions={1}
          onFinishRating={onChangeAvaliacao}
          style={styles.searchFilter1}
          ratingBackgroundColor="#00BFFF"
          ratingColor="#00BFFF"
          imageSize={20}
        />
      <Tooltip containerStyle={styles.tool} popover={<Text>Pressione para o lado para selecionar o valor inicial da avaliação desejada.</Text>}>  
          <MaterialIcons style={styles.exclamac} name="info" size={20} color="#ffffff"/>
      </Tooltip>
      </View>
      <View style={styles.viewFiltro}>
       <Rating
          type="custom"
          showRating
          startingValue={0}
          ratingImage={DOLAR_IMAGE}
          ratingColor="green"
          ratingBackgroundColor="#00BFFF"
          ratingCount={3}
          fractions={1}
          imageSize={20}
          onFinishRating={onChangePreco}
          style={styles.searchFilter2}
        />
      <Tooltip containerStyle={styles.tool} popover={<Text>Pressione para o lado para selecionar o valor inicial da média de preço desejada.</Text>}>
      <MaterialIcons style={styles.exclamac} name="info" size={20} color="#ffffff"/>
      </Tooltip>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  icon: {
    width: 35,
    height: 35,
    borderRadius: 54 / 2,
    borderWidth: 1.5,

  },
  callout: {
    width: 260,    
  },
  mecName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  mecServicos: {
    color: "#666",
    marginTop: 5,
  },
  mecTel: {
    marginTop: 5,
  },
  searchForm: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row",
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: "#000", //sombra ios
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2, //sombra android
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: "#31c4ed",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  searchFilter1: {
    //position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    flexDirection: "row",
    backgroundColor: "#00BFFF",
  },
  searchFilter2: {
    //position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    flexDirection: "row",
    backgroundColor: "#00BFFF",
  },
  tool:{
    width: 200,
    height: 60,
    backgroundColor: "#87CEEB",
    color: '#4F4F4F',
    fontSize: 16,
   },
   exclamac:{
     backgroundColor: "#00BFFF",
     marginLeft: 10
   },
   viewFiltro:{
     flex: 0.1,
     alignItems: "center",
     flexDirection: "row",
     backgroundColor: "#00BFFF"
   }
});

export default Main;
