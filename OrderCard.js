import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {connect} from 'react-redux';

import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Window = Dimensions.get('window');

const OrderCard = (props) => {
  const rtl = props.rtlCustomer;
  const {t} = useTranslation();

  const [fullName, setFullName] = React.useState(false);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,

        paddingHorizontal: 18,
        paddingVertical: 5,
      }}>
      <Text style={{fontSize: 14, color: '#777'}}>{props.item.name}</Text>
      <Text style={{fontSize: 14, color: '#777'}}>{props.item.price}</Text>
      <Text style={{fontSize: 14, color: '#777'}}>{props.item.unit}</Text>
      <Text style={{fontSize: 14, color: '#777'}}>
        {props.item.price * props.item.unit}
      </Text>
    </View>
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
  },
  rowSpacedRTL: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    width: '100%',
  },
  orderDetail: {
    width: Window.width,
    height: Window.height,
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
  Divider: {
    height: 1.5,
    width: '100%',
    backgroundColor: '#e1e1e1',
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderColor: '#bbb',
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
    rtlCustomer: state.theme.rtlCustomer,
  };
}
export default connect(mapStateToProps, {})(OrderCard);
