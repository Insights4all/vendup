import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
const Window = Dimensions.get('window');

import AntIcon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {fetchOrderDetails} from '../../actions/orders';
import OrderCard from './component/OrderCard';
import moment from 'moment';
// components
import Body from '../../components/template/body/Body';
import Header from '../../components/template/header/Header';
import {useTranslation} from 'react-i18next';

const OrderDetail = (props) => {
  const {t} = useTranslation();
  const rtl = props.rtlCustomer;
  useEffect(() => {
    props.fetchOrderDetails(props.route.params.id);
  }, []);
  const fetchSubTotal = (items) => {
    let subtotal = 0;
    props.order.orderDetails.items.map((item) => {
      subtotal += item.price * item.unit;
    });
    return subtotal;
  };
  const fetchDiscountAmount = () => {
    return parseFloat(
      (fetchSubTotal() * props.order.orderDetails.percentDiscount) / 100,
    ).toFixed(2);
  };
  if (props.loading)
    return (
      <ActivityIndicator size="large" color="#000" style={{marginTop: 20}} />
    );
  else
    return (
      <Body style={{backgroundColor: '#E5E5E5'}}>
        <Header title="Order Dtetail" back={true} />
        {props.order.hasOwnProperty('_id') && (
          <ScrollView style={{backgroundColor: '#E5E5E5'}}>
            <View style={styles.detail}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 14}}>Order no : {props.order._id}</Text>
                <Text
                  style={[
                    styles.statusText,
                    {
                      color:
                        props.order.orderStatus === 'accepted'
                          ? '#228B22'
                          : props.order.orderStatus === 'cancelled'
                          ? '#f30'
                          : props.order.orderStatus === 'pending'
                          ? '#ff9e43'
                          : '#444',
                      textTransform: 'capitalize',
                    },
                  ]}>
                  {props.order.orderStatus}
                </Text>
              </View>
              <View style={styles.Divider} />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 14, color: '#777'}}>Order Date : </Text>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: rtl ? 'right' : 'left',
                  }}>
                  {moment
                    .utc(props.order.createdAt)
                    .local()
                    .format('MMM DD, YYYY | HH:mm A')}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 14, color: '#777'}}>Order To : </Text>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: rtl ? 'right' : 'left',
                  }}>
                  {props.order.orderDetails.buyer.firstName}{' '}
                  {props.order.orderDetails.buyer.lastName}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 14, color: '#777'}}>Order From : </Text>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'left',
                    marginTop: 2,
                    textAlign: rtl ? 'right' : 'left',
                  }}>
                  {props.order.orderDetails.seller.firstName}{' '}
                  {props.order.orderDetails.seller.lastName}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style={{fontSize: 14, color: '#777'}}>
                  Order Notes :{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'left',
                    marginTop: 2,
                    textAlign: rtl ? 'right' : 'left',
                  }}>
                  Lorem Ipsum
                </Text>
              </View>

              <View style={[rtl ? styles.flexRowRTL : styles.flexRow]}>
                <View style={{flex: 1, backgroundColor: '#f000'}}></View>
              </View>
              <View style={{marginVertical: 10}} />

              {/* table */}
              <View>
                {/* <View
                  style={[
                    rtl ? styles.flexRowRTL : styles.flexRow,
                    {
                      flex: 1,
                      borderBottomWidth: 1,
                      borderColor: '#bbb',
                    },
                  ]}>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        styles.orderdata,
                        {
                          fontWeight: 'bold',
                          paddingTop: 2,
                          paddingBottom: 18,
                          textAlign: rtl ? 'right' : 'left',
                        },
                      ]}>
                      #
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        styles.orderdata,
                        {
                          fontWeight: 'bold',
                          marginTop: -16.5,
                          textAlign: rtl ? 'right' : 'left',
                        },
                      ]}>
                      {t("Item Name")}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        styles.orderdata,
                        {
                          fontWeight: 'bold',
                          marginTop: -16.5,
                          textAlign: rtl ? 'right' : 'left',
                        },
                      ]}>
                      {t("Unit Price")}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        styles.orderdata,
                        {
                          fontWeight: 'bold',
                          paddingTop: 2,
                          paddingBottom: 18,
                          textAlign: rtl ? 'right' : 'left',
                        },
                      ]}>
                      {t("Unit")}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        styles.orderdata,
                        {
                          fontWeight: 'bold',
                          paddingTop: 2,
                          paddingBottom: 18,
                          textAlign: rtl ? 'right' : 'left',
                        },
                      ]}>
                      {t("Cost")}
                    </Text>
                  </View>
                </View> */}
                <View
                  style={{
                    borderRadius: 5,
                    backgroundColor: '#E5E5E5',
                    marginVertical: 10,
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 15,
                      paddingHorizontal: 15,
                    }}>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                      Product
                    </Text>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                      Unit Price
                    </Text>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>Unit</Text>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>Cost</Text>
                  </View>

                  {props.order.orderDetails.items.map((item, i) => (
                    <React.Fragment key={i}>
                      <OrderCard item={item} i={i} />
                    </React.Fragment>
                  ))}

                  <View style={styles.NewDivider} />
                  <View style={{marginVertical: 5}}>
                    <View style={rtl ? styles.rowSpacedRTL : styles.rowSpaced}>
                      <Text style={{fontSize: 14}}>{t('Price')}:</Text>
                      <Text style={{fontSize: 14}}>
                        {parseFloat(fetchSubTotal()).toFixed(2)}
                      </Text>
                    </View>
                    <View style={{marginVertical: 2}} />

                    <View style={{marginVertical: -5}} />

                    <View style={rtl ? styles.rowSpacedRTL : styles.rowSpaced}>
                      <Text style={{fontSize: 14, marginTop: 15}}>
                        {t('Discount')}
                      </Text>
                      <Text
                        style={{fontSize: 14, marginTop: 15, color: '#0DA300'}}>
                        {/* - {fetchDiscountAmount()} */}-$
                        {props.order.orderDetails.discount
                          ? parseFloat(
                              props.order.orderDetails.discount,
                            ).toFixed(2)
                          : parseFloat(fetchDiscountAmount()).toFixed(2)}
                      </Text>
                    </View>
                    <View style={{marginVertical: 10}} />

                    <View style={{marginVertical: 4}} />

                    <View style={rtl ? styles.rowSpacedRTL : styles.rowSpaced}>
                      <Text
                        style={{
                          fontSize: 14,
                          marginTop: 8,
                          marginBottom: 7,
                        }}>
                        {t('Total Amount')}:
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          marginTop: 8,
                          fontWeight: 'bold',
                        }}>
                        {/* {(fetchSubTotal() - fetchDiscountAmount()).toFixed(2)} */}
                        $
                        {props.order.orderDetails.grandTotal
                          ? parseFloat(
                              props.order.orderDetails.grandTotal,
                            ).toFixed(2)
                          : (fetchSubTotal() - fetchDiscountAmount()).toFixed(
                              2,
                            )}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* table */}
            <View style={{marginVertical: 20}} />
          </ScrollView>
        )}
      </Body>
    );
};

const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  flexRowRTL: {
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '100%',
  },
  rowSpaced: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    width: '100%',

    paddingHorizontal: 18,
    marginTop: 1,
  },
  rowSpacedRTL: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    width: '100%',
    paddingHorizontal: 15,
  },
  orderDetail: {
    width: Window.width,
    height: Window.height,
  },
  detail: {
    margin: 15,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 0,
    backgroundColor: '#fff',
  },
  Divider: {
    height: 1.5,
    width: '100%',
    backgroundColor: '#e1e1e1',
    marginVertical: 15,
  },
  NewDivider: {
    height: 1.5,
    width: '90%',
    marginLeft: 20,
    backgroundColor: '#777',
    marginVertical: 15,
  },
  orderinfo: {
    // paddingHorizontal: 30,
    // paddingVertical: 20,
    justifyContent: 'space-between',
    marginTop: 10,
    // borderBottomWidth: 2,
    // borderColor: '#ddd',
  },
  orderto: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 5,
  },
  orderdata: {
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderColor: '#bbb',
    color: '#000',
    position: 'absolute',
    top: 480.98,

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
  },
  total: {
    paddingHorizontal: 30,
    paddingTop: 5,
    paddingBottom: 20,
    justifyContent: 'flex-end',
  },
  Viewbtn: {
    flex: 1,
    marginTop: 15,
    // marginLeft: 0,
    borderWidth: 1,
    backgroundColor: '#7467EF',
    borderColor: '#7467EF',
    paddingVertical: 13,
    // borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    elevation: 2,
    height: 50,
  },
  ViewbtnDisabled: {
    flex: 1,
    marginTop: 15,
    // marginLeft: 0,
    borderWidth: 1,
    backgroundColor: '#ccc',
    borderColor: '#ccc',
    paddingVertical: 13,
    // borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    elevation: 2,
    height: 50,
  },
  deletebtn: {
    // flex: 1,
    width: 95,
    marginTop: 15,
    // marginLeft: 0,
    // marginHorizontal: 5,
    borderWidth: 1,
    backgroundColor: '#FF6666',
    borderColor: '#FF6666',
    paddingVertical: 13,
    // borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    elevation: 2,
    height: 50,
  },
  deletebtnDisabled: {
    width: 95,
    marginTop: 15,
    borderWidth: 1,
    backgroundColor: '#ccc',
    borderColor: '#ccc',
    paddingVertical: 13,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    elevation: 2,
    height: 50,
  },
});

function mapStateToProps(state) {
  return {
    order: state.orders.order,
    loading: state.orders.loading,
    rtlCustomer: state.theme.rtlCustomer,
  };
}
export default connect(mapStateToProps, {
  fetchOrderDetails,
})(OrderDetail);
