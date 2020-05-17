import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';

function Main({ navigation }) {
    const [mecanicas, setMecanicas] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [servicos, setServicos] = useState('');

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
        if(servicos !== ""){
            response = await api.get("/search", {
                params: {
                  latitude,
                  longitude,
                  servicos,
                },
              });
        }else{
            response = await api.get("/search", {
                params: {
                  latitude,
                  longitude
                },
              });
        }
           setMecanicas(response.data.mecanicas);
      }

    //Preenche o estado da regiao toda vez que o usuario mexer no mapa
    function handleRegionChanged(region){
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
         {mecanicas.map(mec =>(   
            <Marker 
            key={mec._id}
                coordinate={{ 
                    longitude: mec.location.coordinates[0],
                    latitude: mec.location.coordinates[1]
            }}>
            <Image 
                style={styles.icon} 
                source={require('../img/icon2.jpg')} 
            />
            <Callout
                onPress={() => {
                //navegação para a pasta de dados da mecanica
                navigation.navigate('Mecanica', 
                {name: mec.name, 
                 telefone : mec.telefone,
                 endereco: mec.endereco,
                 email: mec.email,
                 servicos: mec.servicos   
                }
                ); //passar aqui o parametro que vai linkar a mecanica especifica
            }}>
                <View style={styles.callout}>
                    <Text style={styles.mecName}>{mec.name}</Text>
                    <Text style={styles.mecServicos}>{mec.servicos.join(', ')}</Text>
                    <Text style={styles.mecTel}>{mec.telefone}</Text>
                </View>
            </Callout>
        </Marker>
          ))}    
        </MapView>
       
        <View style={styles.searchForm}>
            <TextInput style={styles.searchInput}
                placeholder="Buscar..."
                placeholderTextColor="#999"
                autoCapitalize="words" //Primeira letra de cada palavra em caixa alta
                autoCorrect={false}
                value={servicos}
                onChangeText={text => setServicos(text)}
            />
            <TouchableOpacity onPress={loadMecanicas} style={styles.loadButton}>
                <MaterialIcons name="my-location" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>  
    </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    icon: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },
    callout: {
        width: 260,
    },
    mecName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    mecServicos: {
        color: '#666',
        marginTop: 5,
    },
    mecTel: {
        marginTop: 5,
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000', //sombra ios
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,  //sombra android

    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#31c4ed',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
});


export default Main;