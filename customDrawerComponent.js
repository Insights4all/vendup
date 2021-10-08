import React, {useEffect} from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Picker,
  Modal,
  Dimensions,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {setRTLCUSTOMER, setLangCustomer} from '../actions/theme';

import {setRole, SetAuthLogout} from '../actions/auth';
import {fetchVendors, setActiveVendorId} from '../actions/shop';
import {useTranslation} from 'react-i18next';

const Window = Dimensions.get('window');

const CustomDrawerComponent = (props) => {
  const {t, i18n} = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const rtl = props.rtlCustomer;

  // const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = React.useState('en');
  const [menu, setMenu] = React.useState('shop');
  const [drop, setDrop] = React.useState(false);

  const logOut = async () => {
    i18n.changeLanguage('enUS');
    await AsyncStorage.setItem('lang', 'enUS');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
    props.SetAuthLogout();
  };

  useEffect(() => {
    props.fetchVendors();
  }, []);

  const rtlSet = async (lang) => {
    if (lang === 'enUS') {
      i18n.changeLanguage('enUS');
      await AsyncStorage.setItem('lang', 'enUS');
      props.setRTLCUSTOMER(false);
      props.setLangCustomer('enUS');
    } else if (lang === 'arUA') {
      i18n.changeLanguage('arUA');
      await AsyncStorage.setItem('lang', 'arUA');
      props.setRTLCUSTOMER(true);
      props.setLangCustomer('arUA');
    } else if (lang === 'heIL') {
      i18n.changeLanguage('heIL');
      await AsyncStorage.setItem('lang', 'heIL');
      props.setRTLCUSTOMER(true);
      props.setLangCustomer('heIL');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/sidebar-bg-dark.jpg')}
      style={{flex: 1}}>
      <View style={styles.wrapper}>
        <DrawerContentScrollView {...props}>
          <View style={rtl ? styles.topSectionRTL : styles.topSection}>
            <Image
              source={require('../assets/v2.png')}
              style={rtl ? styles.logoRTL : styles.logo}
            />
            <Text style={styles.header}>Vendup</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.menu}>
            <TouchableOpacity
              style={[
                menu === 'order'
                  ? rtl
                    ? styles.activeRTL
                    : styles.active
                  : rtl
                  ? styles.itemRTL
                  : styles.item,
              ]}
              onPress={() => {
                setMenu('order');
                setDrop(false);
                props.navigation.navigate('Orders');
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/Union.png')}
                resize={'cover'}
              />
              <Text style={styles.itemText}> {t('Vendors')} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                menu === 'order'
                  ? rtl
                    ? styles.activeRTL
                    : styles.active
                  : rtl
                  ? styles.itemRTL
                  : styles.item,
              ]}
              onPress={() => {
                setMenu('order');
                setDrop(false);
                props.navigation.navigate('Home');
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/Union.png')}
                resize={'cover'}
              />
              <Text style={styles.itemText}> {t('Shops')} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                menu === 'order'
                  ? rtl
                    ? styles.activeRTL
                    : styles.active
                  : rtl
                  ? styles.itemRTL
                  : styles.item,
              ]}
              onPress={() => {
                setMenu('order');
                setDrop(false);
                props.navigation.navigate('Orders');
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/Orders.png')}
                resize={'cover'}
              />
              <Text style={styles.itemText}> {t('My Orders')} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                menu === 'order'
                  ? rtl
                    ? styles.activeRTL
                    : styles.active
                  : rtl
                  ? styles.itemRTL
                  : styles.item,
              ]}
              onPress={() => {
                setMenu('order');
                setDrop(false);
                props.navigation.navigate('Cart');
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/cart.png')}
                resize={'cover'}
              />
              <Text style={styles.itemText}> {t('Cart')} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                menu === 'cart'
                  ? rtl
                    ? styles.activeRTL
                    : styles.active
                  : rtl
                  ? styles.itemRTL
                  : styles.item,
              ]}
              onPress={() => {
                setMenu('cart');
                setDrop(false);
                props.navigation.navigate('Profile');
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/account.png')}
                resize={'cover'}
              />
              <Text style={styles.itemText}> {t('My Account')} </Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.row} >
            <TouchableOpacity style={ selectedValue === 'en' ? styles.langActive : styles.lang} onPress={() => {setSelectedValue('en')}} >
              <Text style={styles.langText} >EN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.lang} style={ selectedValue === 'ar' ? styles.langActive : styles.lang} onPress={() => {setSelectedValue('ar')}} >
              <Text style={styles.langText} >AR</Text>
            </TouchableOpacity>
          </View>  */}

          <TouchableOpacity
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              padding: 15,
              marginBottom: 15,
            }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../assets/language.png')}
              resize={'cover'}
            />
            <Text
              style={{
                flex: 1,
                color: '#fff',
                fontSize: 16,
                fontStyle: 'italic',
                marginLeft: 5,
              }}>
              Language
            </Text>
            {props.langCustomer === 'enUS' ? (
              <Text style={{flex: 1, color: '#fff', fontSize: 16}}></Text>
            ) : props.langCustomer === 'arUA' ? (
              <Text style={{flex: 1, color: '#fff', fontSize: 16}}></Text>
            ) : (
              <Text style={{flex: 1, color: '#fff', fontSize: 16}}></Text>
            )}
            <Icons
              name="chevron-down"
              size={16}
              color="#fff"
              style={styles.logoutButnIcon}
            />
          </TouchableOpacity>
          <View style={styles.nextdivider} />

          {/* <Picker
            selectedValue={props.langCustomer}
            style={{
              height: 30,
              width: '95%',
              textAlign: 'cneter',
              color: '#fffc',
              marginLeft: 7,
              marginTop: 10,
              marginBottom: 30,
            }}
            onValueChange={(itemValue, itemIndex) =>
              rtlSet(itemValue)
            }>
            <Picker.Item label="En" value="enUS" />
            <Picker.Item label="Ar" value="arUA" />
            <Picker.Item label="He" value="heIL" />
          </Picker> */}
          <View style={styles.body}>
            <View style={styles.userSection}>
              <TouchableOpacity
                style={rtl ? styles.logoutButnRTL : styles.logoutButn}
                onPress={() => {
                  logOut();
                  props.navigation.closeDrawer();
                }}>
                <Icons
                  name="logout"
                  size={25}
                  color="#FF4A76"
                  style={styles.logoutButnIcon}
                />

                <Text
                  style={{
                    flex: 1,
                    color: '#FF4A76',
                    fontSize: 16,
                    marginLeft: 5,
                  }}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </DrawerContentScrollView>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={styles.centeredView}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={styles.modalView}>
            <TouchableOpacity
              style={{
                width: Window.width - 100,
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderColor: '#fafafa',
                height: Window.height / 15,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 15,
              }}
              onPress={() => {
                rtlSet('enUS');
                setModalVisible(false);
              }}>
              <Text>En</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: Window.width - 100,
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderColor: '#fafafa',
                height: Window.height / 15,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 15,
              }}
              onPress={() => {
                rtlSet('arUA');
                setModalVisible(false);
              }}>
              <Text>Ar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: Window.width - 100,
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderColor: '#fafafa',
                height: Window.height / 15,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 15,
              }}
              onPress={() => {
                rtlSet('heIL');
                setModalVisible(false);
              }}>
              <Text>He</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  topSection: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
  },
  topSectionRTL: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    padding: 15,
  },
  logo: {
    width: 40,
    height: 30,
    marginRight: 10,
  },
  logoRTL: {
    width: 40,
    height: 30,
    marginLeft: 10,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  body: {
    padding: 15,
  },
  userName: {
    fontSize: 18,
    color: '#fff',
  },
  logoutButn: {
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoutButnRTL: {
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoutButnIcon: {},
  menu: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    paddingVertical: 50,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 2,
  },
  itemRTL: {
    display: 'flex',
    flexDirection: 'row-reverse',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 2,
  },
  active: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 2,
  },
  activeRTL: {
    display: 'flex',
    flexDirection: 'row-reverse',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 2,

    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  itemIcon: {
    marginHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'ABeeZee',
    fontStyle: 'italic',
    marginLeft: 5,
  },
  itemLeft: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemLeftRTL: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  dropWrapper: {
    paddingLeft: 15,
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(34, 42, 69, 0.96)',
  },
  row: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  lang: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#fff1',
    width: 100,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  langActive: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#00fa',
    width: 100,
    marginHorizontal: 10,
    marginVertical: 15,
  },
  langText: {
    color: '#fffe',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  divider: {
    width: '90%',
    backgroundColor: 'grey',
    height: '0.2%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 30,
    left: 10,
  },
  nextdivider: {
    width: '90%',
    backgroundColor: 'grey',
    height: '0.2%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 10,
    left: 10,
  },
});
function mapStateToProps(state) {
  return {
    role: state.auth.role,
    vendors: state.shop.vendors,
    rtlCustomer: state.theme.rtlCustomer,
    langCustomer: state.theme.langCustomer,
    userDetails: state.auth.userDetails,
  };
}

export default connect(mapStateToProps, {
  setRole,
  SetAuthLogout,
  fetchVendors,
  setRTLCUSTOMER,
  setLangCustomer,
  setActiveVendorId,
})(CustomDrawerComponent);
