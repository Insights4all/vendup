import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Picker,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
// components
import Body from '../../components/template/body/Body';
import Header from '../../components/template/header/Header';

import {placeOrder} from '../../actions/orders';
import {useTranslation} from 'react-i18next';

import CryptoJS from 'react-native-crypto-js';

const Checkout = (props) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [actualCost, setActualCost] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const percentDiscount = props.userDetails?.percentDiscount || 0;
  const rtl = props.rtlCustomer;

  useEffect(() => {
    setState({
      firstName: props.userDetails?.firstName,
      lastName: props.userDetails?.lastName,
      company: props.userDetails?.companyName,
      email: '',
      mobile: props.userDetails?.phoneNumber,
      address: props.userDetails?.address,
      note: '',
    });
  }, [props.userDetails]);

  useEffect(() => {
    let totalCost = 0;
    let actualCost = 0;
    // let discount = 0;
    props.cartList.forEach((product) => {
      actualCost += product.amount * product.price;
      if (product.specialPrice > 0 && product.isSpecial) {
        totalCost += product.amount * product.specialPrice;
      } else {
        totalCost +=
          (product.price - (product.price * discount) / 100).toFixed(2) *
          product.amount;
      }
    });
    // if (props.userDetails?.percentDiscount)
    // discount = (totalCost * props.userDetails.percentDiscount) / 100;

    setTotalCost(totalCost);
    setActualCost(actualCost);
    setTotalDiscount(actualCost - totalCost);
    // setDiscount(discount);
  }, [props.cartList, props.userDetails, discount]);

  useEffect(() => {
    if (props.userDetails.percentDiscount)
      setDiscount(props.userDetails.percentDiscount);
  }, [props.userDetails]);

  const handlePlaceOrder = async () => {
    // setLoading(true);
    let listObject = {};
    props.cartList.forEach((product) => {
      listObject[product.vendorId] = 1;
    });
    // separate order for each vendor
    for (const key in listObject) {
      let items = props.cartList
        .filter((p) => p.vendorId === key)
        .map((p) => ({
          _id: p._id,
          name: p.productName,
          price:
            p.specialPrice > 0 && p.isSpecial
              ? p.specialPrice
              : parseFloat((p.price - (p.price * discount) / 100).toFixed(2)),
          unit: p.amount,
          images: p.images,
          serialNo: p.serialNo,
        }));
      try {
        let orderData = {
          customerId: props.userDetails.customerId,
          vendorId: key,
          orderDetails: {
            items: items,
            buyer: state,
            percentDiscount,
            note: state.note,
            discount: totalDiscount.toFixed(2),
            grandTotal: totalCost.toFixed(2),
          },
          orderStatus: 'pending',
        };
        let encryptedOrderData = CryptoJS.AES.encrypt(
          JSON.stringify(orderData),
          props.userDetails.customerId,
        ).toString();
        const resp = await props.placeOrder({encryptedOrderData});
        Alert.alert(
          t('Order placed successfully'),
          '',
          [{text: 'OK', onPress: () => props.navigation.navigate('Home')}],
          {cancelable: false},
        );
      } catch (err) {
        if (err?.response?.data?.message) {
          Alert.alert(
            typeof err.response.data.message === 'string'
              ? err.response.data.message
              : t('Something went wrong'),
            '',
            [{text: 'OK', onPress: () => console.log(err)}],
            {cancelable: false},
          );
        } else {
          Alert.alert(
            t('Something went wrong'),
            '',
            [{text: 'OK', onPress: () => console.log(err)}],
            {cancelable: false},
          );
        }
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <Body>
      <ScrollView stickyHeaderIndices={[0]}>
        <Header back={true} title="Checkout" />
        <View style={styles.container}>
          <View style={styles.detail}>
            <Text style={[styles.label, {textAlign: rtl ? 'right' : 'left'}]}>
              {t('Address')}
            </Text>
            <Text style={{marginTop: 8, marginBottom: 28}}>
              8502 Preston Rd. Inglewood, Maine 98380
            </Text>
            <View style={styles.Divider} />
            <View style={styles.form}>
              {/* <View style={styles.row}>
                <View style={styles.Col}>
                  <TextInput style={[styles.input]} placeholder="First Name" />
                </View>
                <View style={styles.Col}>
                  <TextInput style={[styles.input]} placeholder="Last Name" />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.Col}>
                  <TextInput style={[styles.input]} placeholder="Company" />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.Col}>
                  <TextInput style={[styles.input]} placeholder="Email" />
                </View>
                <View style={styles.Col}>
                  <TextInput style={[styles.input]} placeholder="Mobile" />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.Col}>
                  <View style={styles.input}>
                    <Picker
                      selectedValue={selectedValue}
                      style={{
                        height: 30,
                        width: '100%',
                        textAlign: '00',
                        color: '#444',
                      }}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedValue(itemValue)
                      }>
                      <Picker.Item label="Country" value="java" />
                      <Picker.Item label="Arabic" value="js" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.Col}>
                  <TextInput style={[styles.input]} placeholder="City" />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.Col}>
                  <TextInput style={[styles.input]} placeholder="Address" />
                </View>
              </View> */}

              <View style={rtl ? styles.rowSpacedRTL : styles.rowSpaced}>
                <Text style={{fontSize: 16}}> {t('Products')} </Text>
                <Text style={{fontSize: 16}}> {t('Total Price')} </Text>
              </View>
              <View style={{marginVertical: 10}} />
              {props.cartList.map((product, i) => (
                <View
                  style={rtl ? styles.rowSpacedRTL : styles.rowSpaced}
                  key={i}>
                  <Text style={{fontSize: 14, marginTop: 10}}>
                    {' '}
                    {product.productName} ({product.amount}x){' '}
                  </Text>
                  <Text style={styles.label}>
                    {/* {product.specialPrice
                      ? product.specialPrice * product.amount
                      : (
                        product.price -
                        (product.price * discount) / 100
                      ).toFixed(2) * product.amount} */}
                    {product.specialPrice > 0 && product.isSpecial
                      ? (product.specialPrice * product.amount).toFixed(2)
                      : (product.price * product.amount).toFixed(2)}
                  </Text>
                </View>
              ))}
              <View style={styles.Divider} />
              <View style={rtl ? styles.rowSpacedRTL : styles.rowSpaced}>
                <Text style={{fontSize: 15}}> {t('Discount')} </Text>
                <Text style={styles.discount}>
                  {' '}
                  -{totalDiscount.toFixed(2)}{' '}
                </Text>
              </View>

              <View style={styles.Divider} />
              <View style={rtl ? styles.rowSpacedRTL : styles.rowSpaced}>
                <Text style={styles.Header}> {t('Total Amount')} </Text>
                <Text style={styles.Header}> {actualCost.toFixed(2)} </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.Col}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <TextInput
                      style={[
                        styles.input,
                        {textAlign: rtl ? 'right' : 'left'},
                      ]}
                      placeholder={t('Add Notes')}
                      value={state.note}
                      onChangeText={(value) =>
                        setState({...state, note: value})
                      }
                    />
                    <Image
                      source={require('../../assets/edit.png')}
                      resize={'cover'}
                      style={{
                        width: 20,
                        height: 20,
                        position: 'absolute',
                        marginLeft: 250,
                        marginTop: 10,
                      }}
                    />

                    {/* <Text
                      style={{
                        position: 'absolute',
                        marginLeft: 210,
                        marginTop: 10,
                      }}>
                      Checkbox
                    </Text>
                  </View> */}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderWidth: 1,
                      padding: 6,
                      borderRadius: 5,
                      borderColor: '#E5E5E5',
                    }}>
                    <Text style={{marginTop: 6}}>Save Order List?</Text>
                    <CheckBox />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.btnFill}
                onPress={() => handlePlaceOrder()}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#ECA140" />
                ) : (
                  <Text style={styles.btnFillText}>{t('Place Order')}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Body>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowSpaced: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    width: '100%',
  },
  rowSpacedRTL: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    width: '100%',
  },
  detail: {
    margin: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 1,
  },
  Header: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#444',
    letterSpacing: 0.5,
  },
  Divider: {
    height: 1.5,
    width: '100%',
    backgroundColor: '#e1e1e1',
    marginVertical: 15,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
    marginTop: 80,
  },
  Col: {
    flex: 1,
    paddingHorizontal: 5,
  },
  label: {
    color: '#777',
  },
  discount: {
    color: '#0DA300',
  },
  Link: {
    color: '#00f',
  },
  LinkContainer: {
    paddingHorizontal: 7,
    borderRightWidth: 1,
    borderColor: '#00f',
  },
  btnFill: {
    backgroundColor: '#ECA140',
    padding: 10,
    borderRadius: 3,
    elevation: 10,
    marginTop: 10,
    // width: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
  btnFillText: {
    color: '#fff',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 18,
  },
});

// export default Checkout;
function mapStateToProps(state) {
  return {
    rtlCustomer: state.theme.rtlCustomer,
    cartList: state.cart.cartList,
    userDetails: state.auth.userDetails,
  };
}

export default connect(mapStateToProps, {
  placeOrder,
})(Checkout);
