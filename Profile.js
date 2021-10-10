import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Modal,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Pressable,
  Image,
  SafeAreaView,
} from 'react-native';
const Window = Dimensions.get('window');
// components
import Body from '../../components/template/body/Body';
import Header from '../../components/template/header/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

const Profile = (props) => {
  const [location, onChangelocation] = React.useState(null);
  const [email, onChangeemail] = React.useState(null);
  const [contact, onChangeContact] = React.useState(null);

  const [name, onChangename] = React.useState('John dae');

  return (
    <Body>
      <View>
        <Header title="My Account" lang={false} right={true} cart={false} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            bottom: 20,
            elevation: 1000,
            position: 'absolute',
            left: 95,
            top: 80,
            borderWidth: 10,

            width: 160,
            height: 180,
            borderRadius: 5000,
            borderColor: '#fff',
          }}>
          <Image
            source={{
              uri:
                'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
            style={{
              width: 140,
              height: 170,
              borderRadius: 5000,
            }}
          />
          <View
            style={{
              bottom: 20,
              position: 'absolute',
              left: 145,
              top: 190,
            }}>
            <Image
              source={require('../../assets/edit.png')}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </View>
        </View>
        <View style={{position: 'relative', top: 110}}>
          <SafeAreaView>
            <TextInput
              style={{
                height: 40,
                margin: 12,
                borderBottomWidth: 1,
                padding: 10,
                marginHorizontal: 80,
                fontSize: 20,
                borderColor: 'darkgrey',
              }}
              value="John Dae"
              onChangeText={onChangename}
              value={name}
              placeholder="useless placeholder"
              keyboardType="numeric"
            />
          </SafeAreaView>
          <SafeAreaView>
            <Text
              style={{
                margin: 5,
                marginHorizontal: 30,
                fontSize: 14,
                borderColor: 'darkgrey',
              }}>
              Location
            </Text>
            <TextInput
              style={{
                height: 40,
                margin: 12,
                borderBottomWidth: 1,
                padding: 10,
                marginHorizontal: 20,
                fontSize: 14,
                borderColor: 'darkgrey',
                color: 'darkgrey',
              }}
              onChangeText={onChangelocation}
              value={location}
              placeholder="Newyork"
            />
            <View
              style={{
                bottom: 20,
                position: 'absolute',
                left: 305,
                top: 50,
              }}>
              <Image
                source={require('../../assets/edit.png')}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>
          </SafeAreaView>
          <Text
            style={{
              margin: 5,
              marginHorizontal: 30,
              fontSize: 14,
              borderColor: 'darkgrey',
            }}>
            Email
          </Text>

          <TextInput
            style={{
              height: 40,
              margin: 12,
              borderBottomWidth: 1,
              padding: 10,
              marginHorizontal: 20,
              fontSize: 14,
              borderColor: 'darkgrey',
              color: 'darkgrey',
            }}
            onChangeText={onChangeemail}
            value={email}
            placeholder="johndane@gmail.com"
          />
          <View
            style={{
              bottom: 20,
              position: 'absolute',
              left: 305,
              top: 200,
            }}>
            <Image
              source={require('../../assets/edit.png')}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </View>
          <SafeAreaView>
            <Text
              style={{
                margin: 5,
                marginHorizontal: 30,
                fontSize: 14,
                borderColor: 'darkgrey',
              }}>
              Phone
            </Text>

            <TextInput
              style={{
                height: 40,
                margin: 12,
                borderBottomWidth: 1,
                padding: 10,
                marginHorizontal: 20,
                fontSize: 14,
                borderColor: 'darkgrey',
                color: 'darkgrey',
              }}
              onChangeText={onChangeContact}
              value={contact}
              placeholder="12345567"
              keyboardType="numeric"
            />
            <View
              style={{
                bottom: 20,
                position: 'absolute',
                left: 305,
                top: 50,
              }}>
              <Image
                source={require('../../assets/edit.png')}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>
          </SafeAreaView>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                color: '#ECA140',
                width: 250,
                margin: 15,

                marginHorizontal: 20,
              }}>
              Change Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                color: '#ECA140',
                width: 250,
                margin: 15,

                marginHorizontal: 20,
              }}>
              Change Curency (vendor feature only)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Body>
  );
};

const styles = StyleSheet.create({});
export default Profile;
