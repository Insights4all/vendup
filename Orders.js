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
} from 'react-native';
const Window = Dimensions.get('window');
import MultiSelectComponent from './MultiSelect';
// components
import Body from '../../components/template/body/Body';
import Header from '../../components/template/header/Header';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import FeatherIcon from 'react-native-vector-icons/Feather';

import {connect} from 'react-redux';
import {
  fetchCustomerOrders,
  setFilters,
  resetFilters,
  applyFilter,
  searchOrders,
} from '../../actions/orders';
import {useTranslation} from 'react-i18next';

const Order = (props) => {
  const {t} = useTranslation();
  const rtl = props.rtlCustomer;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const loadData = () => {
    props.fetchCustomerOrders();
  };
  useEffect(() => {
    loadData();
    // console.log(props.orders.orderStatus)
  }, []);
  if (props.loading)
    return (
      <ActivityIndicator size="large" color="#000" style={{marginTop: 20}} />
    );
  else
    return (
      <Body>
        <View style={{backgroundColor: '#E5E5E5'}}>
          <Header
            title="Order List"
            lang={false}
            right={true}
            cart={false}
            onSearchChange={(value) => props.searchOrders(value)}
          />
          <View
            style={[
              rtl ? styles.searchRTL : styles.search,
              {
                backgroundColor: '#fff',
                marginHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 8,
                paddingHorizontal: 10,
                height: 55,
                bottom: 20,
                zIndex: 1000000,
                elevation: 1000,
              },
              // {width: props.cart === false ? '90%' : '75%'},
            ]}>
            <FontAwesome5 name="search" size={15} color="#777" />
            <TextInput
              placeholder={t('Search here')}
              style={[styles.searchInput, {flex: 1, marginLeft: 8}]}
              onChangeText={(value) => {
                props.searchOrders(value);
                setSearchText(value);
                console.log(value);
              }}
              value={searchText}
            />

            <View style={styles.verticaldivider} />
            <TouchableOpacity
              onPress={() => {
                // setSideNav(!sideNav);
                setModalVisible(!modalVisible);
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/filter.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={{flex: 1, backgroundColor: '#E5E5E5'}}
          refreshControl={
            <RefreshControl refreshing={props.loading} onRefresh={loadData} />
          }>
          <View style={styles.detail}>
            {props.orders.map((item, i) => (
              <TouchableOpacity
                style={[
                  rtl ? styles.flexRowRTL : styles.flexRow,
                  styles.orders,
                ]}
                key={i}
                onPress={() => {
                  props.navigation.navigate('OrderDetail', {id: item._id});
                }}>
                <View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.orderText}>
                      {moment
                        .utc(item.createdAt)
                        .local()
                        .format('MMM DD, YYYY | HH:mm A')}
                    </Text>
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            item.orderStatus === 'accepted'
                              ? '#228B22'
                              : item.orderStatus === 'cancelled'
                              ? '#f30'
                              : item.orderStatus === 'pending'
                              ? '#ff9e43'
                              : '#444',
                          textTransform: 'capitalize',
                        },
                      ]}>
                      {t(item.orderStatus)}
                    </Text>
                  </View>
                  <View style={styles.Divider} />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{marginTop: 5, color: '#808080'}}>
                      Order No:
                    </Text>
                    <Text>{item._id}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{marginTop: 10, color: '#808080'}}>
                      Vendor :
                    </Text>
                    <Text style={{marginTop: 10}}>{item.vendorId.name}</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.status,
                    {
                      borderWidth: 1,
                      borderColor:
                        item.orderStatus === 'accepted'
                          ? '#228B2200'
                          : item.orderStatus === 'cancelled'
                          ? '#f300'
                          : item.orderStatus === 'pending'
                          ? '#ff9e4300'
                          : '#4440',
                    },
                  ]}></View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={[
                  rtl ? styles.flexRowRTL : styles.flexRow,
                  {justifyContent: 'space-between'},
                ]}>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                  {t('Filter')}
                </Text>
                <TouchableOpacity
                  style={styles.modalClose}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Icon name="x" size={25} color="#757575" />
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 5}}>
                <TextInput
                  style={rtl ? styles.filterInputRTL : styles.filterInput}
                  placeholder={t('Order No.')}
                  value={props.filters.orderNo}
                  onChangeText={(value) =>
                    props.setFilters({...props.filters, orderNo: value})
                  }
                />
                <TextInput
                  style={rtl ? styles.filterInputRTL : styles.filterInput}
                  placeholder={t('Vendor')}
                  value={props.filters.orderFrom}
                  onChangeText={(value) =>
                    props.setFilters({...props.filters, orderFrom: value})
                  }
                />
                <DatePicker
                  style={styles.datepicker}
                  date={props.filters.startDate}
                  mode="date"
                  placeholder={t('Start date')}
                  format="MM/DD/YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  onDateChange={(value) =>
                    props.setFilters({...props.filters, startDate: value})
                  }
                  customStyles={{
                    dateInput: {
                      height: 30,
                      padding: 5,
                      alignItems: rtl ? 'flex-end' : 'flex-start',
                      borderWidth: 0,
                      borderBottomWidth: 1,
                      borderColor: '#888',
                      textAlign: 'left',
                    },
                    dateText: {
                      fontSize: 18,
                      color: '#000',
                    },
                    placeholderText: {
                      fontSize: 18,
                      color: '#9E9E9E',
                    },
                  }}
                />
                <DatePicker
                  style={styles.datepicker}
                  date={props.filters.endDate}
                  mode="date"
                  placeholder={t('End date')}
                  format="MM/DD/YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  onDateChange={(value) =>
                    props.setFilters({...props.filters, endDate: value})
                  }
                  customStyles={{
                    dateInput: {
                      height: 30,
                      padding: 5,
                      alignItems: rtl ? 'flex-end' : 'flex-start',
                      borderWidth: 0,
                      borderBottomWidth: 1,
                      borderColor: '#888',
                      textAlign: 'left',
                    },
                    dateText: {
                      fontSize: 18,
                      color: '#000',
                    },
                    placeholderText: {
                      fontSize: 18,
                      color: '#9E9E9E',
                    },
                  }}
                />
                {/* <TextInput
                  style={rtl ? styles.filterInputRTL : styles.filterInput}
                  placeholder={t('Status')}
                  value={props.filters.status}
                  onChangeText={(value) =>
                    props.setFilters({...props.filters, status: value})
                  }
                /> */}
                <View
                  style={{
                    height: 200,
                    marginTop: 2,
                    backgroundColor: '#0000',
                    overflow: 'hidden',
                  }}>
                  <MultiSelectComponent
                    onChange={(value) =>
                      props.setFilters({...props.filters, status: value})
                    }
                  />
                </View>
              </View>
              <View
                style={[
                  rtl ? styles.flexRowRTL : styles.flexRow,
                  {marginTop: 40},
                ]}>
                <TouchableOpacity
                  style={[styles.filterbtns, {backgroundColor: '#7467EF'}]}
                  onPress={() => {
                    props.applyFilter(props.filters);
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={{color: '#e5e5e5'}}>APPLY</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.filterbtns, {backgroundColor: '#e5e5e5'}]}
                  onPress={() => {
                    props.resetFilters();
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={{color: '#7467EF'}}>RESET</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Body>
    );
};

const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },
  detail: {
    margin: 15,
    // padding: 15,
    backgroundColor: '#fff',
    borderRadius: 3,

    borderColor: '#eee',
    backgroundColor: '#E5E5E5',
  },
  orderPage: {
    width: Window.width,
    height: Window.height,
    backgroundColor: '#fff',
  },
  orderHead: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#8b80f2',
  },
  orderLable: {marginTop: 3, marginHorizontal: 10, color: '#999'},
  headTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  orders: {
    borderColor: '#eee',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 15,
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  status: {
    height: 25,
    // backgroundColor: '#ff9e43',
    borderWidth: 1,
    borderColor: '#ff9e43',
    paddingHorizontal: 10,
    borderRadius: 50,
    padding: 0,
  },
  orderText: {fontSize: 14, color: '#444', marginTop: 5},
  statusText: {fontSize: 14, color: '#fff', marginLeft: 60, marginTop: 5},
  Divider: {
    height: 1.5,
    width: '100%',
    backgroundColor: '#e1e1e1',
    marginVertical: 15,
  },
  filterBtn: {
    // color: '#fff',
    backgroundColor: '#7467EFbb',
    borderColor: '#7467EFbb',
    borderWidth: 1,
    marginHorizontal: 15,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 3,
    elevation: 2,
    width: '93%',
    height: 40,
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexRowRTL: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0005',
  },
  modalView: {
    margin: 20,
    width: '80%',
    backgroundColor: 'white',

    paddingHorizontal: 25,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalClose: {
    backgroundColor: '#eee',
    borderRadius: 50,
    padding: 5,
    marginTop: -5,
  },
  filterbtns: {
    marginRight: 10,
    marginTop: -1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  filterInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#888',
    color: '#9E9E9E',
    padding: 5,
    marginTop: 18,
  },
  filterInputRTL: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#888',
    color: '#9E9E9E',
    padding: 5,
    marginTop: 18,
    textAlign: 'right',
  },

  datepicker: {
    width: '100%',
    marginTop: 18,
  },
  body: {
    backgroundColor: '#E5E5E5',
  },
  verticaldivider: {
    height: '60%',
    width: '0.8%',
    backgroundColor: '#E5E5E5',
    marginRight: 10,
  },
});

function mapStateToProps(state) {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    rtlCustomer: state.theme.rtlCustomer,
    filters: state.orders.filters,
  };
  [];
}
export default connect(mapStateToProps, {
  fetchCustomerOrders,
  setFilters,
  resetFilters,
  applyFilter,
  searchOrders,
})(Order);
