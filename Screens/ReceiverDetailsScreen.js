import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import firebase from 'firebase';
import db from '../Config'
import {Header, Card, Icon} from 'react-native-elements'

export default class ReceiverDetailsScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userId : firebase.auth().currentUser.email,
            receiverId : this.props.navigation.getParam('details') ['user_id'],
            requestId : this.props.navigation.getParam('details') ['request_id'],
            bookName : this.props.navigation.getParam('details') ['book_name'],
            reason_for_requesting : this.props.navigation.getParam('details') ['reason_to_request'],
            receiverName: '',
            receiverContact: '',
            receiverAddress: '',
            receiverRequestDocId : '',
        }
    }
    getReceiverDetails() {
        db.collection("users").where("email_id", "==", this.state.receiverId).get()
        .then(snapshot=> {
            snapshot.forEach(doc=>{
                this.setState({
                    receiverName : doc.data().first_name,
                    receiverContact: doc.data().contact,
                    receiverAddress: doc.data().address,
                })
            })
        })
        db.collection('requested_books').where('request_id','==',this.state.requestId).get()
        .then(snapshot=>{
            snapshot.forEach(doc => {
            this.setState({recieverRequestDocId:doc.id})
        })
    })
    }

    updateBookStatus() {
        db.collection('all_donations').add({
            book_name           : this.state.bookName,
            request_id          : this.state.requestId,
            requested_by        : this.state.recieverName,
            donor_id            : this.state.userId,
            request_status      :  "Donor Interested"
        })
    }
    render() {
        return(
            <View style={styles.container}>
        <View style={{flex:0.1}}>
          <Header
            leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
            centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
            backgroundColor = "#eaf8fe"
          />
        </View>
        <View style={{flex:0.3}}>
          <Card
              title={"Book Information"}
              titleStyle= {{fontSize : 20}}
            >
            <Card >
              <Text style={{fontWeight:'bold'}}>Name : {this.state.bookName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
            </Card>
          </Card>
        </View>
        <View style={{flex:0.3}}>
          <Card
            title={"Reciever Information"}
            titleStyle= {{fontSize : 20}}
            >
            <Card>
              <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.recieverId !== this.state.userId
            ?(
              <TouchableOpacity
                  style={styles.button}
                  onPress={()=>{
                    this.updateBookStatus()
                    this.props.navigation.navigate('MyDonations')
                  }}>
                <Text>I want to Donate</Text>
              </TouchableOpacity>
            )
            : null
          }
        </View>
      </View>
    )
  }

}