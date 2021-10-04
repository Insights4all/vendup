import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Picker,
  TextInput,
  Dimensions,
  Animated,
  Easing,
  Pressable,
  Platform,
  Image,
} from 'react-native';
import {Colors} from '../../../theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
const Window = Dimensions.get('window');
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import BlinkView from 'react-native-blink-view';

const isIos = Platform.OS === 'ios';

const Header = (props) => {
  const {t} = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [searchText2, setSearchText2] = useState('');
  const navigation = useNavigation();
  const [blink, setBlink] = useState(true);

  const rtl = props.rtlVendor || props.rtlCustomer;
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((blink) => !blink);
    }, 700);
    return () => clearInterval(interval);
  }, []);
  return (
    <View style={rtl ? styles.headerWrapperRTL : styles.headerWrapper}>
      <View style={rtl ? styles.rowReverse : styles.row}>
        {props.back === true ? (
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: rtl ? 'row-reverse' : 'row',
              width: Window.width,
            }}>
            <TouchableOpacity
              style={styles.menuBtn}
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <FeatherIcon name="menu" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.menuBtn, {marginLeft: rtl ? 20 : 0}]}
              onPress={() => {
                navigation.goBack();
              }}>
              <FeatherIcon
                name="arrow-left"
                size={isIos ? 25 : 20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => {
              navigation.toggleDrawer();
            }}>
            <FeatherIcon name="menu" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {props.right === true ? (
        <View style={rtl ? styles.rowReverse : styles.row}>
          {props.lang === true ? (
            <>
              {/* <View
                style={[
                  rtl ? styles.searchRTL : styles.search,
                  {width: props.cart === false ? '90%' : '75%'},
                ]}>
                <FontAwesome5 name="search" size={15} color="#777" />
                <TextInput
                  placeholder={t('Search here')}
                  style={rtl ? styles.searchInputRTL : styles.searchInput}
                  onChangeText={(value) => {
                    props.onSearchChange(value);
                    setSearchText(value);
                    console.log(value);
                  }}
                  value={searchText}
                />
                <Pressable
                  style={{width: 20}}
                  onPress={() => {
                    setSearchText('');
                    props.onSearchChange('');
                  }}>
                  <FeatherIcon
                    name="x"
                    size={15}
                    color={searchText !== '' ? '#222' : '#fff'}
                  />
                </Pressable>
              </View> */}

              <View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/VendupLogoSmall.png')}
                  />
                  <Image source={require('../../../assets/VendupText.png')} />
                </View>
              </View>

              {props.cart === true && (
                <>
                  <TouchableOpacity
                    style={{margin: 10, position: 'relative', left: 20}}
                    onPress={() => {
                      navigation.navigate('Cart');
                    }}>
                    {props.cartList.length > 0 && (
                      <View style={[styles.badge, {opacity: blink ? 0 : 1}]}>
                        <Text style={{fontSize: 9}}>
                          {props.cartList.length}
                        </Text>
                      </View>
                    )}
                    <FontAwesome5 name="shopping-cart" size={20} color="#fff" />
                  </TouchableOpacity>
                </>
              )}
            </>
          ) : (
            <>
              <View style={[{width: props.cart === false ? '90%' : '75%'}]}>
                <Text
                  style={{
                    fontSize: 22,
                    color: '#fff',
                    marginLeft: 53,
                    marginTop: 5,
                  }}>
                  Order Status
                </Text>
              </View>
              {props.cart === true && (
                <TouchableOpacity
                  style={{margin: 10, position: 'relative'}}
                  onPress={() => {
                    navigation.navigate('Cart');
                  }}>
                  {props.cartList.length > 0 && (
                    <View style={[styles.badge, {opacity: blink ? 0 : 1}]}>
                      <Text style={{fontSize: 9}}>{props.cartList.length}</Text>
                    </View>
                  )}
                  <FontAwesome5 name="shopping-cart" size={20} color="#fff" />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#1a2038',
    padding: 15,
    elevation: 10,
    paddingBottom: 100,
  },
  headerWrapperRTL: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    backgroundColor: '#1a2038',
    padding: 15,
    elevation: 10,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowReverse: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  menuBtn: {
    marginRight: 15,
  },
  Header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#444',
  },
  search: {
    marginLeft: 10,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 30,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  searchRTL: {
    marginLeft: 10,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 30,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    height: 35,
    marginLeft: 7,
    marginTop: 5,
    textAlignVertical: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    padding: 0,
    backgroundColor: '#0000',
    marginTop: 0,
  },
  searchInputRTL: {
    flex: 1,
    height: 35,
    marginRight: 7,
    marginTop: 5,
    textAlign: 'right',
    textAlignVertical: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    padding: 0,
    backgroundColor: '#0000',
    marginTop: 0,
  },
  badge: {
    width: 20,
    height: 20,
    backgroundColor: '#ff0',
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 99,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// export default Header;

function mapStateToProps(state) {
  return {
    rtlVendor: state.theme.rtlVendor,
    rtlCustomer: state.theme.rtlCustomer,
    cartList: state.cart.cartList,
  };
}

export default connect(mapStateToProps, {})(Header);
